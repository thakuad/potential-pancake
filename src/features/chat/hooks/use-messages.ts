"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";
import { decryptMessage, encryptMessage } from "@/lib/crypto/encryption";
import type { DecryptedMessage, Message } from "@/types/database";

const MESSAGE_LIMIT = 500;

interface UseMessagesOptions {
  conversationId: string | null;
  conversationKey: CryptoKey | null;
  userId: string | null;
  /** Called for messages from the peer that arrive over realtime. */
  onIncomingMessage?: (message: DecryptedMessage) => void;
}

export interface UseMessagesResult {
  messages: DecryptedMessage[];
  isLoading: boolean;
  isError: boolean;
  sendMessage: (plaintext: string, isUrgent: boolean) => Promise<void>;
  markDelivered: (ids: string[]) => Promise<void>;
  markSeen: (ids: string[]) => Promise<void>;
  acknowledgeUrgent: (id: string) => Promise<void>;
}

/**
 * Loads, decrypts, and live-updates the conversation's messages.
 * Ciphertext is decrypted locally; plaintext lives only in memory.
 */
export function useMessages({
  conversationId,
  conversationKey,
  userId,
  onIncomingMessage,
}: UseMessagesOptions): UseMessagesResult {
  const supabase = useMemo(() => createClient(), []);
  const queryClient = useQueryClient();
  // Cache decrypted plaintext by message id so refetches don't re-decrypt.
  const plaintextCache = useRef(new Map<string, string | null>());
  const onIncomingRef = useRef(onIncomingMessage);
  useEffect(() => {
    onIncomingRef.current = onIncomingMessage;
  });

  const queryKey = useMemo(
    () => ["messages", conversationId] as const,
    [conversationId]
  );

  const decrypt = useCallback(
    async (message: Message): Promise<DecryptedMessage> => {
      if (!conversationKey) {
        return { ...message, plaintext: null, decryptionFailed: false };
      }

      let plaintext = plaintextCache.current.get(message.id);
      if (plaintext === undefined) {
        plaintext = await decryptMessage(
          conversationKey,
          message.encrypted_message
        );
        plaintextCache.current.set(message.id, plaintext);
      }

      return { ...message, plaintext, decryptionFailed: plaintext === null };
    },
    [conversationKey]
  );

  const query = useQuery<DecryptedMessage[]>({
    queryKey,
    enabled: !!conversationId && !!conversationKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId!)
        .order("created_at", { ascending: true })
        .limit(MESSAGE_LIMIT)
        .returns<Message[]>();
      if (error) throw error;
      return Promise.all(data.map(decrypt));
    },
  });

  // Realtime: new messages and status updates (delivered/seen/acknowledged).
  useEffect(() => {
    if (!conversationId || !conversationKey) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          const decrypted = await decrypt(payload.new as Message);
          queryClient.setQueryData<DecryptedMessage[]>(queryKey, (old) => {
            const existing = old ?? [];
            if (existing.some((m) => m.id === decrypted.id)) return existing;
            return [...existing, decrypted];
          });
          if (decrypted.sender_id !== userId) {
            onIncomingRef.current?.(decrypted);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const updated = payload.new as Message;
          queryClient.setQueryData<DecryptedMessage[]>(queryKey, (old) =>
            (old ?? []).map((m) =>
              m.id === updated.id
                ? {
                    ...m,
                    delivered_at: updated.delivered_at,
                    seen_at: updated.seen_at,
                    urgent_acknowledged_at: updated.urgent_acknowledged_at,
                  }
                : m
            )
          );
        }
      )
      .subscribe();

    // Realtime can drop events while the tab is asleep; refetch on wake.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        queryClient.invalidateQueries({ queryKey });
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [
    supabase,
    queryClient,
    queryKey,
    conversationId,
    conversationKey,
    userId,
    decrypt,
  ]);

  const sendMessage = useCallback(
    async (plaintext: string, isUrgent: boolean) => {
      if (!conversationId || !conversationKey || !userId) {
        throw new Error("Chat is not ready yet");
      }

      const encrypted = await encryptMessage(conversationKey, plaintext);
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: userId,
          encrypted_message: encrypted,
          is_urgent: isUrgent,
        })
        .select("*")
        .single<Message>();
      if (error) throw error;

      // Show our own message immediately (realtime will dedupe by id).
      plaintextCache.current.set(data.id, plaintext);
      queryClient.setQueryData<DecryptedMessage[]>(queryKey, (old) => {
        const existing = old ?? [];
        if (existing.some((m) => m.id === data.id)) return existing;
        return [
          ...existing,
          { ...data, plaintext, decryptionFailed: false },
        ];
      });
    },
    [supabase, queryClient, queryKey, conversationId, conversationKey, userId]
  );

  const updateStatus = useCallback(
    async (ids: string[], patch: Partial<Message>) => {
      if (ids.length === 0) return;
      await supabase.from("messages").update(patch).in("id", ids);
    },
    [supabase]
  );

  const markDelivered = useCallback(
    (ids: string[]) =>
      updateStatus(ids, { delivered_at: new Date().toISOString() }),
    [updateStatus]
  );

  const markSeen = useCallback(
    (ids: string[]) => updateStatus(ids, { seen_at: new Date().toISOString() }),
    [updateStatus]
  );

  const acknowledgeUrgent = useCallback(
    (id: string) =>
      updateStatus([id], {
        urgent_acknowledged_at: new Date().toISOString(),
      }),
    [updateStatus]
  );

  return {
    messages: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    sendMessage,
    markDelivered,
    markSeen,
    acknowledgeUrgent,
  };
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";
import {
  deriveConversationKey,
  getOrCreateLocalKeyPair,
  type LocalKeyPair,
} from "@/lib/crypto/keys";
import type { Profile } from "@/types/database";

export type ChatSessionStatus =
  | "loading"
  | "error"
  /** The second account hasn't been created in Supabase yet. */
  | "waiting-for-peer-account"
  /** The peer exists but hasn't logged in to publish an encryption key. */
  | "waiting-for-peer-key"
  | "ready";

export interface ChatSession {
  status: ChatSessionStatus;
  errorMessage: string | null;
  userId: string | null;
  me: Profile | null;
  peer: Profile | null;
  conversationId: string | null;
  /** Shared AES-GCM key. Null until both public keys exist. */
  conversationKey: CryptoKey | null;
}

interface BootstrapResult {
  userId: string;
  me: Profile;
  peer: Profile | null;
  conversationId: string | null;
  keyPair: LocalKeyPair;
}

/**
 * Bootstraps everything the chat needs:
 * 1. Load the authenticated user and both profiles.
 * 2. Ensure this device has an ECDH key pair; publish the public key.
 * 3. Find or create the direct conversation with the peer.
 * 4. Derive the shared conversation key once the peer's public key exists
 *    (kept live via a realtime subscription on the peer's profile).
 */
export function useChatSession(): ChatSession {
  const supabase = useMemo(() => createClient(), []);
  // Realtime updates to the peer's profile (key rotation, last seen).
  // Null until the first realtime event; the bootstrap snapshot is the
  // fallback, so no state seeding is needed.
  const [livePeer, setLivePeer] = useState<Profile | null>(null);

  const bootstrap = useQuery<BootstrapResult>({
    queryKey: ["chat-session"],
    staleTime: Infinity,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Not authenticated");

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .returns<Profile[]>();
      if (profilesError) throw profilesError;

      const me = profiles.find((p) => p.id === user.id);
      if (!me) throw new Error("Your profile was not found");
      // With exactly two accounts, "the peer" is simply the other profile.
      // When more users exist later, this becomes a conversation picker.
      const peer = profiles.find((p) => p.id !== user.id) ?? null;

      // Ensure this device has keys and the public half is published.
      const keyPair = await getOrCreateLocalKeyPair(user.id);
      if (me.public_key !== keyPair.publicKeyJwk) {
        const { error: keyError } = await supabase
          .from("profiles")
          .update({ public_key: keyPair.publicKeyJwk })
          .eq("id", user.id);
        if (keyError) throw keyError;
      }

      let conversationId: string | null = null;
      if (peer) {
        const { data, error: rpcError } = await supabase.rpc(
          "get_or_create_direct_conversation",
          { other_user_id: peer.id }
        );
        if (rpcError) throw rpcError;
        conversationId = data as string;
      }

      return { userId: user.id, me, peer, conversationId, keyPair };
    },
  });

  const peer = livePeer ?? bootstrap.data?.peer ?? null;
  const peerId = bootstrap.data?.peer?.id ?? null;
  const peerPublicKey = peer?.public_key ?? null;
  const keyPair = bootstrap.data?.keyPair ?? null;

  // Keep the peer profile live (key rotation after a device reset, last seen).
  useEffect(() => {
    if (!peerId) return;

    const channel = supabase
      .channel(`profile:${peerId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${peerId}`,
        },
        (payload) => setLivePeer(payload.new as Profile)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, peerId]);

  // Derive (or re-derive) the shared key whenever the peer's public key
  // changes. Cached forever per key pair — deriving is deterministic.
  const keyQuery = useQuery<CryptoKey>({
    queryKey: ["conversation-key", bootstrap.data?.userId, peerPublicKey],
    enabled: !!keyPair && !!peerPublicKey,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    queryFn: () => deriveConversationKey(keyPair!.privateKey, peerPublicKey!),
  });
  const conversationKey = keyQuery.data ?? null;

  const status: ChatSessionStatus = bootstrap.isPending
    ? "loading"
    : bootstrap.isError
      ? "error"
      : !bootstrap.data.peer
        ? "waiting-for-peer-account"
        : !peerPublicKey || !conversationKey
          ? "waiting-for-peer-key"
          : "ready";

  return {
    status,
    errorMessage: bootstrap.isError ? (bootstrap.error as Error).message : null,
    userId: bootstrap.data?.userId ?? null,
    me: bootstrap.data?.me ?? null,
    peer,
    conversationId: bootstrap.data?.conversationId ?? null,
    conversationKey,
  };
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { createClient } from "@/lib/supabase/client";

const TYPING_BROADCAST_INTERVAL_MS = 1500;
const TYPING_EXPIRY_MS = 3500;
const LAST_SEEN_HEARTBEAT_MS = 60_000;

export interface PresenceState {
  peerOnline: boolean;
  peerTyping: boolean;
  /** Broadcast that the local user is typing (throttled internally). */
  notifyTyping: () => void;
}

/**
 * Realtime presence for the conversation: who's online, who's typing,
 * plus a heartbeat that keeps our own `last_seen_at` fresh.
 */
export function usePresence(
  conversationId: string | null,
  userId: string | null
): PresenceState {
  const supabase = useMemo(() => createClient(), []);
  const [peerOnline, setPeerOnline] = useState(false);
  const [peerTyping, setPeerTyping] = useState(false);

  const typingExpiryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTypingBroadcast = useRef(0);
  const sendTypingRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!conversationId || !userId) return;

    const channel = supabase.channel(`presence:${conversationId}`, {
      config: { presence: { key: userId } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setPeerOnline(Object.keys(state).some((key) => key !== userId));
      })
      .on("broadcast", { event: "typing" }, ({ payload }) => {
        if (payload?.userId === userId) return;
        setPeerTyping(true);
        if (typingExpiryTimer.current) clearTimeout(typingExpiryTimer.current);
        typingExpiryTimer.current = setTimeout(
          () => setPeerTyping(false),
          TYPING_EXPIRY_MS
        );
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    sendTypingRef.current = () => {
      channel.send({
        type: "broadcast",
        event: "typing",
        payload: { userId },
      });
    };

    return () => {
      sendTypingRef.current = null;
      if (typingExpiryTimer.current) clearTimeout(typingExpiryTimer.current);
      supabase.removeChannel(channel);
    };
  }, [supabase, conversationId, userId]);

  // Keep our last_seen_at fresh while the app is open, and stamp it when
  // the tab is hidden/closed so "last seen" is accurate for the peer.
  useEffect(() => {
    if (!userId) return;

    const touch = () => {
      supabase
        .from("profiles")
        .update({ last_seen_at: new Date().toISOString() })
        .eq("id", userId)
        .then(() => {});
    };

    touch();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") touch();
    }, LAST_SEEN_HEARTBEAT_MS);

    const onHide = () => {
      if (document.visibilityState === "hidden") touch();
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [supabase, userId]);

  const notifyTyping = useCallback(() => {
    const now = Date.now();
    if (now - lastTypingBroadcast.current < TYPING_BROADCAST_INTERVAL_MS) {
      return;
    }
    lastTypingBroadcast.current = now;
    sendTypingRef.current?.();
  }, []);

  return { peerOnline, peerTyping, notifyTyping };
}

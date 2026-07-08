"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KeyRound, RefreshCw, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatSession } from "@/features/chat/hooks/use-chat-session";
import { useMessages } from "@/features/chat/hooks/use-messages";
import { usePresence } from "@/features/chat/hooks/use-presence";
import { useNotifications } from "@/features/notifications/use-notifications";
import type { DecryptedMessage } from "@/types/database";
import { ChatHeader } from "./chat-header";
import { Composer } from "./composer";
import { MessageList } from "./message-list";
import { UrgentBanner } from "./urgent-banner";

/** Tracks whether the app is focused AND visible — the condition for "seen". */
function useWindowFocus(): boolean {
  const [focused, setFocused] = useState(true);

  useEffect(() => {
    const update = () =>
      setFocused(
        document.visibilityState === "visible" && document.hasFocus()
      );
    update();
    window.addEventListener("focus", update);
    window.addEventListener("blur", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.removeEventListener("focus", update);
      window.removeEventListener("blur", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return focused;
}

export function ChatScreen() {
  const session = useChatSession();
  const notifications = useNotifications();
  const isFocused = useWindowFocus();
  const { peerOnline, peerTyping, notifyTyping } = usePresence(
    session.conversationId,
    session.userId
  );

  const peerName = session.peer?.display_name ?? "Duet";

  // useMessages keeps the latest callback in a ref, so depending on
  // peerName here doesn't resubscribe anything.
  const onIncomingMessage = useCallback(
    (message: DecryptedMessage) => {
      notifications.notify({
        title: message.is_urgent ? `Urgent — ${peerName}` : peerName,
        body: message.plaintext ?? "New message",
        urgent: message.is_urgent,
      });
    },
    [notifications, peerName]
  );

  const {
    messages,
    isLoading,
    sendMessage,
    markDelivered,
    markSeen,
    acknowledgeUrgent,
  } = useMessages({
    conversationId: session.conversationId,
    conversationKey: session.conversationKey,
    userId: session.userId,
    onIncomingMessage,
  });

  // Status updates already sent but not yet confirmed by realtime — avoids
  // re-sending the same update on every render.
  const inFlightStatusIds = useRef(new Set<string>());

  const incomingMessages = useMemo(
    () => messages.filter((m) => m.sender_id !== session.userId),
    [messages, session.userId]
  );

  // Mark peer messages as delivered as soon as we have them.
  useEffect(() => {
    const ids = incomingMessages
      .filter((m) => !m.delivered_at && !inFlightStatusIds.current.has(`d:${m.id}`))
      .map((m) => m.id);
    if (ids.length === 0) return;
    ids.forEach((id) => inFlightStatusIds.current.add(`d:${id}`));
    markDelivered(ids);
  }, [incomingMessages, markDelivered]);

  // Mark peer messages as seen while the app is focused.
  useEffect(() => {
    if (!isFocused) return;
    const ids = incomingMessages
      .filter((m) => !m.seen_at && !inFlightStatusIds.current.has(`s:${m.id}`))
      .map((m) => m.id);
    if (ids.length === 0) return;
    ids.forEach((id) => inFlightStatusIds.current.add(`s:${id}`));
    markSeen(ids);
  }, [incomingMessages, isFocused, markSeen]);

  // Unread badge on the tab title / PWA icon.
  const unreadCount = isFocused
    ? 0
    : incomingMessages.filter((m) => !m.seen_at).length;
  useEffect(() => {
    notifications.setUnreadBadge(unreadCount);
  }, [unreadCount, notifications]);

  // Urgent messages from the peer stay pinned until acknowledged.
  const unacknowledgedUrgent = useMemo(
    () =>
      incomingMessages.filter(
        (m) => m.is_urgent && !m.urgent_acknowledged_at
      ),
    [incomingMessages]
  );

  if (session.status === "error") {
    return (
      <CenteredNotice
        icon={<RefreshCw className="size-6" />}
        title="Something went wrong"
        body={session.errorMessage ?? "Couldn't load the chat."}
      >
        <Button onClick={() => window.location.reload()} variant="outline">
          <RefreshCw className="size-4" /> Try again
        </Button>
      </CenteredNotice>
    );
  }

  const chatReady = session.status === "ready";

  return (
    <div className="mx-auto flex h-dvh w-full max-w-3xl flex-col md:border-x">
      <ChatHeader
        peer={session.peer}
        peerOnline={peerOnline}
        peerTyping={peerTyping}
        notifications={notifications}
      />

      <UrgentBanner
        messages={unacknowledgedUrgent}
        onAcknowledge={acknowledgeUrgent}
      />

      {session.status === "loading" || (chatReady && isLoading) ? (
        <LoadingMessages />
      ) : session.status === "waiting-for-peer-account" ? (
        <CenteredNotice
          icon={<UserRoundPlus className="size-6" />}
          title="Waiting for your partner"
          body="The second account hasn't been created yet. Add it in the Supabase dashboard, then ask them to sign in."
        />
      ) : session.status === "waiting-for-peer-key" ? (
        <CenteredNotice
          icon={<KeyRound className="size-6" />}
          title="Waiting for encryption keys"
          body={`${peerName} needs to sign in once so their device can publish its encryption key. Messages stay locked until then.`}
        />
      ) : (
        <MessageList
          messages={messages}
          userId={session.userId!}
          peerTyping={peerTyping}
        />
      )}

      <Composer
        disabled={!chatReady}
        onSend={sendMessage}
        onTyping={notifyTyping}
      />
    </div>
  );
}

function LoadingMessages() {
  return (
    <div className="flex flex-1 flex-col justify-end gap-3 overflow-hidden p-4">
      <Skeleton className="h-12 w-56 self-start rounded-2xl" />
      <Skeleton className="h-9 w-40 self-end rounded-2xl" />
      <Skeleton className="h-16 w-64 self-start rounded-2xl" />
      <Skeleton className="h-9 w-48 self-end rounded-2xl" />
    </div>
  );
}

function CenteredNotice({
  icon,
  title,
  body,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <div className="bg-muted text-muted-foreground flex size-14 items-center justify-center rounded-full">
        {icon}
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground max-w-sm text-sm text-balance">
        {body}
      </p>
      {children}
    </div>
  );
}

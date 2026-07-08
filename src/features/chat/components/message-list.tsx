"use client";

import { useEffect, useRef } from "react";
import { Lock } from "lucide-react";

import { formatDayLabel } from "@/lib/format";
import type { DecryptedMessage } from "@/types/database";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";

interface MessageListProps {
  messages: DecryptedMessage[];
  userId: string;
  peerTyping: boolean;
}

function dayKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function MessageList({ messages, userId, peerTyping }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);

  // Track whether the user is near the bottom so we don't yank them down
  // while they're reading history.
  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottom.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const lastMessage = messages[messages.length - 1];
    const isOwnLast = lastMessage?.sender_id === userId;
    if (stickToBottom.current || isOwnLast) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, peerTyping, userId]);

  return (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="flex-1 overflow-y-auto overscroll-contain py-3"
    >
      <div className="text-muted-foreground mx-auto my-4 flex max-w-xs items-center justify-center gap-1.5 text-center text-xs text-balance">
        <Lock className="size-3 shrink-0" />
        Messages are end-to-end encrypted and disappear at midnight.
      </div>

      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showDayLabel =
          !previous || dayKey(previous.created_at) !== dayKey(message.created_at);

        return (
          <div key={message.id}>
            {showDayLabel && (
              <div className="text-muted-foreground my-3 text-center text-xs font-medium">
                {formatDayLabel(message.created_at)}
              </div>
            )}
            <MessageBubble message={message} isOwn={message.sender_id === userId} />
          </div>
        );
      })}

      {peerTyping && <TypingIndicator />}
    </div>
  );
}

"use client";

import { Check, CheckCheck, ShieldAlert, Siren } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/format";
import type { DecryptedMessage } from "@/types/database";

interface MessageBubbleProps {
  message: DecryptedMessage;
  isOwn: boolean;
}

/** Delivery ticks for the sender's own messages: sent → delivered → seen. */
function StatusTicks({ message }: { message: DecryptedMessage }) {
  if (message.seen_at) {
    return <CheckCheck className="size-3.5 text-sky-300" aria-label="Seen" />;
  }
  if (message.delivered_at) {
    return (
      <CheckCheck className="size-3.5 opacity-70" aria-label="Delivered" />
    );
  }
  return <Check className="size-3.5 opacity-70" aria-label="Sent" />;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const urgentUnacknowledged =
    message.is_urgent && !message.urgent_acknowledged_at;

  return (
    <div
      className={cn(
        "flex w-full px-4 py-0.5",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[78%] flex-col gap-0.5 rounded-2xl px-3.5 py-2 shadow-sm",
          "animate-in fade-in-0 slide-in-from-bottom-1 duration-200",
          isOwn
            ? "bg-bubble-sent text-bubble-sent-foreground rounded-br-sm"
            : "bg-bubble-received text-bubble-received-foreground rounded-bl-sm",
          message.is_urgent &&
            "ring-urgent/60 ring-2 ring-offset-1 ring-offset-background",
          urgentUnacknowledged && !isOwn && "urgent-pulse"
        )}
      >
        {message.is_urgent && (
          <span
            className={cn(
              "flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide",
              isOwn ? "text-bubble-sent-foreground/90" : "text-urgent"
            )}
          >
            <Siren className="size-3" />
            Urgent
          </span>
        )}

        {message.decryptionFailed ? (
          <span className="flex items-center gap-1.5 text-sm italic opacity-70">
            <ShieldAlert className="size-3.5" />
            Couldn&apos;t decrypt this message
          </span>
        ) : (
          <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">
            {message.plaintext}
          </p>
        )}

        <span
          className={cn(
            "flex items-center gap-1 self-end text-[10px]",
            isOwn
              ? "text-bubble-sent-foreground/70"
              : "text-muted-foreground"
          )}
        >
          {formatTime(message.created_at)}
          {isOwn && <StatusTicks message={message} />}
        </span>
      </div>
    </div>
  );
}

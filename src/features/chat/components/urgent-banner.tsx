"use client";

import { Siren } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DecryptedMessage } from "@/types/database";

interface UrgentBannerProps {
  /** Incoming urgent messages that haven't been acknowledged yet. */
  messages: DecryptedMessage[];
  onAcknowledge: (id: string) => void;
}

/**
 * Urgent messages stay pinned here until the recipient explicitly
 * acknowledges them — they can't be missed by scrolling past.
 */
export function UrgentBanner({ messages, onAcknowledge }: UrgentBannerProps) {
  if (messages.length === 0) return null;

  return (
    <div className="bg-urgent text-urgent-foreground animate-in slide-in-from-top-2 flex flex-col gap-2 px-4 py-3 shadow-md">
      {messages.map((message) => (
        <div key={message.id} className="flex items-center gap-3">
          <Siren className="size-5 shrink-0 animate-pulse" />
          <p className="flex-1 text-sm font-medium break-words">
            {message.decryptionFailed
              ? "Urgent message (couldn't decrypt)"
              : message.plaintext}
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="shrink-0"
            onClick={() => onAcknowledge(message.id)}
          >
            Acknowledge
          </Button>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { SendHorizontal, Siren } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { messageSchema, MAX_MESSAGE_LENGTH } from "@/features/chat/schemas";

interface ComposerProps {
  disabled: boolean;
  onSend: (body: string, isUrgent: boolean) => Promise<void>;
  onTyping: () => void;
}

export function Composer({ disabled, onSend, onTyping }: ComposerProps) {
  const [body, setBody] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }

  async function submit() {
    const parsed = messageSchema.safeParse({ body, isUrgent });
    if (!parsed.success) {
      if (body.trim().length > 0) {
        toast.error(parsed.error.issues[0]?.message ?? "Invalid message");
      }
      return;
    }

    setSending(true);
    try {
      await onSend(parsed.data.body, parsed.data.isUrgent);
      setBody("");
      setIsUrgent(false);
      requestAnimationFrame(autoResize);
      textareaRef.current?.focus();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border-t px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {isUrgent && (
        <p className="text-urgent mb-1 flex items-center gap-1 px-1 text-xs font-medium">
          <Siren className="size-3" />
          This message will be sent as urgent.
        </p>
      )}
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Button
          type="button"
          size="icon"
          variant={isUrgent ? "destructive" : "ghost"}
          className="shrink-0"
          aria-pressed={isUrgent}
          title={isUrgent ? "Send as normal message" : "Send as urgent message"}
          onClick={() => setIsUrgent((v) => !v)}
          disabled={disabled}
        >
          <Siren className="size-4.5" />
        </Button>

        <textarea
          ref={textareaRef}
          value={body}
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={disabled}
          placeholder={disabled ? "Chat isn't ready yet…" : "Message"}
          className={cn(
            "placeholder:text-muted-foreground max-h-40 min-h-9 flex-1 resize-none rounded-2xl border bg-transparent px-3.5 py-2 text-[15px] outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "dark:bg-input/30 disabled:opacity-50"
          )}
          onChange={(e) => {
            setBody(e.target.value);
            autoResize();
            onTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />

        <Button
          type="submit"
          size="icon"
          className="shrink-0 rounded-full"
          disabled={disabled || sending || body.trim().length === 0}
          aria-label="Send message"
        >
          <SendHorizontal className="size-4.5" />
        </Button>
      </form>
    </div>
  );
}

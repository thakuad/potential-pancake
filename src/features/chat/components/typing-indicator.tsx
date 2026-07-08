export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2" aria-label="Typing">
      <div className="bg-bubble-received text-bubble-received-foreground flex items-center gap-1 rounded-2xl rounded-bl-sm px-3.5 py-2.5">
        <span className="typing-dot bg-muted-foreground size-1.5 rounded-full" />
        <span className="typing-dot bg-muted-foreground size-1.5 rounded-full" />
        <span className="typing-dot bg-muted-foreground size-1.5 rounded-full" />
      </div>
    </div>
  );
}

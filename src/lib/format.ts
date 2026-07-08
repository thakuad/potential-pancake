/** Time/date formatting helpers for the chat UI. */

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDayLabel(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  if (startOfDay(date) === startOfDay(today)) return "Today";

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (startOfDay(date) === startOfDay(yesterday)) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function formatLastSeen(iso: string | null): string {
  if (!iso) return "Last seen a while ago";

  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "Last seen just now";
  if (seconds < 3600) {
    const m = Math.floor(seconds / 60);
    return `Last seen ${m} minute${m === 1 ? "" : "s"} ago`;
  }
  if (seconds < 86400) {
    const h = Math.floor(seconds / 3600);
    return `Last seen ${h} hour${h === 1 ? "" : "s"} ago`;
  }
  return `Last seen ${new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  })} at ${formatTime(iso)}`;
}

/** Two-letter initials for the avatar fallback. */
export function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join("") || "?"
  );
}

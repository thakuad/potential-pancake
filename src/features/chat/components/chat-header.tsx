"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Bell,
  BellRing,
  LogOut,
  Moon,
  MoreVertical,
  Sun,
  Volume2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatLastSeen, initials } from "@/lib/format";
import type { Notifications } from "@/features/notifications/use-notifications";
import type { Profile } from "@/types/database";

interface ChatHeaderProps {
  peer: Profile | null;
  peerOnline: boolean;
  peerTyping: boolean;
  notifications: Notifications;
}

export function ChatHeader({
  peer,
  peerOnline,
  peerTyping,
  notifications,
}: ChatHeaderProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const displayName = peer?.display_name || "Waiting…";
  const statusText = !peer
    ? "Not connected"
    : peerTyping
      ? "typing…"
      : peerOnline
        ? "Online"
        : formatLastSeen(peer.last_seen_at);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex items-center gap-3 border-b px-4 py-2.5 pt-[max(0.625rem,env(safe-area-inset-top))]">
      <div className="relative">
        <Avatar className="size-10">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials(displayName)}
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            "border-background absolute right-0 bottom-0 size-3 rounded-full border-2 transition-colors",
            peerOnline ? "bg-emerald-500" : "bg-muted-foreground/40"
          )}
          aria-hidden
        />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold">{displayName}</h1>
        <p
          className={cn(
            "truncate text-xs",
            peerTyping || peerOnline
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-muted-foreground"
          )}
        >
          {statusText}
        </p>
      </div>

      {notifications.permission === "default" && (
        <Button
          variant="outline"
          size="sm"
          onClick={notifications.requestPermission}
          className="gap-1.5"
        >
          <BellRing className="size-3.5" />
          <span className="hidden sm:inline">Enable alerts</span>
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Menu">
            <MoreVertical className="size-4.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
            {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem
            checked={notifications.soundEnabled}
            onCheckedChange={(checked) =>
              notifications.setSoundEnabled(checked === true)
            }
          >
            <Volume2 className="mr-1 size-4" />
            Notification sound
          </DropdownMenuCheckboxItem>
          {notifications.permission === "denied" && (
            <DropdownMenuItem disabled>
              <Bell className="size-4" />
              Notifications blocked in browser
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={signOut}>
            <LogOut className="size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

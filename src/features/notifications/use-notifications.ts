"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { playMessageSound, playUrgentSound } from "./sound";

const SOUND_SETTING_KEY = "settings:notification-sound";
const SETTINGS_EVENT = "duet:notification-settings-changed";

export interface Notifications {
  permission: NotificationPermission | "unsupported";
  requestPermission: () => Promise<void>;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  /** Show a notification (and sound) for an incoming message. */
  notify: (options: { title: string; body: string; urgent: boolean }) => void;
  /** Update the app badge + tab title with the unread count. */
  setUnreadBadge: (count: number) => void;
}

// Browser notification permission and the sound preference live outside
// React (Notification API / localStorage), so they're read via
// useSyncExternalStore. A custom event re-renders subscribers on change.
function subscribeToSettings(callback: () => void) {
  window.addEventListener(SETTINGS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(SETTINGS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function notifySettingsChanged() {
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function useNotifications(): Notifications {
  const permission = useSyncExternalStore<NotificationPermission | "unsupported">(
    subscribeToSettings,
    () => ("Notification" in window ? Notification.permission : "unsupported"),
    () => "unsupported"
  );

  const soundEnabled = useSyncExternalStore(
    subscribeToSettings,
    () => localStorage.getItem(SOUND_SETTING_KEY) !== "off",
    () => true
  );

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return;
    await Notification.requestPermission();
    notifySettingsChanged();
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    localStorage.setItem(SOUND_SETTING_KEY, enabled ? "on" : "off");
    notifySettingsChanged();
  }, []);

  const notify = useCallback(
    ({
      title,
      body,
      urgent,
    }: {
      title: string;
      body: string;
      urgent: boolean;
    }) => {
      if (localStorage.getItem(SOUND_SETTING_KEY) !== "off") {
        if (urgent) playUrgentSound();
        else playMessageSound();
      }

      // Only pop a system notification when the app isn't in the foreground
      // — except urgent messages, which always notify.
      const appVisible =
        document.visibilityState === "visible" && document.hasFocus();
      if (appVisible && !urgent) return;

      if ("Notification" in window && Notification.permission === "granted") {
        try {
          const notification = new Notification(title, {
            body,
            icon: "/icons/icon-192.png",
            tag: urgent ? `urgent-${Date.now()}` : "duet-message",
            requireInteraction: urgent,
            silent: true, // we play our own sounds
          });
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        } catch {
          // Some platforms only allow notifications via a service worker.
        }
      }
    },
    []
  );

  const setUnreadBadge = useCallback((count: number) => {
    document.title = count > 0 ? `(${count}) Duet` : "Duet";
    if ("setAppBadge" in navigator) {
      if (count > 0) {
        navigator.setAppBadge(count).catch(() => {});
      } else {
        navigator.clearAppBadge().catch(() => {});
      }
    }
  }, []);

  return useMemo(
    () => ({
      permission,
      requestPermission,
      soundEnabled,
      setSoundEnabled,
      notify,
      setUnreadBadge,
    }),
    [
      permission,
      requestPermission,
      soundEnabled,
      setSoundEnabled,
      notify,
      setUnreadBadge,
    ]
  );
}

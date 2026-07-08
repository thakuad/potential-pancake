/**
 * Notification sounds generated with the Web Audio API — no audio assets
 * needed, and nothing to fetch offline.
 */

let audioContext: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    try {
      audioContext = new AudioContext();
    } catch {
      return null;
    }
  }
  return audioContext;
}

function beep(
  ctx: AudioContext,
  frequency: number,
  startAt: number,
  duration: number,
  volume: number
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(volume, startAt + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

/** Soft two-tone chime for normal messages. */
export function playMessageSound() {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  beep(ctx, 880, now, 0.12, 0.08);
  beep(ctx, 1174.66, now + 0.1, 0.16, 0.08);
}

/** Louder, insistent triple tone for urgent messages. */
export function playUrgentSound() {
  const ctx = getContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  for (let i = 0; i < 3; i++) {
    beep(ctx, 988, now + i * 0.22, 0.14, 0.2);
    beep(ctx, 1318.51, now + i * 0.22 + 0.07, 0.12, 0.2);
  }
}

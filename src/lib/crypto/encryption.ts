/**
 * Message encryption/decryption with AES-GCM.
 *
 * Wire format: base64( iv[12 bytes] || ciphertext ).
 * A fresh random IV is generated per message — never reused.
 * All operations run locally via the Web Crypto API; plaintext never
 * touches the network or Supabase.
 */

const IV_LENGTH = 12;

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function encryptMessage(
  key: CryptoKey,
  plaintext: string
): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  const payload = new Uint8Array(IV_LENGTH + ciphertext.byteLength);
  payload.set(iv, 0);
  payload.set(new Uint8Array(ciphertext), IV_LENGTH);
  return toBase64(payload);
}

/**
 * Returns the plaintext, or null when decryption fails (e.g. the peer
 * rotated keys after clearing their browser storage).
 */
export async function decryptMessage(
  key: CryptoKey,
  payload: string
): Promise<string | null> {
  try {
    const bytes = fromBase64(payload);
    const iv = bytes.slice(0, IV_LENGTH);
    const ciphertext = bytes.slice(IV_LENGTH);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );
    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
}

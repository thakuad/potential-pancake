/**
 * End-to-end encryption key management.
 *
 * Design (zero-knowledge):
 * - Each user has an ECDH P-256 key pair generated in their browser.
 * - The PRIVATE key never leaves the device. It is stored in localStorage,
 *   keyed by user id, and is never sent to Supabase.
 * - The PUBLIC key (a JWK) is published to the user's `profiles` row so the
 *   other participant can fetch it.
 * - Both sides derive the SAME AES-GCM 256 conversation key via ECDH:
 *   deriveKey(myPrivateKey, theirPublicKey). The server only ever sees the
 *   two public keys and ciphertext — it cannot derive the shared secret.
 *
 * If a device's storage is wiped, a fresh key pair is generated and the new
 * public key is republished. Older messages become undecryptable on that
 * device — an acceptable trade-off here because all messages are erased at
 * midnight anyway.
 */

const STORAGE_PREFIX = "e2ee:private-key:";

const ECDH_PARAMS: EcKeyGenParams = { name: "ECDH", namedCurve: "P-256" };

export interface LocalKeyPair {
  privateKey: CryptoKey;
  /** JWK string of the public key, ready to publish to the profile row. */
  publicKeyJwk: string;
}

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}${userId}`;
}

async function generateKeyPair(): Promise<{
  privateJwk: JsonWebKey;
  publicJwk: JsonWebKey;
}> {
  const pair = await crypto.subtle.generateKey(ECDH_PARAMS, true, [
    "deriveKey",
  ]);
  const [privateJwk, publicJwk] = await Promise.all([
    crypto.subtle.exportKey("jwk", pair.privateKey),
    crypto.subtle.exportKey("jwk", pair.publicKey),
  ]);
  return { privateJwk, publicJwk };
}

async function importPrivateKey(jwk: JsonWebKey): Promise<CryptoKey> {
  return crypto.subtle.importKey("jwk", jwk, ECDH_PARAMS, false, [
    "deriveKey",
  ]);
}

export async function importPublicKey(jwkString: string): Promise<CryptoKey> {
  const jwk = JSON.parse(jwkString) as JsonWebKey;
  return crypto.subtle.importKey("jwk", jwk, ECDH_PARAMS, false, []);
}

/** Derive the public JWK from a stored private JWK (an EC public key is the x/y coordinates). */
function publicJwkFromPrivate(privateJwk: JsonWebKey): JsonWebKey {
  const { kty, crv, x, y } = privateJwk;
  return { kty, crv, x, y, ext: true };
}

/**
 * Load this device's key pair for `userId`, generating and persisting a new
 * one if none exists yet.
 */
export async function getOrCreateLocalKeyPair(
  userId: string
): Promise<LocalKeyPair> {
  let privateJwk: JsonWebKey | null = null;

  const stored = localStorage.getItem(storageKey(userId));
  if (stored) {
    try {
      privateJwk = JSON.parse(stored) as JsonWebKey;
    } catch {
      privateJwk = null; // corrupted — regenerate below
    }
  }

  if (!privateJwk) {
    const generated = await generateKeyPair();
    privateJwk = generated.privateJwk;
    localStorage.setItem(storageKey(userId), JSON.stringify(privateJwk));
  }

  const privateKey = await importPrivateKey(privateJwk);
  const publicKeyJwk = JSON.stringify(publicJwkFromPrivate(privateJwk));
  return { privateKey, publicKeyJwk };
}

/**
 * Derive the shared AES-GCM 256 conversation key from our private key and
 * the peer's published public key. Both participants derive the same key.
 */
export async function deriveConversationKey(
  myPrivateKey: CryptoKey,
  theirPublicKeyJwk: string
): Promise<CryptoKey> {
  const theirPublicKey = await importPublicKey(theirPublicKeyJwk);
  return crypto.subtle.deriveKey(
    { name: "ECDH", public: theirPublicKey },
    myPrivateKey,
    { name: "AES-GCM", length: 256 },
    false, // not extractable — the derived key can never be exported
    ["encrypt", "decrypt"]
  );
}

/**
 * Database row types mirroring the Supabase schema in `supabase/migrations`.
 *
 * The schema is deliberately conversation-based (not hard-coded to two users)
 * so the app can grow into multiple conversations / group chats later.
 */

export interface Profile {
  id: string;
  display_name: string;
  /** ECDH P-256 public key as a JWK JSON string. Published so the peer can derive the shared key. */
  public_key: string | null;
  last_seen_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  created_at: string;
}

export interface ConversationParticipant {
  conversation_id: string;
  user_id: string;
  joined_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  /** AES-GCM ciphertext (base64 of iv || ciphertext). Never plaintext. */
  encrypted_message: string;
  is_urgent: boolean;
  delivered_at: string | null;
  seen_at: string | null;
  urgent_acknowledged_at: string | null;
  created_at: string;
}

/** A message after local decryption. `plaintext` never leaves the browser. */
export interface DecryptedMessage extends Message {
  plaintext: string | null;
  decryptionFailed: boolean;
}

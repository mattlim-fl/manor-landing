/**
 * Shared cryptographic utilities for Supabase Edge Functions
 */

/**
 * Derive encryption key from environment variable
 */
export async function deriveEncryptionKey(keyString: string): Promise<CryptoKey> {
  let keyBytes: Uint8Array

  if (/^[0-9a-fA-F]{64}$/.test(keyString)) {
    keyBytes = new Uint8Array(
      keyString.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    )
  } else {
    const encoder = new TextEncoder()
    const keyData = encoder.encode(keyString)
    const hashBuffer = await crypto.subtle.digest('SHA-256', keyData)
    keyBytes = new Uint8Array(hashBuffer)
  }

  return crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Decrypt a string encrypted with AES-256-GCM
 */
export async function decryptToken(encrypted: string, encryptionKey: string): Promise<string> {
  const key = await deriveEncryptionKey(encryptionKey)

  const binary = atob(encrypted)
  const combined = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    combined[i] = binary.charCodeAt(i)
  }

  const iv = combined.slice(0, 12)
  const authTag = combined.slice(12, 28)
  const ciphertext = combined.slice(28)

  const combinedCiphertext = new Uint8Array(ciphertext.length + authTag.length)
  combinedCiphertext.set(ciphertext, 0)
  combinedCiphertext.set(authTag, ciphertext.length)

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    combinedCiphertext
  )

  const decoder = new TextDecoder()
  return decoder.decode(decrypted)
}

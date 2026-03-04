/**
 * Centralized configuration for Supabase Edge Functions
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const Deno: any

function requireEnv(key: string): string {
  const value = Deno.env.get(key)
  if (!value) {
    throw new Error(`Missing required env var: ${key}`)
  }
  return value
}

function optionalEnv(key: string, defaultValue?: string): string | undefined {
  return Deno.env.get(key) || defaultValue
}

export const config = {
  get supabaseUrl(): string {
    return requireEnv('SUPABASE_URL')
  },
  get supabaseServiceKey(): string {
    const backup = optionalEnv('SERVICE_ROLE_KEY_BACKUP')
    if (backup && backup.startsWith('eyJ')) {
      return backup
    }
    return requireEnv('SUPABASE_SERVICE_ROLE_KEY')
  },
  get credentialsEncryptionKey(): string {
    return requireEnv('CREDENTIALS_ENCRYPTION_KEY')
  },
}

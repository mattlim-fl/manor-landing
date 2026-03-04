/**
 * Shared credentials module for Supabase Edge Functions
 * Handles fetching Resend credentials from database
 */

import { decryptToken } from './crypto.ts'
import { config } from './config.ts'

interface ResendCredentials {
  api_key: string
  from_email?: string
}

interface CredentialRow {
  credentials_encrypted: string
  is_active: boolean
}

interface SupabaseClient {
  from: (table: string) => {
    select: (columns: string) => {
      is: (column: string, value: null) => {
        is: (column: string, value: null) => {
          eq: (column: string, value: string) => {
            single: () => Promise<{ data: unknown; error: unknown }>
          }
        }
      }
    }
  }
}

/**
 * Get Resend credentials from database
 */
export async function getResendCredentials(
  supabase: SupabaseClient
): Promise<{ apiKey: string; fromEmail?: string } | null> {
  try {
    const result = await supabase
      .from('venue_api_credentials')
      .select('credentials_encrypted, is_active')
      .is('venue', null)
      .is('organization_id', null)
      .eq('integration_type', 'resend')
      .single()

    const data = result.data as CredentialRow | null
    if (result.error || !data || !data.is_active) {
      console.warn('No active Resend credentials found in database')
      return null
    }

    const encryptionKey = config.credentialsEncryptionKey
    const decrypted = await decryptToken(data.credentials_encrypted, encryptionKey)
    const creds = JSON.parse(decrypted) as ResendCredentials

    return {
      apiKey: creds.api_key,
      fromEmail: creds.from_email,
    }
  } catch (err) {
    console.error('Error fetching Resend credentials:', err)
    return null
  }
}

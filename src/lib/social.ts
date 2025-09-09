export function sanitizeHandle(rawHandle: string | undefined | null): string {
  if (!rawHandle) return '';
  return rawHandle.replace(/^@+/, '').trim();
}

export function buildInstagramProfileUrl(handle: string): string | null {
  const h = sanitizeHandle(handle);
  if (!h) return null;
  return `https://www.instagram.com/${h}`;
}

// Attempts to open an Instagram DM thread. Falls back to profile URL.
export function buildInstagramDmUrl(handle: string): string | null {
  const h = sanitizeHandle(handle);
  if (!h) return null;
  // ig.me is Instagram's short domain for messaging a user
  return `https://ig.me/m/${h}`;
}

export function deriveFacebookPageUsernameFromUrl(pageUrl: string | undefined | null): string | null {
  if (!pageUrl) return null;
  try {
    const u = new URL(pageUrl);
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return null;
    return parts[parts.length - 1];
  } catch {
    return null;
  }
}

export function buildMessengerUrl(pageUsernameOrId: string | undefined | null): string | null {
  if (!pageUsernameOrId) return null;
  const id = pageUsernameOrId.trim();
  if (!id) return null;
  return `https://m.me/${id}`;
}



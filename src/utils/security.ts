const SAFE_IFRAME_HOSTS = ['wikipedia.org', 'github.com', 'stackoverflow.com', 'developer.mozilla.org'];

export function sanitizeUrl(raw: string) {
  try {
    const url = new URL(raw);
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function canEmbedInWorkspace(raw: string) {
  const sanitized = sanitizeUrl(raw);
  if (!sanitized) return false;
  const host = new URL(sanitized).hostname;
  return SAFE_IFRAME_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

export function isFontFile(file: File) {
  return /\.(otf|ttf)$/i.test(file.name) && file.size < 2 * 1024 * 1024;
}

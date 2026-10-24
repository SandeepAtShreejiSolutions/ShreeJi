export const SITE_ORIGIN = 'https://shreegsolution.com';

export function normalizePath(value) {
  if (!value) return '/';
  try {
    const url = new URL(value, SITE_ORIGIN);
    return url.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return '/';
  }
}

export function findSeoSettings(entries, pathname) {
  const currentPath = normalizePath(pathname);
  return (entries || []).find((item) => normalizePath(item.target_page) === currentPath) || null;
}

export function safeCanonicalUrl(value, fallbackPath) {
  try {
    const url = new URL(value || fallbackPath || '/', SITE_ORIGIN);
    if (url.origin !== SITE_ORIGIN) return new URL(normalizePath(fallbackPath), SITE_ORIGIN).href;
    return new URL(url.pathname.replace(/\/+$/, '') || '/', SITE_ORIGIN).href;
  } catch {
    return new URL(normalizePath(fallbackPath), SITE_ORIGIN).href;
  }
}

export function setCanonicalUrl(value, fallbackPath) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = safeCanonicalUrl(value, fallbackPath);
}

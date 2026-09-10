/**
 * Resolves the latest Mostro release at build time.
 * Falls back to FALLBACK_VERSION if the GitHub API is unreachable so the
 * build never breaks. Rebuilds are triggered on a schedule (see deploy.yml)
 * so the guide picks up new releases automatically.
 */
const RELEASES_URL = 'https://api.github.com/repos/MostroP2P/mostro/releases/latest';
const FALLBACK_VERSION = 'v0.18.7';
const FALLBACK_DATE = '2026-09-01';
const FETCH_TIMEOUT_MS = 10_000;

export interface MostroRelease {
  version: string;
  publishedAt: Date;
}

const LOCALE_MAP: Record<string, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  it: 'it-IT',
  pt: 'pt-BR',
};

async function fetchLatestRelease(): Promise<MostroRelease> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(RELEASES_URL, { headers, signal: controller.signal });
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
    const data = (await res.json()) as { tag_name?: string; published_at?: string };
    if (!data.tag_name) throw new Error('Release response has no tag_name');
    return { version: data.tag_name, publishedAt: parsePublishedAt(data.published_at) };
  } catch (err) {
    console.warn(`[mostroVersion] Falling back to ${FALLBACK_VERSION}:`, (err as Error).message);
    return { version: FALLBACK_VERSION, publishedAt: new Date(FALLBACK_DATE) };
  } finally {
    clearTimeout(timer);
  }
}

/** Returns a valid Date, using FALLBACK_DATE when the value is missing or unparseable. */
function parsePublishedAt(value: string | undefined): Date {
  if (!value) return new Date(FALLBACK_DATE);
  const ms = Date.parse(value);
  return Number.isNaN(ms) ? new Date(FALLBACK_DATE) : new Date(ms);
}

// Fetch once per build and share across all locale pages.
const releasePromise = fetchLatestRelease();

export function getMostroRelease(): Promise<MostroRelease> {
  return releasePromise;
}

/** "February 2026" / "Febrero 2026" style label, capitalised for the locale. */
export function formatReleaseMonth(date: Date, locale: string): string {
  const label = new Intl.DateTimeFormat(LOCALE_MAP[locale] ?? 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

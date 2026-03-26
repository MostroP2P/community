/**
 * Communities configuration
 * 
 * This file contains the list of Mostro communities and relay configuration.
 * Community metadata (name, description, avatar) is fetched from Nostr (kind 0).
 * Trading info (currencies, limits, fees) is fetched from Mostro info events (kind 38385).
 */

export interface CommunityConfig {
  /** Nostr pubkey (hex or npub format) */
  pubkey: string;
  /** Display region/country */
  region: string;
  /** Social links */
  social: { type: string; url: string }[];
  /** Optional website URL */
  website?: string;
}

export const COMMUNITIES: CommunityConfig[] = [
  {
    pubkey: '00000235a3e904cfe1213a8a54d6f1ec1bef7cc6bfaabd6193e82931ccf1366a',
    region: '🇨🇺 Cuba',
    social: [
      { type: 'telegram', url: 'https://t.me/Cuba_Bitcoin' },
    ],
    website: 'https://cubabitcoin.org/kmbalache/',
  },
  {
    pubkey: 'npub1qqqvcqssrmpfa65uuc3jtp6jh8ta5ekz0pz76f5ydhgtplrnddqqrqe7xr',
    region: 'España',
    social: [
      { type: 'telegram', url: 'https://t.me/nostromostro' },
    ],
  },
  {
    pubkey: 'npub1qqqqj79vck2v2p5hd3j4km0vhuk54ujllk4xdq8j49tgkz5ggsdsvgn7vr',
    region: 'Colombia',
    social: [
      { type: 'telegram', url: 'https://t.me/ColombiaP2P' },
      { type: 'x', url: 'https://x.com/ColombiaP2P' },
    ],
  },
  {
    pubkey: 'npub1qqq8evest7uh9awvs0ur4rau58nyay7f6ymf3q9fl43wl9wj87gsrk6xv3',
    region: 'Bolivia',
    social: [
      { type: 'telegram', url: 'https://t.me/btcxbolivia' },
      { type: 'x', url: 'https://x.com/btcxbolivia' },
      { type: 'instagram', url: 'https://www.instagram.com/btcxbolivia' },
      { type: 'tiktok', url: 'https://www.tiktok.com/@btcxbolivia' },
    ],
  },
];

/** Default Mostro relay for fetching community metadata */
export const RELAY = 'wss://relay.mostro.network';

/** Social platform icons mapping */
export const SOCIAL_ICONS: Record<string, string> = {
  telegram: '💬',
  signal: '📡',
  x: '𝕏',
  instagram: '📸',
  nostr: '🟣',
  discord: '🎮',
  whatsapp: '📱',
  matrix: '🔗',
  tiktok: '📺',
};

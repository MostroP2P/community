/**
 * Structure of the node guide, shared by every locale.
 *
 * This file is the single source of truth for which sections exist, in what
 * order, and at what heading level. The template renders the headings and the
 * table of contents from it, so a heading and its nav entry cannot drift apart
 * and an anchor cannot be orphaned. Translations supply text only, keyed by
 * these ids -- see `src/data/guide/<locale>.ts`.
 *
 * To add a section: add an entry here and the matching key in all five locale
 * files. A missing or extra key fails the build.
 */
export interface GuideSectionRef {
  id: string;
  level: 2 | 3;
}

export const GUIDE_SECTIONS: readonly GuideSectionRef[] = [
  { id: 'what-is-mostro', level: 2 },
  { id: 'why-run', level: 3 },
  { id: 'how-it-works', level: 3 },
  { id: 'prerequisites', level: 2 },
  { id: 'vps', level: 3 },
  { id: 'lnd', level: 3 },
  { id: 'liquidity', level: 3 },
  { id: 'nostr-keys', level: 3 },
  { id: 'skill-level', level: 3 },
  { id: 'setup', level: 2 },
  { id: 'common-steps', level: 3 },
  { id: 'option-a', level: 3 },
  { id: 'option-b', level: 3 },
  { id: 'option-c', level: 3 },
  { id: 'configuration', level: 2 },
  { id: 'cfg-nostr', level: 3 },
  { id: 'fees', level: 3 },
  { id: 'limits', level: 3 },
  { id: 'profile', level: 3 },
  { id: 'timeouts', level: 3 },
  { id: 'antispam', level: 3 },
  { id: 'rpc', level: 3 },
  { id: 'transport', level: 3 },
  { id: 'ln-safety', level: 3 },
  { id: 'price', level: 3 },
  { id: 'optional-blocks', level: 3 },
  { id: 'operating', level: 2 },
  { id: 'disputes', level: 3 },
  { id: 'mostrix', level: 3 },
  { id: 'watchdog', level: 3 },
  { id: 'monitoring', level: 3 },
  { id: 'updating', level: 3 },
  { id: 'backups', level: 3 },
  { id: 'activity', level: 3 },
  { id: 'ln-migration', level: 3 },
  { id: 'operator-cli', level: 3 },
  { id: 'costs', level: 2 },
  { id: 'faq', level: 2 },
  { id: 'security', level: 2 },
  { id: 'troubleshooting', level: 2 },
  { id: 'appendix', level: 2 },
];

/** Sections listed in the collapsed table of contents shown on phones. */
export const GUIDE_MOBILE_NAV: readonly string[] = [
  'what-is-mostro',
  'prerequisites',
  'setup',
  'configuration',
  'operating',
  'costs',
  'faq',
  'security',
  'troubleshooting',
];

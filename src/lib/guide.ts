import { GUIDE_SECTIONS, GUIDE_MOBILE_NAV } from '../data/guide/sections';
import type { GuideSection, GuideTranslation } from '../data/guide/types';

export interface ResolvedSection extends GuideSection {
  id: string;
  level: 2 | 3;
}

/**
 * Pairs the shared structure with one locale's text.
 *
 * Throws when a locale is missing a section or carries one the structure does
 * not declare, so a half-finished translation fails the build instead of
 * silently dropping a section from four languages and not the fifth.
 */
export function resolveSections(locale: string, translation: GuideTranslation): ResolvedSection[] {
  const declared = GUIDE_SECTIONS.map((s) => s.id);
  const provided = Object.keys(translation.sections);

  const missing = declared.filter((id) => !provided.includes(id));
  const extra = provided.filter((id) => !declared.includes(id));
  if (missing.length || extra.length) {
    const problems = [
      missing.length ? `missing: ${missing.join(', ')}` : '',
      extra.length ? `not in sections.ts: ${extra.join(', ')}` : '',
    ].filter(Boolean);
    throw new Error(`Guide translation "${locale}" does not match sections.ts (${problems.join('; ')})`);
  }

  return GUIDE_SECTIONS.map((ref) => ({ ...translation.sections[ref.id], ...ref }));
}

/** Sections shown in the collapsed table of contents on phones, in order. */
export function mobileNav(sections: ResolvedSection[]): ResolvedSection[] {
  return GUIDE_MOBILE_NAV.map((id) => {
    const section = sections.find((s) => s.id === id);
    if (!section) throw new Error(`GUIDE_MOBILE_NAV references unknown section "${id}"`);
    return section;
  });
}

/** Substitutes the release placeholders that translations carry verbatim. */
export function fillRelease(text: string, version: string, updated: string): string {
  return text.split('{{version}}').join(version).split('{{updated}}').join(updated);
}

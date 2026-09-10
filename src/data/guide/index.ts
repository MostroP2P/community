import type { GuideTranslation } from './types';
import en from './en';
import es from './es';
import fr from './fr';
import it from './it';
import pt from './pt';

export const GUIDE_LOCALES = ['en', 'es', 'fr', 'it', 'pt'] as const;
export type GuideLocale = (typeof GUIDE_LOCALES)[number];

export const GUIDE: Record<GuideLocale, GuideTranslation> = { en, es, fr, it, pt };

export type { GuideTranslation, GuideSection, GuideMeta } from './types';

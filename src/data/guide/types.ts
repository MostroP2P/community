/** Text of one guide section. Its id and heading level come from `./sections.ts`. */
export interface GuideSection {
  /** Heading text, rendered at the level `sections.ts` declares. */
  title: string;
  /** Label in the sidebar table of contents. Usually shorter than the heading. */
  nav: string;
  /** Label in the collapsed table of contents on phones. Top-level sections only. */
  navShort?: string;
  /** Body of the section, as HTML. Excludes the heading. */
  html: string;
}

export interface GuideMeta {
  /** <title> and the page's SEO description. */
  title: string;
  description: string;
  /** Page heading and the release line under it. */
  h1: string;
  versionLine: string;
  /** Table-of-contents heading and the button that expands it on phones. */
  tocTitle: string;
  tocButton: string;
  /** Closing block that credits the community and dates the guide. */
  credit: string;
}

export interface GuideTranslation {
  meta: GuideMeta;
  /** Keyed by section id. Must cover `GUIDE_SECTIONS` exactly. */
  sections: Record<string, GuideSection>;
}

# Node guide content

The guide at `/guide` (and `/es/guide`, `/fr/guide`, `/it/guide`, `/pt/guide`) is
one Astro template rendering five translations.

| File | What it holds |
| --- | --- |
| `sections.ts` | Which sections exist, in what order, at what heading level. Shared by every language. |
| `en.ts`, `es.ts`, `fr.ts`, `it.ts`, `pt.ts` | The words, keyed by section id. |
| `types.ts` | The shape a translation has to satisfy. |
| `../../components/Guide.astro` | The template: layout, table of contents, headings. |
| `../../pages/**/guide.astro` | One five-line page per language, picking a locale. |

The headings and the table of contents are both generated from `sections.ts`, so
a heading cannot drift from its nav entry and an anchor cannot be left dangling.

## Fixing wording or a command

Edit the `html` of the section in the language files. The body is plain HTML; the
heading is not part of it, it lives in `title`.

A correction to a command or a config sample usually applies to all five
languages, since only the comments around it are translated.

## Adding, removing or reordering a section

1. Edit `sections.ts`.
2. Add or remove the matching key in **all five** language files.

The build fails with the offending locale and the missing ids if you forget one,
so a half-finished translation cannot ship as a section that silently disappears
in four languages.

## Release placeholders

Translations write `{{version}}` and `{{updated}}` wherever the current Mostro
release tag or its month belongs. They are substituted at build time from the
GitHub releases API (see `../../lib/mostroVersion.ts`). Never hardcode a version.

## Two things to watch

- **Escape angle brackets.** A placeholder inside a code sample has to be
  `&lt;order-id&gt;`, not `<order-id>`. A raw one is parsed as an HTML tag and the
  reader never sees it.
- **Close every tag.** The section body is inserted as-is, so an unclosed
  `<pre>` swallows everything after it.

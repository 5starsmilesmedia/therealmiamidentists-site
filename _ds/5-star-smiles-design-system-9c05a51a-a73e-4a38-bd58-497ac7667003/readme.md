# 5 Star Smiles — Design System

Luxury dental brand, marketed like a fashion house. The visual language is borrowed from high-fashion editorial (the provided mood board references Balenciaga, Gucci, Calvin Klein campaign imagery): monochrome photography, blurred-motion portraits, chrome and glass textures, a single blood-red accent, spaced-caps typography, zero ornament.

## Sources
- https://www.iwanta5starsmile.com — live site (Elementor/WordPress). Source of all selling facts below; also hosts real B&W patient gallery photos and testimonial images.
- `uploads/Untitled design-2.png` — client mood board.
- `uploads/logo-1788361613884-3xii.png` — brand lockup: chrome interlocked SS-heart monogram on black, tagline "SMILE DIFFERENT.", footer "5 STAR SMILES · CORAL GABLES". Processed copies in `assets/`. Five rows: (1) red-accent latex/fashion portraits, (2) silver/monochrome editorial portraits, (3) menswear campaign frames (Gucci, Calvin Klein, blurred motion), (4) B&W typographic poster pair with oversized vertical type, (5) luxury dental imagery — macro dental tools on black, glass/crystal jaw render.
- No codebase, Figma, or font binaries were provided. Voice and component inventory are informed assumptions — the standard component set was authored from scratch per brand direction. User picks: sans spaced-caps typography; surfaces = social ads + web landing pages.

## Brand context (assumed)
- **Brand**: 5 Star Smiles — high-end dental / smile-design clinic, Coral Gables. Tagline: **"Smile different."**
- **Agency**: FRAMEXGOD-style creative direction: sell dentistry the way Gucci sells loafers. The product is confidence, not cleanings.
- **Audience**: affluent patients buying veneers, whitening, full smile makeovers.
- **Surfaces**: social ads and posts, landing pages, pitch/lookbook decks, print.

## Selling facts (from iwanta5starsmile.com — use these when writing sales copy)
- **Positioning**: "Luxury cosmetic dentistry in Coral Gables" / "Miami's Luxury Cosmetic Dental Studio". Tagline on site: "The smile you deserve" energy; our system's tagline: "Smile different."
- **Services** (site order): 01 Porcelain Veneers · 02 Resin Veneers · 03 Restorative Dentistry · 04 Teeth Whitening · 05 Dental Cleaning · 06 Laser Dentistry. No aligners — never advertise them.
- **Proof points**: 30+ years methods claim; 1-year warranty on all smile designs; 75 Instagram reviews; complete transformation in only 2 visits (porcelain); resin veneers = same-day results.
- **Pricing**: smile designs $6,000–$20,000; flexible financing is a core selling point ("accessible, convenient, stress-free luxury"). Never show prices in ads; financing may be referenced.
- **Offer**: Full VIP Package — luxury smile design (resin or porcelain), cleaning, health exam, full X-rays, world-class service, financing, 1-year warranty, 24/7 support.
- **Pain-point narrative** (site's hook): 61% of Americans wish they could change their smile → they quit smiling in public, cover their mouths, avoid photos → confidence/mental-health cost → invest in a lifetime smile.
- **Contact**: 305-930-2400 · info@iwanta5starsmile.com · 315 Alhambra Circle, Coral Gables, FL 33134 · Mon–Fri 8 AM–5 PM. Booking: iwanta5starsmile.com/5starsmile/
- **Social**: TikTok/Instagram @5starsmiles · facebook.com/iwanta5starsmile · YouTube.
- **Testimonial themes**: fear-of-dentist converts, effortless/attentive staff, "now I truly have a 5 star smile", 2-year veneer durability. Short real quote usable: "I have never been more happy with my smile." (Jesse T.)
- **Voice note**: the live site is warm direct-response (exclamation marks, bold promises). This design system deliberately elevates it to cold-luxury — keep the site's FACTS, use the system's TONE.

## Logo rule
The chrome monogram (`assets/logo-mark.png`, black bg — overlay with `mix-blend-mode:screen`) goes over EVERY campaign image and marketing asset. Never render the brand name in plain type where an image allows the mark.

## Content fundamentals
- **Voice**: minimal, cold, declarative. Short lines. No exclamation marks, no emoji, ever.
- **Casing**: labels and CTAs in SPACED ALL-CAPS (`letter-spacing: 0.28em`). Headlines in serif sentence case or lowercase — never Title Case Every Word.
- **Person**: speak to "you"; the brand is "we" but rarely says so. Prefer subjectless imperatives: "Book the consultation." / "Wear your smile."
- **Copy patterns**: 2–5 word headlines ("The ten-day smile."), one supporting line max, one CTA. Numbers written as numerals. Prices never shown in ads.
- **Never**: puns, tooth jokes, clip-art warmth, "brighten your day", discount language, urgency ("limited time!").
- Examples — headline: *"Porcelain, perfected."* label: `S M I L E   D E S I G N` CTA: `BOOK PRIVATELY`. Claims: "A new smile in two visits." (porcelain) / "Same-day." (resin).

## Visual foundations
- **Palette**: near-black `#050505` pages; bone off-white `#F4F2EE` paper; warm greys; one accent — chrome silver `#C9CCCE` (`--chrome-0`, strong `#9FA4A7`), used at ≤5% of any layout (a word, a rule, a border, metallic moments). No other hues — fully monochrome.
- **Type**: one family — Archivo (neutral grotesque, stand-in for the logo's type). Display = 600 CAPS, tight tracking (−0.02em), leading 0.98, very large; labels/CTAs = spaced caps (0.28em); body = 400, 15px/1.6. No serif. Oversized type may crop off-canvas (mood-board row 4).
- **Backgrounds**: solid ink or bone; full-bleed monochrome photography with a bottom protection gradient (`linear-gradient(transparent, rgba(5,5,5,.85))`) — never capsules/scrims. No gradients as decoration, no patterns.
- **Imagery**: B&W or heavily desaturated; high contrast; grain welcome; blurred motion; macro detail (tools, teeth, glass). No color exceptions — imagery stays monochrome. A generated editorial library lives in `assets/editorial-images.md` — use it, or generate new frames in its language (monochrome, one motivated light source, 35mm grain, visible skin texture, one named technique per frame). The live website supplies facts and copy only — NEVER its imagery. Never warm/candid stock, never smiling-family clichés.
- **Corners**: radius 0 everywhere. The only curve permitted is the pill (`999px`) on small tags.
- **Borders**: 1px hairlines — `#262626` on ink, `#D8D4CC` on paper. Cards are flat: hairline border, no shadow, no rounding.
- **Shadows**: essentially none. Dialogs get one deep ambient shadow (`0 32px 80px rgba(0,0,0,.6)`) to separate from the page; nothing else casts.
- **Spacing**: generous. 8-px base scale up to 128; whitespace is the luxury cue. Layouts are grid-strict, often asymmetric.
- **Motion**: slow and damped — `cubic-bezier(.19,1,.22,1)`, 400–700ms fades/translates. No bounces, no spinners; opacity + small translate only.
- **Hover**: text/links → chrome or opacity shift; filled buttons → invert (paper↔ink); outlined → fill. Press: no shrink — darken one step.
- **Transparency/blur**: `backdrop-filter: blur(12px)` on fixed navs over imagery only; otherwise surfaces are opaque.

## Iconography
- No icon assets were provided. The system links **Lucide** from CDN (1.5px stroke, squared caps feel, matches the hairline aesthetic) — flagged as a substitution; replace if the brand adopts a proprietary set.
- Icons are used sparingly: UI chrome (close, chevron, arrow-right) only. Never decorative icon grids, never emoji, never unicode dingbats.
- Arrows: prefer the typographic `→` (U+2192) in CTAs over an SVG.

## Logo
- `assets/logo-lockup.png` — full lockup (mark + tagline + footer), 1200×1490, black background.
- `assets/logo-mark.png` — SS-heart monogram only, 900×838, black background.
Both are baked on `#050505`-ish black — **use on ink surfaces only**; ask the client for a transparent/vector mark for paper surfaces. Text fallback: `5 STAR SMILES` in Archivo 600, 0.28em tracking.

## Intentional additions
- Standard component set (no source inventory existed): Button, IconButton, Input, Select, Checkbox, Radio, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip — one file each, styled to the foundations above.
- Lucide CDN icons — substitution, see Iconography.

## Index
- `styles.css` — global entry (imports everything below).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`; `fonts/fonts.css` (Google Fonts import — **no binaries provided**, Archivo is a stand-in).
- `assets/` — `logo-lockup.png`, `logo-mark.png`, `editorial-images.md` (generated editorial image library — the ONLY approved imagery source; website photos are for information, never imagery).
- `guidelines/` — foundation specimen cards (Design System tab).
- `components/forms/` — Button, IconButton, Input, Select, Checkbox, Radio, Switch.
- `components/display/` — Card, Badge, Tag.
- `components/navigation/` — Tabs.
- `components/feedback/` — Dialog, Toast, Tooltip.
- `ui_kits/social/` — social ad / post compositions (interactive index.html).
- `ui_kits/web/` — landing-page recreation of the brand direction.
- `templates/` — brand-kit marketing templates (consuming projects start new designs from these): `service-ad/` feed ad 1080×1350 · `story-ad/` 1080×1920 · `testimonial-card/` 1080×1080 · `before-after/` split result post · `vip-offer/` type-only offer post · `editorial-lookbook/` long-form brand book Vol. 01 (sunlit campaign) · `editorial-lookbook-vol2/` Vol. 02 (chrome-studio fashion set + concrete monogram finale) · `social-pack/` 29 ready feed posts · `story-pack/` 20 ready story ads (1080×1920).
- `SKILL.md` — agent skill entry point.

# Article brief

Every topic button on the Editorial page opens one article. Articles live as
JSON in `content/articles/<series number>.json` and `tools/build_site.py`
turns them into pages at `/articles/<slug>`.

## The site

The Real Miami Dentists is a cosmetic dentistry news and education channel for
people in Miami considering veneers, whitening and smile design. It helps them
understand the options and choose the right dentist. It is powered by (and
discloses) 5 Star Smiles, a practice in Coral Gables. Articles are education
first; the page template adds the practice's contact block automatically, so
articles never mention 5 Star Smiles, prices, phone numbers or booking.

Voice: confident, plain, short sentences, a little editorial. Examples of the
house voice: "White is a color. Natural is a design decision." "Good cosmetic
dentistry does not announce itself." Write for a smart patient, not a dentist.

## JSON format

Each file is a JSON array of article objects, in the same order as the topics:

```json
{
  "slug": "do-veneers-ruin-your-teeth",
  "series": "02",
  "topic": "Do veneers ruin your teeth?",
  "title": "Do veneers ruin your teeth?",
  "dek": "One sentence, under 160 characters, that answers the question directly.",
  "body": [
    {"p": "Opening paragraph that gives the straight answer first."},
    {"h": "A short subhead"},
    {"p": "Paragraph."},
    {"ul": ["List item.", "List item."]},
    {"p": "Closing paragraph: what to ask or look for at a consultation."}
  ],
  "sources": [
    {"title": "Page title — Publisher", "url": "https://..."}
  ],
  "updated": "2026-10-19"
}
```

- `topic` must match the button text exactly (copy it character for character).
- `slug`: lowercase words joined by hyphens, from the topic, no punctuation.
- `title`: may be the topic itself or a sharper headline that still answers it.
- Body: 350 to 550 words, 3 or 4 subheads. Plain text only, no HTML or Markdown.
- Use straight text; curly quotes and em dashes are fine.

## Accuracy rules (strict)

- Only state facts that are well established in mainstream dental guidance.
  Prefer ranges ("commonly 10 to 15 years") over precise numbers.
- 1 to 3 sources per article from reputable organizations: ADA / MouthHealthy,
  AACD, American Academy of Periodontology, NIH / NCBI / MedlinePlus, FDA,
  Cleveland Clinic, Mayo Clinic, Florida Department of Health, peer-reviewed
  journals, or established dental trade press for news. Only cite a URL you
  actually opened and confirmed supports what you wrote. If you cannot verify
  a source, leave it out rather than guess.
- Never invent patients, cases, quotes, testimonials, statistics, studies,
  ratings or credentials. Never name real people or real dentists.
- No guarantees, no "best", no claims that any practice is superior.
- No individual medical advice: point readers to an in-person exam when the
  answer depends on their own mouth.
- Series 04 (Miami Smile Files) and 05 (The Redo Room) are about real people
  and real cases in the published series. For these articles write general,
  educational pieces about the theme (for example how a smile affects
  confidence on camera, or how bulky veneers are typically redone). Do not
  describe a specific person or case.

# Weekly editorial update

Instructions for the agent that refreshes The Real Miami Dentists site every week.
The site is a cosmetic dentistry news and education channel: it helps people
understand veneers and smile design and choose the right dentist. It is powered
by 5 Star Smiles (315 Alhambra Circle, Coral Gables, FL 33134).

## The one rule: keep the format

Change words, never layout. Do not add pages, sections, styles, classes, scripts
or images. Do not change any `style="..."` attribute. Only edit text inside
elements that already exist, and add new items only by copying an existing
sibling element exactly and changing its text.

## What to update each run (2 to 3 changes total)

Pick 2 or 3 of these, rotating so every area gets attention over a month:

1. **Homepage FAQ** (`index.html`, the `#faq` section)
   - Add one new question, or improve an existing answer with clearer or more
     current information.
   - New questions copy the existing pattern exactly:
     `<details><summary><h3>Question?</h3></summary><p class="a">Answer.</p></details>`
   - Keep the list at 20 questions or fewer. Past 20, replace the weakest
     question instead of adding.
   - After any FAQ change run `python3 tools/sync_faq.py`. It updates the
     JSON-LD and `llms.txt` to match. Never edit those copies by hand.

2. **Editorial series** (`editorial.html`, sections 01 to 07)
   - Each series has one description `<p>` and a row of topic chips (`<span>`).
   - Refresh a description, or add/replace a topic chip with a timely topic.
     Keep chips short (2 to 6 words) and keep 3 to 8 chips per series.
   - Miami Smile Files and The Redo Room are about real people and real cases.
     Only add specific names or cases if they are provided in `inbox/`
     (see below). Otherwise use general themes.

3. **Inbox material**
   - If the team drops notes, quotes or approved case details in `inbox/`,
     use them first, then move the used file to `inbox/done/`.
   - This repository is public and every file in it is reachable on the live
     site, so `inbox/` must only ever hold material already approved for
     publication, with the person's written consent. Never add patient records,
     contact details or anything else private.

After changing a page, set its `<lastmod>` in `sitemap.xml` to today's date.

## Content standards

- Write for patients: plain English, short sentences, the existing confident
  voice ("White is a color. Natural is a design decision.").
- Be accurate and conservative. Only state facts that are well established in
  mainstream dental guidance. Give ranges, not promises. When unsure, leave it out.
- Never invent patients, quotes, reviews, ratings, statistics, studies, awards or
  credentials. Never name a real person or dentist unless the material came
  from `inbox/`.
- No guarantees ("pain-free", "permanent results", "best dentist in Miami") and
  no claims that 5 Star Smiles is better than other practices. Florida dental
  advertising rules apply.
- No medical advice for an individual. Point readers to a consultation for
  anything that depends on their own mouth.
- Keep 5 Star Smiles details (address, phone, hours, rating, warranty) exactly
  as they already appear on the site. Do not change them.
- Mention 5 Star Smiles only where it already appears or at the end of an answer
  that is about booking. The content is education first.

## Checks before publishing

1. `python3 tools/sync_faq.py` prints the expected question count.
2. `git diff` shows only text changes: no `style=` edits, no removed tags.
3. Every changed HTML file still ends with `</html>`.

Then commit to `main` with a message like
`Weekly editorial update: <what changed>` and push. GitHub Pages publishes
it within a few minutes.

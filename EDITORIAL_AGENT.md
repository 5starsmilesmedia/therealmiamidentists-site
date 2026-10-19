# Weekly editorial update

Instructions for the agent that refreshes The Real Miami Dentists site every week.
The site is a cosmetic dentistry news and education channel: it helps people
understand veneers and smile design, follow new dental technology, and choose
the right dentist. It is powered by 5 Star Smiles (315 Alhambra Circle, Coral
Gables, FL 33134).

## The one rule: keep the format

Change words, never layout. Do not hand-edit page structure, styles, classes,
scripts or images. Content lives in JSON and is rendered by
`tools/build_site.py`; the only HTML you edit by hand is the homepage FAQ text
and the series descriptions on the Editorial page.

## How the content is organized

- `content/articles/NN.json`: one file per Editorial series (01 to 08). Each
  object is one topic button on the Editorial page and one article page at
  `/articles/<slug>`. The format and writing rules are in
  `content/ARTICLE_BRIEF.md`. Read it before writing anything.
- `content/feed.json`: the captions over the Feed photos. Each caption links to
  an article by slug.
- `index.html` `#faq`: the homepage FAQ.
- `editorial.html`: the one-line description under each series title.

## What to do each run (3 or 4 changes total)

1. **Tech news, every week.** Use web search to find dental technology and AI
   news from the last 30 days (FDA clearances, new imaging, AI tools, scanners,
   3D printing, materials). Add one new article to `content/articles/08.json`
   about the most significant item, or update an existing 08 article when the
   news continues a story already covered. Cite the announcement and any
   independent coverage you opened.
2. **One more article.** Add one new article to another series, rotating
   through 01 to 07 (check `git log` to see which series were touched
   recently), or substantially improve an existing one.
3. **Feed.** Rewrite one or two captions in `content/feed.json` so they point
   to recent or relevant articles. Keep each caption under 60 characters, in
   the house voice. The `img` values must stay exactly as they are.
4. **Optional:** add or improve one homepage FAQ answer.

Never remove or rename an existing question or article. Only add new ones
or improve the answers. The build stops with an error if a question that is
on the page is missing from its JSON file.

Then run, in this order:

    python3 tools/build_site.py
    python3 tools/sync_faq.py

## Homepage FAQ

- New questions copy the existing pattern exactly:
  `<details><summary><h3>Question?</h3></summary><p class="a">Answer.</p></details>`
- Keep the list at 20 questions or fewer. Past 20, replace the weakest one.
- After any FAQ change, `tools/sync_faq.py` updates the JSON-LD and `llms.txt`.
  Never edit those copies by hand.

## Inbox material

If the team drops notes, quotes or approved case details in `inbox/`, use them
first, then move the used file to `inbox/done/`. This repository is public and
every file in it can be reached on the live site, so `inbox/` must only hold
material already approved for publication, with the person's written consent.
Never add patient records, contact details or anything else private. Specific
people and cases for Miami Smile Files and The Redo Room come only from here.

## Content standards

- Follow `content/ARTICLE_BRIEF.md`, especially its accuracy rules: only cite
  sources you opened, never invent people, quotes, cases or numbers, no
  guarantees or "best" claims, no individual medical advice.
- News: name companies and products only as the sources report them, give the
  announcement date, attribute performance figures to the company, and say
  when something is a company announcement rather than independent research.
- Keep 5 Star Smiles details (address, phone, hours, rating, warranty) exactly
  as they appear on the site.

## Checks before publishing

1. Both build scripts finish without errors.
2. `git diff --stat` shows changes only in `content/`, `articles/`,
   `editorial.html`, `feed.html`, `index.html`, `sitemap.xml` and `llms.txt`.
3. Image counts on `index.html`, `editorial.html` and `feed.html` are
   unchanged, and every changed HTML file still ends with `</html>`.

Then commit to `main` with a message like
`Weekly editorial update: <what changed>` and push. GitHub Pages publishes it
within a few minutes.

#!/usr/bin/env python3
"""Build the editorial articles, topic buttons and Feed captions.

Sources of truth:
  content/articles/NN.json  one file per Editorial series (see content/ARTICLE_BRIEF.md)
  content/feed.json         captions shown over the Feed photos

What it writes:
  articles/<slug>.html      one page per article, using the site's own header/footer
  editorial.html            topic buttons for each series link to their articles
  feed.html                 caption overlays on each photo
  sitemap.xml, llms.txt     article entries

Run from the repo root after changing any content file:

    python3 tools/build_site.py
"""
import html
import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://therealmiamidentists.com"
CONTENT = ROOT / "content"
OUT = ROOT / "articles"

CHIP_STYLE = ("border: 1px solid rgb(38, 38, 38); padding: 8px 14px; font-size: 11px; "
              "letter-spacing: 0.14em; text-transform: uppercase;")
CHIP_ROW = ('<div style="display: flex; flex-wrap: wrap; justify-content: center; '
            'gap: 8px; max-width: 820px;">')
TECH_TITLE = "Dental Tech &amp; AI"
TECH_DESC = ("News on the tools changing dentistry: AI, digital scans, 3D printing "
             "and what they mean for your smile.")
TECH_IMG = ("img/assets-frames-web-feed-07.jpg",
            "Gloved hand holding a dental handpiece with water spray against black")
HOVER_CSS = (".trmd-chip{color:rgb(244,242,238);transition:border-color .2s ease,color .2s ease}"
             ".trmd-chip:hover{border-color:rgb(201,204,206)!important;color:rgb(244,242,238)}"
             ".trmd-cap{transition:background .3s ease}.trmd-cap:hover .trmd-cap-cta{color:rgb(244,242,238)}")

esc = lambda s: html.escape(s, quote=False)
attr = lambda s: html.escape(s, quote=True)


def load_articles():
    series = []
    for path in sorted((CONTENT / "articles").glob("[0-9][0-9].json")):
        items = json.loads(path.read_text())
        for a in items:
            for key in ("slug", "series", "topic", "title", "dek", "body"):
                if not a.get(key):
                    sys.exit(f"{path.name}: article missing '{key}': {a.get('topic')}")
            if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", a["slug"]):
                sys.exit(f"{path.name}: bad slug {a['slug']!r}")
        series.append((path.stem, items))
    slugs = [a["slug"] for _, items in series for a in items]
    dupes = {s for s in slugs if slugs.count(s) > 1}
    if dupes:
        sys.exit(f"Duplicate slugs: {sorted(dupes)}")
    return series


# ---------- editorial.html ----------

SERIES_RE = re.compile(
    r'(<span style="font-size: 11px; font-weight: 600; letter-spacing: 0.28em; color: rgb\(201, 204, 206\);">)'
    r'(\d\d)(</span><h2[^>]*>)(.*?)(</h2><p[^>]*>.*?</p>)' + re.escape(CHIP_ROW) + r'(.*?)(</div></div>)',
    re.S)


def ensure_tech_section(page):
    """Add series 08 by cloning series 07's markup once."""
    if f">{TECH_TITLE}</h2>" in page:
        return page
    start = page.index('<div style="display: flex; flex-direction: column; align-items: center; '
                       'text-align: center; gap: 28px; padding: 72px 40px 56px;"><span',
                       page.index(">07</span>") - 400)
    end = page.index('</div><div style="background: rgb(244, 242, 238)', start)
    block = page[start:end]
    block = block.replace(">07</span>", ">08</span>", 1)
    block = re.sub(r"(<h2[^>]*>).*?(</h2>)", lambda m: m.group(1) + TECH_TITLE + m.group(2), block, 1)
    block = re.sub(r"(</h2><p[^>]*>).*?(</p>)", lambda m: m.group(1) + esc(TECH_DESC) + m.group(2), block, 1)
    i = block.index(CHIP_ROW) + len(CHIP_ROW)
    block = block[:i] + block[block.index("</div>", i):]
    block = re.sub(r'<img src="[^"]*" alt="[^"]*"',
                   f'<img src="{TECH_IMG[0]}" alt="{attr(TECH_IMG[1])}"', block, 1)
    return page[:end] + block + page[end:]


def build_editorial(series):
    path = ROOT / "editorial.html"
    page = ensure_tech_section(path.read_text())
    by_num = dict(series)
    seen = set()

    def chips(m):
        num = m.group(2)
        items = by_num.get(num)
        if items is None:
            return m.group(0)
        seen.add(num)
        current = {html.unescape(t) for t in re.findall(r">([^<]+)</(?:span|a)>", m.group(6))}
        dropped = current - {a["topic"] for a in items}
        if dropped:
            sys.exit(f"Series {num}: these questions are on the page but missing from "
                     f"content/articles/{num}.json, and questions are never removed: {sorted(dropped)}")
        row = "".join(
            f'<a class="trmd-chip" href="/articles/{a["slug"]}" style="{CHIP_STYLE} '
            f'text-decoration: none; cursor: pointer;">{esc(a["topic"])}</a>'
            for a in items)
        return m.group(1) + num + m.group(3) + m.group(4) + m.group(5) + CHIP_ROW + row + m.group(7)

    page = SERIES_RE.sub(chips, page)
    missing = set(by_num) - seen
    if missing:
        sys.exit(f"editorial.html has no section for series {sorted(missing)}")
    page = add_css(page)
    page = page.replace(
        "The Real Review, Ask a Miami Dentist, Fake or Flawless? and Miami Smile Files: cosmetic dentistry explained",
        "The Real Review, Ask a Miami Dentist, Fake or Flawless?, Dental Tech &amp; AI and more: cosmetic dentistry explained")
    path.write_text(page)
    titles = {m.group(2): html.unescape(m.group(4)) for m in SERIES_RE.finditer(page)}
    return page, titles


def add_css(page):
    if ".trmd-chip{" in page:
        return page
    return page.replace("</head>", f"<style>{HOVER_CSS}</style></head>", 1)


# ---------- article pages ----------

ARTICLE_CSS = """
.trmd-art{max-width:760px;margin:0 auto;padding:72px 40px 96px}
.trmd-art .kicker{font-size:10px;font-weight:600;letter-spacing:.42em;text-transform:uppercase;color:rgb(201,204,206)}
.trmd-art .kicker a{color:inherit}
.trmd-art h1{margin:24px 0 0;font-family:inherit;font-weight:600;font-size:clamp(34px,5vw,64px);line-height:1;letter-spacing:-.03em;text-transform:uppercase;color:rgb(244,242,238);text-wrap:balance}
.trmd-art .dek{margin:28px 0 0;font-size:20px;line-height:1.5;color:rgb(201,204,206);text-wrap:pretty}
.trmd-art .meta{margin:28px 0 40px;padding-bottom:28px;border-bottom:1px solid rgb(38,38,38);font-size:9px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:rgb(138,138,138)}
.trmd-art h2{margin:44px 0 0;font-family:inherit;font-weight:600;font-size:clamp(20px,2vw,26px);line-height:1.25;letter-spacing:-.01em;color:rgb(244,242,238)}
.trmd-art p.b{margin:18px 0 0;font-size:17px;line-height:1.75;color:rgb(184,182,177);text-wrap:pretty}
.trmd-art ul{margin:18px 0 0;padding-left:20px;font-size:17px;line-height:1.7;color:rgb(184,182,177)}
.trmd-art li{margin:8px 0}
.trmd-art .src{margin-top:56px;padding-top:28px;border-top:1px solid rgb(38,38,38)}
.trmd-art .src h3,.trmd-art .more h3{margin:0 0 14px;font-size:9px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:rgb(138,138,138)}
.trmd-art .src li{font-size:13px;line-height:1.6}
.trmd-art .src a{color:rgb(201,204,206);border-bottom:1px solid rgba(201,204,206,.35)}
.trmd-art .note{margin-top:28px;font-size:12px;line-height:1.7;color:rgb(138,138,138)}
.trmd-art .more{margin-top:56px;padding-top:28px;border-top:1px solid rgb(38,38,38)}
.trmd-art .more div{display:flex;flex-wrap:wrap;gap:8px}
.trmd-art .cta{margin-top:56px;padding:40px;background:rgb(244,242,238);color:rgb(5,5,5);display:flex;flex-direction:column;gap:12px}
.trmd-art .cta span{font-size:9px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:rgb(94,94,94)}
.trmd-art .cta strong{font-size:clamp(22px,2.4vw,30px);line-height:1.2;font-weight:600}
.trmd-art .cta a{color:rgb(5,5,5);font-size:15px;border-bottom:1px solid rgb(5,5,5);align-self:flex-start}
@media (max-width:640px){.trmd-art{padding:48px 20px 72px}.trmd-art .cta{padding:28px 20px}}
"""


def page_shell(editorial_page):
    """Split editorial.html into head, header (through nav) and footer."""
    head_end = editorial_page.index("</head>")
    head = editorial_page[:head_end]
    body_start = editorial_page.index('<div style="flex: 1 1 0%;">')
    header = editorial_page[editorial_page.index("<body"):body_start]
    footer_start = editorial_page.index('<div style="border-top: 1px solid rgb(38, 38, 38); padding: 56px 40px;')
    footer = editorial_page[footer_start:]
    return head, header, footer


def absolutize(fragment):
    return re.sub(r'(href|src)="(?!/|https?:|#|mailto:|tel:)', r'\1="/', fragment)


def render_body(blocks):
    out = []
    for b in blocks:
        if "h" in b:
            out.append(f"<h2>{esc(b['h'])}</h2>")
        elif "p" in b:
            out.append(f'<p class="b">{esc(b["p"])}</p>')
        elif "ul" in b:
            out.append("<ul>" + "".join(f"<li>{esc(i)}</li>" for i in b["ul"]) + "</ul>")
    return "".join(out)


def fmt_date(d):
    y, m, dd = (int(x) for x in d.split("-"))
    return date(y, m, dd).strftime("%B %-d, %Y")


def build_articles(series, titles, editorial_page):
    head, header, footer = page_shell(editorial_page)
    head, header, footer = absolutize(head), absolutize(header), absolutize(footer)
    OUT.mkdir(exist_ok=True)
    keep = set()
    today = date.today().isoformat()
    for num, items in series:
        stitle = titles.get(num, "Editorial")
        for a in items:
            url = f"{SITE}/articles/{a['slug']}"
            updated = a.get("updated") or today
            meta_title = f"{a['title']} | The Real Miami Dentists"
            h = head
            h = re.sub(r"<title>.*?</title>", f"<title>{esc(meta_title)}</title>", h, 1, re.S)
            h = re.sub(r'(<meta name="description" content=")[^"]*', lambda m: m.group(1) + attr(a["dek"]), h, 1)
            h = re.sub(r'(<link rel="canonical" href=")[^"]*', lambda m: m.group(1) + url, h, 1)
            h = re.sub(r'(<meta property="og:type" content=")[^"]*', r"\1article", h, 1)
            h = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m.group(1) + attr(meta_title), h, 1)
            h = re.sub(r'(<meta property="og:description" content=")[^"]*', lambda m: m.group(1) + attr(a["dek"]), h, 1)
            h = re.sub(r'(<meta property="og:url" content=")[^"]*', lambda m: m.group(1) + url, h, 1)
            h = re.sub(r'(<meta name="twitter:title" content=")[^"]*', lambda m: m.group(1) + attr(meta_title), h, 1)
            h = re.sub(r'(<meta name="twitter:description" content=")[^"]*', lambda m: m.group(1) + attr(a["dek"]), h, 1)
            ld = {"@context": "https://schema.org", "@graph": [
                {"@type": "Article", "headline": a["title"], "description": a["dek"],
                 "dateModified": updated, "datePublished": a.get("published", updated),
                 "mainEntityOfPage": url, "image": f"{SITE}/og-share.jpg",
                 "author": {"@type": "Organization", "name": "The Real Miami Dentists"},
                 "publisher": {"@type": "Organization", "name": "The Real Miami Dentists",
                               "url": f"{SITE}/"}},
                {"@type": "BreadcrumbList", "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITE}/"},
                    {"@type": "ListItem", "position": 2, "name": "Editorial", "item": f"{SITE}/editorial"},
                    {"@type": "ListItem", "position": 3, "name": a["title"], "item": url}]}]}
            ld_txt = json.dumps(ld, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
            h = re.sub(r'<script type="application/ld\+json">.*?</script>',
                       lambda m: f'<script type="application/ld+json">{ld_txt}</script>', h, 1, re.S)
            h += f"<style>{ARTICLE_CSS}{HOVER_CSS}</style>"

            sources = a.get("sources") or []
            src_html = ""
            if sources:
                src_html = ('<div class="src"><h3>Sources</h3><ul>' + "".join(
                    f'<li><a href="{attr(s["url"])}" target="_blank" rel="noopener">{esc(s["title"])}</a></li>'
                    for s in sources if s.get("url")) + "</ul></div>")
            more = [o for o in items if o["slug"] != a["slug"]]
            more_html = ('<div class="more"><h3>More from ' + esc(stitle) + '</h3><div>' + "".join(
                f'<a class="trmd-chip" href="/articles/{o["slug"]}" style="{CHIP_STYLE} text-decoration: none;">'
                f'{esc(o["topic"])}</a>' for o in more) + "</div></div>") if more else ""

            main = (
                '<div style="flex: 1 1 0%;"><article class="trmd-art">'
                f'<div class="kicker"><a href="/editorial">Editorial</a> · {num} · {esc(stitle)}</div>'
                f'<h1>{esc(a["title"])}</h1>'
                f'<p class="dek">{esc(a["dek"])}</p>'
                f'<div class="meta">The Real Miami Dentists editorial desk · Updated {fmt_date(updated)}</div>'
                + render_body(a["body"]) + src_html +
                '<p class="note">Educational content, not individual medical advice. Every mouth is different, '
                'so talk to a licensed dentist about your own teeth. The Real Miami Dentists is powered by 5 Star Smiles.</p>'
                '<div class="cta"><span>Questions about your own smile?</span>'
                '<strong>Book a consultation at 5 Star Smiles, Coral Gables.</strong>'
                '<a href="tel:+13059302400">(305) 930-2400</a></div>'
                + more_html +
                '<p class="note"><a href="/editorial" style="color:rgb(201,204,206)">← Back to all editorial series</a></p>'
                "</article></div>")
            doc = h + "</head>\n" + header + main + footer
            (OUT / f"{a['slug']}.html").write_text(doc)
            keep.add(f"{a['slug']}.html")
    for old in OUT.glob("*.html"):
        if old.name not in keep:
            old.unlink()
    return len(keep)


# ---------- feed.html ----------

def build_feed(slugs):
    path = CONTENT / "feed.json"
    if not path.exists():
        return 0
    caps = {c["img"]: c for c in json.loads(path.read_text())}
    page = (ROOT / "feed.html").read_text()
    page = re.sub(r'<a class="trmd-cap".*?</a>', "", page, flags=re.S)
    count = 0

    def add(m):
        nonlocal count
        img = m.group(2)
        c = caps.get(img)
        if not c:
            return m.group(0)
        if c.get("article") and c["article"] not in slugs:
            sys.exit(f"feed.json: no article with slug {c['article']!r}")
        count += 1
        href = f'/articles/{c["article"]}' if c.get("article") else "/editorial"
        cap = (f'<a class="trmd-cap" href="{href}" style="position: absolute; left: 0px; right: 0px; bottom: 0px; '
               'padding: 96px 80px 36px; display: flex; flex-direction: column; gap: 10px; text-decoration: none; '
               'background: linear-gradient(rgba(5, 5, 5, 0) 0%, rgba(5, 5, 5, 0.86) 100%);">'
               '<span style="font-size: 9px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; '
               f'color: rgb(201, 204, 206);">{esc(c["kicker"])}</span>'
               '<span style="font-weight: 600; font-size: clamp(22px, 2.6vw, 40px); line-height: 1.05; '
               'letter-spacing: -0.02em; text-transform: uppercase; color: rgb(244, 242, 238); max-width: 760px; '
               f'text-wrap: balance;">{esc(c["caption"])}</span>'
               '<span class="trmd-cap-cta" style="font-size: 10px; font-weight: 600; letter-spacing: 0.28em; '
               'text-transform: uppercase; color: rgb(201, 204, 206);">Read the story →</span></a>')
        return m.group(0) + cap

    frame_end = ('<div style="position: absolute; top: 8px; left: 80px; right: 80px; display: flex; '
                 'justify-content: space-between; align-items: flex-start; gap: 24px;"></div>')
    page = re.sub(r'(<img src="(img/[^"]+)"[^>]*>(?:(?!<img ).)*?' + re.escape(frame_end) + ")",
                  add, page, flags=re.S)
    page = add_css(page)
    if "@media (max-width:640px){.trmd-cap{" not in page:
        page = page.replace("</head>", "<style>@media (max-width:640px){.trmd-cap{padding:48px 26px 20px!important}}</style></head>", 1)
    (ROOT / "feed.html").write_text(page)
    return count


# ---------- sitemap + llms.txt ----------

def build_index_files(series, titles):
    today = date.today().isoformat()
    sm = (ROOT / "sitemap.xml").read_text()
    sm = re.sub(r"\s*<url><loc>" + re.escape(SITE) + r"/articles/[^<]*</loc>.*?</url>", "", sm)
    entries = "".join(
        f'\n  <url><loc>{SITE}/articles/{a["slug"]}</loc><lastmod>{a.get("updated") or today}</lastmod>'
        f"<priority>0.6</priority></url>" for _, items in series for a in items)
    sm = sm.replace("\n</urlset>", entries + "\n</urlset>")
    (ROOT / "sitemap.xml").write_text(sm)

    llms = (ROOT / "llms.txt").read_text()
    llms = re.sub(r"## Articles\n.*?(?=## FAQ)", "", llms, flags=re.S)
    lines = ["## Articles", ""]
    for num, items in series:
        lines.append(f"### {num} · {titles.get(num, '')}")
        lines += [f"- [{a['title']}]({SITE}/articles/{a['slug']}): {a['dek']}" for a in items]
        lines.append("")
    llms = llms.replace("## FAQ", "\n".join(lines) + "\n## FAQ", 1)
    (ROOT / "llms.txt").write_text(llms)


def main():
    series = load_articles()
    page, titles = build_editorial(series)
    n = build_articles(series, titles, page)
    f = build_feed({a['slug'] for _, items in series for a in items})
    build_index_files(series, titles)
    print(f"Built {n} articles across {len(series)} series; {f} feed captions")


if __name__ == "__main__":
    main()

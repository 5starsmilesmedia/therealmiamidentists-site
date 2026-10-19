#!/usr/bin/env python3
"""Keep the homepage FAQ in sync across its three copies.

The visible <details> list in index.html (#faq) is the source of truth.
This rewrites the FAQPage block in index.html's JSON-LD and the "## FAQ"
section of llms.txt to match it. Run from the repo root after editing
the visible FAQ:

    python3 tools/sync_faq.py
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"
LLMS = ROOT / "llms.txt"
FAQ_URL = "https://therealmiamidentists.com/#faq"


def text(fragment):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", "", fragment)).split())


def first_sentence(answer):
    m = re.match(r"(.+?[.!?])(\s|$)", answer)
    return m.group(1) if m else answer


def main():
    page = INDEX.read_text()
    start = page.find('id="faq"')
    end = page.find("</section>", start)
    if start < 0 or end < 0:
        sys.exit("FAQ section not found in index.html")
    pairs = [
        (text(q), text(a))
        for q, a in re.findall(
            r"<details><summary><h3>(.*?)</h3></summary><p class=\"a\">(.*?)</p></details>",
            page[start:end],
            re.S,
        )
    ]
    if not pairs:
        sys.exit("No FAQ entries found")

    # JSON-LD: replace the FAQPage node inside the @graph.
    m = re.search(r'(<script type="application/ld\+json">)(.*?)(</script>)', page, re.S)
    data = json.loads(m.group(2))
    graph = data["@graph"] if "@graph" in data else [data]
    for node in graph:
        if node.get("@type") == "FAQPage":
            node["mainEntity"] = [
                {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                for q, a in pairs
            ]
            break
    else:
        sys.exit("FAQPage node not found in JSON-LD")
    ld = json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    page = page[: m.start(2)] + ld + page[m.end(2) :]
    INDEX.write_text(page)

    # llms.txt: rewrite everything after "## FAQ".
    llms = LLMS.read_text()
    head, sep, _ = llms.partition("## FAQ")
    if not sep:
        sys.exit('"## FAQ" heading not found in llms.txt')
    lines = [f"- [{q}]({FAQ_URL}): {first_sentence(a)}" for q, a in pairs]
    LLMS.write_text(head + "## FAQ\n\n" + "\n".join(lines) + "\n")

    print(f"Synced {len(pairs)} FAQ entries")


if __name__ == "__main__":
    main()

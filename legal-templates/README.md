# Legal templates

BurnCalc ships website legal copy derived from open-source templates on GitHub. **This is not legal advice.** Have a qualified attorney review before production use.

## Live pages

| Page | Source file | Route |
|------|-------------|--------|
| Privacy | `site/privacy.md` | `/privacy` |
| Terms | `site/terms.md` | `/terms` |
| Cookies | `site/cookies.md` | `/cookies` |

Edit the Markdown under `legal-templates/site/` to update published text. Pages render via `src/components/legal/legal-document.tsx`.

## Upstream templates (reference)

Vendored from [ryuno2525/privacy-policy-templates](https://github.com/ryuno2525/privacy-policy-templates) (MIT License). See `upstream/ryuno2525-privacy-policy-templates/LICENSE`.

Additional templates reviewed during setup:

- [termsfeed/termsfeed-legal-templates](https://github.com/termsfeed/termsfeed-legal-templates) — privacy, terms, cookies, disclaimer, EULA
- [laymonage/gdpr-privacy-policy](https://github.com/laymonage/gdpr-privacy-policy) — GDPR-oriented privacy sample
- [ArthurGareginyan/privacy-policy-template](https://github.com/ArthurGareginyan/privacy-policy-template) — general website privacy

BurnCalc `site/*.md` files were adapted from the **general website**, **terms of service (basic)**, and **cookie policy** templates in the ryuno2525 repo, customized for browser-based calculators at [burncalc.app](https://burncalc.app).

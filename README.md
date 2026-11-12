# JMRH 29:11 Outreach — Website

The official website for JMRH 29:11 Outreach: a searchable directory of free Bay Area resources, a printable wound-care guide, and ways to contact, volunteer, donate, and partner.

Built with Next.js 15 + TypeScript. No database to run, no tracking, no accounts for visitors.

> **Non-technical admins:** see [ADMIN-GUIDE.md](ADMIN-GUIDE.md) for how to update resources and page text.

---

## What's included

| Page | URL | Notes |
|---|---|---|
| Home | `/` | Hero, quick-access cards, wound-care feature, get-involved buttons |
| Find Resources | `/resources` | Search + area + type filters (work together), shareable URLs like `/resources?category=food` |
| Resource details | `/resources/[id]` | One page per listing, call + directions buttons |
| Wound Care | `/wound-care` | 5 steps, warning signs, 911 notice, printable checklist, print stylesheet |
| About Us | `/about` | Mission content + clearly marked placeholders |
| Get Involved | `/get-involved` | Volunteer, supplies, giving (placeholder), partnerships, share a resource |
| Contact Us | `/contact` | Real form → email. `?topic=volunteer` etc. preselects the topic |
| Privacy / Terms | `/privacy`, `/terms` | **Drafts — review before launch** |
| Resource data (JSON) | `/api/resources` | Versioned export for the future mobile app |
| Admin editor | `/admin` | Decap CMS for editing resources (setup below) |

Also: floating "Send us a message" button on every page, sitemap.xml, robots.txt, page titles/descriptions, and security headers.

### Built-in honesty rules
- The contact form says "sent" **only** after the server confirms delivery. Otherwise it shows an error and the email address.
- "Directions" appears only for fixed addresses. Mobile and phone-only services are labeled.
- Donate shows "Online giving is coming soon" until a donation URL is set.
- Nothing claims a service is open now; every page says to call ahead.

---

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in values (optional for local testing)
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build          # production build (also checks for errors)
npm run start          # serve the production build
npm run typecheck      # TypeScript check
npm run validate-data  # check src/data/resources.json for mistakes
```

---

## Deploy

Recommended: **Netlify** (free tier), because its built-in login ("Identity") powers the admin editor with no extra setup. Vercel also works for the site itself; see "Admin login on other hosts" below.

1. Put this folder in a GitHub repository (branch `main`).
2. In Netlify: **Add new site → Import from Git →** pick the repo. Netlify detects Next.js automatically.
3. Add the environment variables below under **Site configuration → Environment variables**, then redeploy.
4. Connect your domain under **Domain management**. HTTPS is automatic.
5. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy (this fixes sitemap and sharing links).

### Environment variables

| Variable | Required? | What it does |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Live site address, e.g. `https://www.jmrh2911outreach.org` |
| `RESEND_API_KEY` | For the contact form | API key from [resend.com](https://resend.com) (free tier) |
| `CONTACT_TO_EMAIL` | For the contact form | Where messages go: `JMRH2911Outreach@gmail.com` (comma-separate for several) |
| `CONTACT_FROM_EMAIL` | For the contact form | Sender on a domain verified in Resend, e.g. `Website <contact@yourdomain.org>` |
| `MESSAGE_WEBHOOK_URL` | Optional | Also forward each message as JSON to a shared inbox / texting service |

**Secrets live only in the hosting dashboard.** Never put them in code or commit `.env.local`.

### Set up contact-form email (about 15 minutes)
1. Create a Resend account. Add and verify your domain (Resend shows DNS records to copy into your domain registrar).
2. Create an API key → paste it into `RESEND_API_KEY`.
3. Set `CONTACT_FROM_EMAIL` to an address on that domain and `CONTACT_TO_EMAIL` to the Gmail address.
4. Redeploy, send a test message from `/contact`, and confirm it arrives (check Spam the first time).

Until this is done, the form shows a clear "not set up yet" error with the email address — it never pretends to send.

> Gmail can't be the *sender* (Gmail blocks that), which is why a domain is needed for `CONTACT_FROM_EMAIL`. Replies still go straight to the visitor when they choose email.

### Shared team messaging (the floating button)
Today the button opens the same contact form. To route messages to several team members or a shared phone number:
- **Simplest:** put several addresses in `CONTACT_TO_EMAIL`, or use a Google Group as the destination.
- **Shared inbox / texting:** pick a service that accepts an incoming webhook (e.g. a Slack workflow, Front, Missive, or a business-texting provider's webhook/Zapier integration) and set `MESSAGE_WEBHOOK_URL`. The site POSTs `{ subject, text, topic, replyMethod, replyTo, name }`.

### Donations
When a provider is chosen (Givebutter, PayPal Giving, Stripe Payment Links, etc.), paste its hosted donation page link into `donationUrl` in `src/config/site.ts`. The site never handles card details. Don't add "tax-deductible" wording until the organization's status is confirmed.

---

## Updating resources (admin)

All listings live in **one file**: `src/data/resources.json`. Every change becomes a commit, and the host redeploys automatically in about a minute — no manual rebuilding.

**Option A — Admin editor at `/admin` (recommended for volunteers)**
1. Netlify → **Integrations/Identity → Enable Identity**. Set registration to **Invite only**.
2. Identity → **Services → Enable Git Gateway**.
3. Invite team members by email. They click the invite link, set a password, and log in at `yoursite.org/admin`.
4. Edits are saved as drafts ("editorial workflow"), so someone can review before publishing.

**Option B — Edit the file directly on GitHub.** Open `src/data/resources.json` → pencil icon → edit → Commit. Run `npm run validate-data` locally if you can.

**Admin login on other hosts (e.g. Vercel):** change `backend` in `public/admin/config.yml` to `name: github` with `repo: OWNER/REPO`, and set up an OAuth provider per the [Decap CMS docs](https://decapcms.org/docs/github-backend/).

### Resource fields
```json
{
  "id": "stable-unique-slug",            // never change after publishing (URLs + app use it)
  "name": "Organization Name",
  "region": "san-jose | san-francisco | hayward-castro-valley-fremont | palo-alto-mountain-view-east-palo-alto | all",
  "categories": ["food", "medical"],     // see list below
  "description": "Short description.",
  "address": { "street": "", "city": null, "state": "CA", "postalCode": null },
  "phone": "4085392100",                 // digits only (or "211")
  "website": null,
  "locationType": "fixed | phone-only | mobile",
  "availabilityNotes": "Call ahead to confirm hours.",
  "lastVerified": "2026-10-22",          // or null; shown on the detail page
  "isActive": true                       // false = hidden, not deleted
}
```
Categories: `emergency-shelter`, `food`, `medical`, `mental-health`, `showers-laundry`, `housing`, `hygiene`, `social-services`, `general`.
Region `all` shows a listing in every area (used for 211).

To add a new category or region, update both `src/lib/resources.ts` and `public/admin/config.yml` (and `scripts/validate-resources.mjs`).

---

## Changing other things

| To change… | Edit |
|---|---|
| Logo | Replace `public/logo.png` (keep it square). Browser-tab icons are `src/app/icon.png` and `src/app/apple-icon.png` |
| Email, footer text, social links, donation link, wound-care PDF | `src/config/site.ts` |
| Colors / fonts | Top of `src/app/globals.css` (`:root` variables) |
| Page text | `src/app/<page>/page.tsx` (e.g. `src/app/about/page.tsx`) |
| Hero photo | Replace the "Photo coming soon" block in `src/app/page.tsx` with an `<img>` (use only consented, dignified photos) |
| Wound-care PDF | Put the reviewed PDF in `public/`, set `woundCarePdf: "/wound-care-guide.pdf"` in `site.ts` — the Download button appears automatically |

---

## Future mobile app

- `GET /api/resources` returns `{ schemaVersion, dataVersion, resources }` with only active listings.
- IDs are stable; the app can cache the whole file for offline use and refresh when `dataVersion` changes.
- Bump `dataVersion` (a date) whenever you edit resources. Bump `schemaVersion` only if field names/types change.

---

## Before launch checklist
- [ ] Re-verify every phone number and address by calling (then set `lastVerified`)
- [ ] Configure contact email and send a test message
- [ ] Review Privacy Policy and Terms (remove the "Draft" boxes)
- [ ] Fill or remove the About page placeholders
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain
- [ ] Submit the sitemap in Google Search Console (optional)

## Testing done
Automated browser tests (Chromium) covered: all pages load; axe-core WCAG 2.2 AA checks pass on every page; all 21 listings render with correct `tel:` links; directions only for fixed addresses; each area includes 211; combined filters, search, empty state, reset, and Back button; contact validation and honest failure state; floating dialog open/close; print view; no horizontal scrolling at 375px; touch targets ≥ 44px. Recommended before launch: a quick pass with a real phone and a screen reader (VoiceOver/TalkBack).

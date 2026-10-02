# Snowline

A US winter guide for 2026–27. It explains NOAA’s seasonal outlook, the Farmers’ Almanac update, and 1991–2020 snowfall normals for major cities, with a page for every state and a storm checklist.

People in the US were actively searching “winter 2026 2027 snowfall predictions” on October 1, 2026 (Google Trends: on the order of 50,000+ searches, about 1,000% above normal). That question lasts all winter, which makes it a better subject for an ad-supported site than a one-day news spike.

## Run it

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Copy `.env.example` to `.env.local` when you are ready to set a contact email or AdSense ids.

## Connect AdSense

Google has to approve the site. Approval is not guaranteed. What usually helps:

- Original pages that answer a real question (the state guides, the city table, and the storm kit).
- An about page, sources, a privacy policy, and a contact email (`NEXT_PUBLIC_CONTACT_EMAIL`).
- `ads.txt` served at `/ads.txt`. This app writes it from `NEXT_PUBLIC_ADSENSE_CLIENT`.
- Ads that are clearly labeled. This app renders a display unit only when both `NEXT_PUBLIC_ADSENSE_CLIENT` (`ca-pub-…`) and `NEXT_PUBLIC_ADSENSE_SLOT` are set. With Auto ads, the client id alone loads Google’s script.

Do not click your own ads, and do not ask visitors to click them. That gets an account banned.

After you change env vars, restart the dev server. `NEXT_PUBLIC_` values are baked in at build time, so a production build needs them present when you run `npm run build`.

## Update the outlook

NOAA’s Climate Prediction Center refreshes the seasonal maps about once a month, near mid-month. When the next December–February map comes out, revise `src/lib/states.ts` and the homepage summary. City normals in `src/lib/cities.ts` are 1991–2020 figures and change only when NOAA issues a new normals decade.

## Scripts

- `npm run dev` — local site on port 43123
- `npm run build` — production build
- `npm run lint` — ESLint

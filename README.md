# Habibur Rahaman — Client-Hunting Portfolio

A premium, conversion-focused multi-page portfolio built with Next.js and plain CSS.

## Pages

- `/` — Homepage
- `/about` — About
- `/work` — Case studies
- `/contact` — Project inquiry

## Branding

Primary: `#00A859`
Hover: `#008C4A`

The project/service/case-study containers intentionally use `padding: 0 !important`. Internal spacing is created with margins and layout gaps.

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

## Before launch

1. Replace the profile/photo placeholders.
2. Replace the sample case-study content with verified project outcomes.
3. Replace the sample testimonial copy with real client testimonials and names/roles where permission exists.
4. Connect the contact form to your preferred email/API endpoint.
5. Replace `https://example.com` in metadata with the live domain.
6. Add real social profile URLs in `components/Footer.tsx`.
7. Add analytics and conversion tracking only after deciding which events matter.

## CRO notes

The homepage intentionally follows:
Hero → About/Trust → Services → Case Studies → Process → Testimonials → CTA → Contact.

The primary CTA is repeated at high-intent points without making every section look like an advertisement.

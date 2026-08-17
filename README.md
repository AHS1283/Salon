# Lumiere Salon & Spa — React Website

A React + CSS recreation of the salon/spa landing page design (cream background,
dark charcoal + terracotta accent, serif headings).

## Structure

```
lumiere-salon/
├── public/
│   └── index.html
├── package.json
└── src/
    ├── index.js             entry point, mounts <App/>
    ├── App.jsx              composes all sections in order
    ├── App.css              all styling (design tokens as CSS variables at top)
    ├── data/
    │   └── content.js       all copy/content: nav links, services, gallery,
    │                        team, testimonials, features — edit this file to
    │                        change any text, price, or image without touching JSX
    └── components/
        ├── Header.jsx        sticky nav + mobile menu
        ├── Hero.jsx          "Look Good. Feel Amazing." banner
        ├── About.jsx         about + 4-icon feature row
        ├── Services.jsx      7 service cards with prices
        ├── FeaturesBar.jsx   dark strip: personalized care / hygiene / etc.
        ├── Gallery.jsx       filterable image grid
        ├── Team.jsx          expert cards + "Why choose us" panel
        ├── Testimonials.jsx  client review cards with arrow nav
        ├── Booking.jsx       booking form + contact details
        └── Footer.jsx        links, newsletter, socials
```

## Run it locally

```bash
npm install
npm start
```

This opens the app automatically at http://localhost:3000 (standard
Create React App dev server).

## Customizing

- **Colors / fonts**: edit the CSS variables at the top of `src/App.css`
  (`--cream`, `--dark`, `--accent`, `--gold`, fonts are Playfair Display +
  Poppins, loaded via Google Fonts in `public/index.html`).
- **Text & data**: edit `src/data/content.js` — every card, price, name and
  testimonial lives there.
- **Images**: currently pulled from Unsplash (services/gallery) and
  randomuser.me (team/testimonial avatars) as placeholders — swap the `img`
  URLs for your own photos.
- **Icons**: from `lucide-react` (already in `package.json`).

## Notes

- Fully responsive (breakpoint at 900px) — nav collapses to a hamburger menu,
  grids stack to 1–2 columns.
- The booking form is UI-only; wire the `onSubmit` in `Booking.jsx` to your
  backend / email service / booking API.

# QAVYON — Site web B2B

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Prêt pour un déploiement Vercel.

## Démarrage

```bash
npm install
npm run dev
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner :

- `HUBSPOT_API_KEY` — token d'app privée HubSpot (scope `crm.objects.contacts.write`).
- `KV_REST_API_URL` / `KV_REST_API_TOKEN` — store Vercel KV (ou tout backend compatible REST Upstash), utilisé comme file de retry si HubSpot est indisponible. Provisionnés automatiquement en attachant un Vercel KV store au projet.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — optionnel, si vous chargez le script Plausible dans `app/layout.tsx`.

## Ce qui est livré

- **Design system** : tokens Tailwind (Obsidian/Carbon/Graphite/Steel, Ice/Mist, Electric Cyan, Impact) dans `tailwind.config.ts` + `app/globals.css`.
- **8 sections homepage**, **hub + 6 pages solutions** (template partagé + données dans `lib/solutions-data.ts`), `/system`, `/how-we-work`, `/about`, `/insights` (+ `[slug]`), `/quickscan`, `/book`.
- **Composant QAVYON System** (`components/QavyonSystem.tsx`) : 5 couches + enveloppe Trust, hover/tap, `systemPath` pour le mode highlight sur les pages solutions, scrollytelling via `IntersectionObserver`, respect de `prefers-reduced-motion`.
  - Choix d'implémentation : construit en HTML/CSS interactif (boutons, focus clavier natif) plutôt qu'en SVG pur, pour garantir l'accessibilité clavier des couches interactives. `role="img"` + `aria-label` descriptif en tiennent lieu ; adapter si un rendu SVG strict est requis.
- **QuickScan** : wizard 7 étapes (`components/QuickScanWizard.tsx`), moteur de règles pur côté serveur (`lib/quickscan-engine.ts`), endpoint `POST /api/quickscan`, persistance de session via `sessionStorage`, tracking `quickscan_step_{n}` / `quickscan_abandon_{n}`.
- **Leads** : `POST /api/lead` → HubSpot, fallback file de retry KV (`lib/hubspot.ts`). Consentement RGPD non pré-coché.
- **Tracking** : `lib/tracking.ts`, câblé sur les événements du brief (`hero_cta_click`, `problem_entry_click`, etc.). Branché sur `window.plausible` si le script est chargé.
- **SEO** : métadonnées Next.js par page, Organization/Service/Article/FAQPage/BreadcrumbList JSON-LD, `app/sitemap.ts`, `app/robots.ts`, redirections 301 (fautes de frappe de domaine) dans `next.config.js`.

## À compléter avant mise en production

Conformément à la contrainte "pas de contenu inventé" : `/about` (bios réelles), `/insights` (articles réels), `/legal/mentions` et `/legal/privacy` (informations légales réelles) contiennent des placeholders explicitement marqués comme tels dans le code. Le corps de police Satoshi n'étant pas sur Google Fonts, Inter est câblé comme fallback fonctionnel — voir le commentaire dans `app/layout.tsx` pour brancher la vraie police Satoshi en fichier local.

## Build

```bash
npm run build
```

Validé avec `next build` (compilation + type-check + génération statique des 26 routes) et `tsc --noEmit`.

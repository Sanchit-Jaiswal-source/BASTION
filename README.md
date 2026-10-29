# BASTION × NOVA Market

A single React/Vite demonstration that brings the NOVA Market storefront together with the BASTION five-step digital-twin presentation and a scripted local Scenario Lab. All catalogue, order, incident, service, and audit data stays in browser memory. The app has no backend, payment processor, production integrations, or external security operations.

## Requirements and run

- Node.js 20.19+ or 22.12+
- npm

From this project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). Create a production build with `npm run build`.

## GitHub Pages

The production build is deployed to [the BASTION Pages site](https://sanchit-jaiswal-source.github.io/BASTION/) by `.github/workflows/pages.yml`. After merging this workflow, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The build uses the `/BASTION/` base path required by this repository's Pages URL.

Repository: https://github.com/Sanchit-Jaiswal-source/BASTION

## Feature map

- **NOVA Market** — cinematic storefront introduction; 18 sample products with bundled local product photography; category filters, search and sort; favourites; product details with three-image galleries; quantity controls; cart and subtotal/shipping; delivery validation; demo payment selection; review and confirmation.
- **Scenario Lab** — three deterministic event generators: synthetic credential-abuse burst, local checkout/request-surge summaries, and invented suspicious-order records. Events are visible in the shared local incident timeline. The Lab generates events only; it is not the defense actor.
- **BASTION Security** — the original welcome scene and five-step presentation: briefing/timeline, service topology, response comparison, and simulated outcome. Operators can select and explicitly apply a Bastion-owned response to the seeded scenario. The model updates service/operation availability and writes a Bastion-attributed audit event.
- **Shared service twin** — NOVA Customer Portal / Storefront → Payment API / Checkout → Ledger / Order Records. Scenario state, service health, selected and applied response, and audit history are shared across Lab, Security, and Market views. Applying host isolation keeps product browsing and the cart available but disables demo checkout until reset; credential revocation, rate limiting, and order review preserve checkout availability as shown by their modeled outcomes.

## Safe simulation scope

**LOCAL SIMULATION ONLY — no external systems or real credentials used.** Scenario generators create fixed mock events in local application state. They do not generate network traffic, submit requests, scan targets, run commands, access real credentials, process payments, or read or change real orders. The marketplace checkout is a front-end demonstration; delivery details remain in memory and are never sent to a server. Scenario response options are operator-approved, deterministic examples; they demonstrate effects in this local model only and do not claim production protection or universal incident-response efficacy.

Reset in Scenario Lab returns the incident, services, selected response, and audit state to baseline. Replay a scenario to seed its events again.

## Local assets and accessibility

- `public/assets/products/` contains the NOVA product images bundled for offline use.
- NOVA's original visual language is scoped to the marketplace surface; BASTION retains its own dark, cinematic interface.
- Both interfaces support keyboard focus and reduced-motion preferences. Product galleries can be operated with the arrow keys while open; Escape closes the detail view.

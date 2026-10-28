# Daywell + Bastion

A polished, client-side demo that brings the Daywell everyday marketplace and the Bastion security incident view together in one app. Switch between **Marketplace** and **Bastion Security** in the top navigation.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. For example, with Python installed:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Marketplace demo

- Browse eight fictional sample products, filter by category, and search.
- Add products to the cart, change quantities, and remove items.
- Review the cart subtotal and complete a no-payment demo checkout.
- Product illustrations are embedded in the app.

## Bastion simulation

The Bastion view models a synthetic sign-in timeline for `svc-billing-worker` and a simple service graph: **Customer Portal → Payment API → Ledger Database**. The repeatable demo story starts with a healthy marketplace. In the **Attack & protection lab**, a deterministic local sequence of failed mock sign-ins and a synthetic success is followed by a mock billing operation that disrupts checkout. Bastion displays the detection and lets you choose a response. Revoking the synthetic billing credential denies later mock requests and restores the modeled Payment API and checkout; isolating the Payment API host contains requests but leaves checkout unavailable. Both options preserve browsing and the cart. Reset returns the app to its healthy starting state.

All incident evidence, identities, services, and results are illustrative. The lab caption is **“Controlled local simulation — no external systems or real credentials used.”** Events are generated in page memory; no credentials or secrets are collected or displayed. There is no backend, external request, payment processing, scanning, credential change, or real security action.

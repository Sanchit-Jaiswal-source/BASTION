const products = [
  {
    id: "morning-mug",
    name: "Morning mug",
    category: "Kitchen",
    price: 18,
    description: "A hand-feel-good ceramic for your first sip.",
    label: "Bestseller",
    bg: "#efe7dc",
    circle: "#e5d6c6",
    art: `<path d="M89 89h96v107c0 15-12 27-27 27h-42c-15 0-27-12-27-27V89Z" fill="#c77c5d"/><path d="M185 109h14c23 0 35 13 35 34s-13 34-36 34h-13" fill="none" stroke="#c77c5d" stroke-width="17"/><path d="M101 106h73M101 118h73" stroke="#e5aa89" stroke-width="4" stroke-linecap="round"/><ellipse cx="137" cy="89" rx="48" ry="10" fill="#e3a27e"/><ellipse cx="137" cy="90" rx="36" ry="5" fill="#f5d6bd"/>`
  },
  {
    id: "linen-towel",
    name: "Linen tea towel",
    category: "Kitchen",
    price: 16,
    description: "Soft washed linen, ready for the daily dishes.",
    label: "Natural linen",
    bg: "#e9eddf",
    circle: "#dce4d1",
    art: `<path d="M84 55h112l18 166H68L84 55Z" fill="#d1d6b7"/><path d="M98 55h16l-12 166H86L98 55Zm51 0h14l11 166h-13L149 55Z" fill="#faf6e9"/><path d="M83 69h112" stroke="#b2b99a" stroke-width="3" stroke-dasharray="3 7"/><path d="m68 221 9-9m128 9-9-9" stroke="#a9b08f" stroke-width="2"/>`
  },
  {
    id: "daily-bottle",
    name: "Daily glass bottle",
    category: "Home",
    price: 24,
    description: "A sturdy little reminder to take a water break.",
    label: "Refill & repeat",
    bg: "#e3eceb",
    circle: "#d2e0dc",
    art: `<path d="M119 62h43v27l16 16v111c0 12-9 21-21 21h-34c-12 0-21-9-21-21V105l17-16V62Z" fill="#9ab4ab" fill-opacity=".72" stroke="#68877b" stroke-width="4"/><path d="M119 62h43v27h-43z" fill="#d89a68"/><path d="M113 119h55M113 131h55M113 143h55" stroke="#e8f0e9" stroke-width="4" opacity=".85"/><path d="M128 68h24" stroke="#f5f4e9" stroke-width="4" stroke-linecap="round"/>`
  },
  {
    id: "soft-soap",
    name: "Soft hands soap",
    category: "Personal care",
    price: 12,
    description: "A gentle everyday bar with a fresh, clean feel.",
    label: "Plant-based",
    bg: "#f0e4df",
    circle: "#ead8d0",
    art: `<path d="m76 119 23-39c4-7 10-10 18-10h76c8 0 13 4 17 11l20 38-15 89c-2 11-10 17-22 17h-78c-12 0-20-6-22-17l-17-89Z" fill="#dfb6a4"/><path d="M83 117h139" stroke="#f2d8ca" stroke-width="5"/><path d="M110 164c20-12 49-12 72 0" fill="none" stroke="#c18d79" stroke-width="4" stroke-linecap="round"/><circle cx="106" cy="99" r="4" fill="#f7e5d8"/><circle cx="194" cy="99" r="3" fill="#f7e5d8"/>`
  },
  {
    id: "pantry-jar",
    name: "Pantry jar",
    category: "Kitchen",
    price: 20,
    description: "Keep the little staples close and looking lovely.",
    label: "Everyday storage",
    bg: "#f0ebdc",
    circle: "#e6dec7",
    art: `<path d="M91 95h112l12 107c1 13-7 22-20 22H99c-13 0-21-9-20-22L91 95Z" fill="#b9c9b9" fill-opacity=".68" stroke="#829789" stroke-width="4"/><path d="M89 94h116V80c0-7-5-12-12-12h-92c-7 0-12 5-12 12v14Z" fill="#bd8c64"/><path d="M84 150h126" stroke="#f8f3e7" stroke-width="4" opacity=".85"/><path d="M84 177h126" stroke="#f8f3e7" stroke-width="4" opacity=".85"/><circle cx="144" cy="82" r="3" fill="#e7c8a9"/>`
  },
  {
    id: "notes-notebook",
    name: "Notes for later",
    category: "Stationery",
    price: 14,
    description: "A fresh page for lists, plans, and passing thoughts.",
    label: "Made to jot",
    bg: "#e7e8ee",
    circle: "#d9dce6",
    art: `<path d="M83 70h111c11 0 18 7 18 18v128H101c-11 0-18-7-18-18V70Z" fill="#8f9eae"/><path d="M101 70v146c0 11 7 18 18 18" fill="none" stroke="#718496" stroke-width="5"/><path d="M118 103h73M118 119h73M118 135h73M118 151h55" stroke="#d7e0e5" stroke-width="4" stroke-linecap="round"/><path d="M94 69v159" stroke="#e8ece8" stroke-width="2" stroke-dasharray="3 7"/><path d="M154 70v-9h29v9" fill="#d59168"/>`
  },
  {
    id: "little-lamp",
    name: "Little reading lamp",
    category: "Home",
    price: 38,
    description: "A warm pool of light for slow evenings and good books.",
    label: "A soft glow",
    bg: "#f0e8d9",
    circle: "#e8dbc1",
    art: `<path d="M116 91c0-10 7-17 17-17h39c10 0 17 7 17 17v39h-73V91Z" fill="#d99c67"/><path d="M131 130v56c0 8-5 13-13 13h-4" fill="none" stroke="#667d71" stroke-width="9" stroke-linecap="round"/><path d="M104 198h100c8 0 13 5 13 12v7H91v-7c0-7 5-12 13-12Z" fill="#667d71"/><path d="M125 97h55" stroke="#f2c99e" stroke-width="4" stroke-linecap="round"/><path d="M152 130v49" stroke="#83978a" stroke-width="3"/>`
  },
  {
    id: "market-tote",
    name: "Market day tote",
    category: "Home",
    price: 22,
    description: "Room for the little extras, and one more good book.",
    label: "Carry everywhere",
    bg: "#eee5df",
    circle: "#e4d7ce",
    art: `<path d="M80 105h142l-11 116c-1 10-8 17-19 17h-82c-11 0-18-7-19-17L80 105Z" fill="#c99678"/><path d="M110 110V86c0-22 13-36 40-36s40 14 40 36v24" fill="none" stroke="#b47e62" stroke-width="10" stroke-linecap="round"/><path d="M103 139h96M104 155h94" stroke="#e7c0a5" stroke-width="3" opacity=".85"/><path d="M140 183c8-8 18-8 26 0-8 10-18 10-26 0Z" fill="#f2ddc7"/>`
  }
];

const categories = ["All things", "Kitchen", "Home", "Personal care", "Stationery"];
const cart = new Map();
let activeCategory = "All things";
let searchTerm = "";
let simulatedResponse = "baseline";
let attackHasRun = false;
let attackIsRunning = false;

const productGrid = document.querySelector("#product-grid");
const categoryList = document.querySelector("#category-list");
const searchInput = document.querySelector("#product-search");
const resultsLabel = document.querySelector("#results-label");
const emptyResults = document.querySelector("#empty-results");
const cartDialog = document.querySelector("#cart-dialog");
const checkoutDialog = document.querySelector("#checkout-dialog");
const cartContent = document.querySelector("#cart-content");
const cartSummary = document.querySelector("#cart-summary");
const cartCount = document.querySelector("#cart-count");
const cartStatus = document.querySelector("#cart-status");

function money(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

function illustration(product, className = "product-illustration") {
  return `<svg class="${className}" viewBox="0 0 300 290" aria-hidden="true" focusable="false"><g>${product.art}</g></svg>`;
}

function renderCategories() {
  categoryList.innerHTML = categories.map(category => `
    <button class="category-button" type="button" data-category="${category}" aria-pressed="${activeCategory === category}">
      ${category}
    </button>
  `).join("");
}

function matchingProducts() {
  const query = searchTerm.trim().toLocaleLowerCase();
  return products.filter(product => {
    const categoryMatches = activeCategory === "All things" || product.category === activeCategory;
    const searchMatches = !query || `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase().includes(query);
    return categoryMatches && searchMatches;
  });
}

function renderProducts() {
  const matches = matchingProducts();
  productGrid.hidden = matches.length === 0;
  emptyResults.hidden = matches.length > 0;
  resultsLabel.textContent = `${matches.length} ${matches.length === 1 ? "good thing" : "good things"}`;
  productGrid.innerHTML = matches.map(product => `
    <article class="product-card">
      <div class="product-image" style="--art-bg:${product.bg};--art-circle:${product.circle}">
        <span class="product-tag">${product.label}</span>
        ${illustration(product)}
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <div class="product-name-row"><h3 class="product-name">${product.name}</h3><span class="product-price">${money(product.price)}</span></div>
        <p class="product-description">${product.description}</p>
        <button class="add-button" type="button" data-add="${product.id}" aria-label="Add ${product.name} to your bag"><span aria-hidden="true">+</span> Add to bag</button>
      </div>
    </article>
  `).join("");
}

function cartSize() {
  return [...cart.values()].reduce((sum, quantity) => sum + quantity, 0);
}

function subtotal() {
  return [...cart.entries()].reduce((sum, [id, quantity]) => {
    const product = products.find(item => item.id === id);
    return sum + product.price * quantity;
  }, 0);
}

function renderCart() {
  const size = cartSize();
  cartCount.textContent = size;
  cartCount.setAttribute("aria-label", `${size} ${size === 1 ? "item" : "items"} in your bag`);

  if (size === 0) {
    cartContent.innerHTML = `<div class="cart-empty"><span aria-hidden="true">✳</span><h3>Your bag is taking a breather.</h3><p>Find a little something for your everyday.</p><button class="button button-dark" type="button" data-close-dialog="cart-dialog">Back to shopping <span aria-hidden="true">↗</span></button></div>`;
    const checkoutIssue = simulatedResponse === "attack"
      ? "Checkout disrupted in this demo: the mock billing operation degraded the Payment API."
      : simulatedResponse === "isolate" ? "Checkout unavailable in this demo: the Payment API host is simulated as isolated." : "";
    cartSummary.innerHTML = `${checkoutIssue ? `<p class="checkout-unavailable">${checkoutIssue}</p>` : ""}<p class="cart-subtotal"><span>Subtotal</span><span>${money(0)}</span></p><p class="cart-disclaimer">Demo shop only. No shipping, taxes, or payment are collected.</p><button class="button button-dark checkout-button" type="button" disabled>Checkout</button>`;
    return;
  }

  cartContent.innerHTML = [...cart.entries()].map(([id, quantity]) => {
    const product = products.find(item => item.id === id);
    return `<article class="cart-item">
      <div class="cart-item-art" style="--art-bg:${product.bg}">${illustration(product, "")}</div>
      <div>
        <h3 class="cart-item-name">${product.name}</h3>
        <span class="cart-item-price">${money(product.price)} each</span>
        <div class="cart-quantity" aria-label="Quantity for ${product.name}">
          <button class="quantity-button" type="button" data-decrease="${id}" aria-label="Decrease ${product.name} quantity"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10"/></svg></button>
          <span class="quantity-value">${quantity}</span>
          <button class="quantity-button" type="button" data-increase="${id}" aria-label="Increase ${product.name} quantity"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M8 3v10"/></svg></button>
        </div>
      </div>
      <div class="cart-item-end"><span class="cart-item-total">${money(product.price * quantity)}</span><button class="remove-button" type="button" data-remove="${id}" aria-label="Remove ${product.name} from your bag">Remove</button></div>
    </article>`;
  }).join("");
  const checkoutUnavailable = simulatedResponse === "isolate" || simulatedResponse === "attack";
  const checkoutIssue = simulatedResponse === "attack"
    ? "Checkout disrupted in this demo: the mock billing operation degraded the Payment API. Browsing and your bag still work."
    : "Checkout unavailable in this demo: the Payment API host is isolated. Browsing and your bag still work.";
  cartSummary.innerHTML = `${checkoutUnavailable ? `<p class="checkout-unavailable">${checkoutIssue}</p>` : ""}<p class="cart-subtotal"><span>Subtotal</span><span>${money(subtotal())}</span></p><p class="cart-disclaimer">Demo shop only. No shipping, taxes, or payment are collected.</p><button class="button button-dark checkout-button" type="button" id="checkout-button" ${checkoutUnavailable ? "disabled" : ""}>${simulatedResponse === "attack" ? "Checkout disrupted · mock incident active" : simulatedResponse === "isolate" ? "Checkout unavailable · host isolated" : 'Continue to demo checkout <span aria-hidden="true">↗</span>'}</button>`;
}

function announceCart(message) {
  cartStatus.textContent = "";
  window.setTimeout(() => { cartStatus.textContent = message; }, 20);
}

function changeQuantity(id, amount) {
  const quantity = (cart.get(id) || 0) + amount;
  if (quantity <= 0) cart.delete(id);
  else cart.set(id, quantity);
  renderCart();
  const product = products.find(item => item.id === id);
  announceCart(quantity > 0 ? `${product.name} quantity ${quantity}.` : `${product.name} removed from your bag.`);
}

categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderProducts();
});

const marketplaceView = document.querySelector("#marketplace-view");
const bastionView = document.querySelector("#bastion-view");
const appTabs = [...document.querySelectorAll(".app-tab")];
const cartTrigger = document.querySelector("#open-cart");

function setView(view) {
  const isBastion = view === "bastion";
  marketplaceView.hidden = isBastion;
  bastionView.hidden = !isBastion;
  cartTrigger.hidden = isBastion;
  document.body.dataset.activeView = view;
  appTabs.forEach(tab => {
    const active = tab.dataset.view === view;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  document.title = isBastion
    ? "Bastion Security — Daywell simulation"
    : "Daywell — good things for every day";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector(".app-switcher").addEventListener("click", event => {
  const tab = event.target.closest("[data-view]");
  if (tab) setView(tab.dataset.view);
});

document.addEventListener("click", event => {
  const viewLink = event.target.closest('[data-view]:not(.app-tab)');
  if (viewLink) setView(viewLink.dataset.view);
});

document.querySelector(".app-switcher").addEventListener("keydown", event => {
  if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
  event.preventDefault();
  const currentIndex = appTabs.findIndex(tab => tab.getAttribute("aria-selected") === "true");
  const direction = event.key === "ArrowRight" ? 1 : -1;
  const next = appTabs[(currentIndex + direction + appTabs.length) % appTabs.length];
  setView(next.dataset.view);
  next.focus();
});

const simulation = {
  state: "baseline",
  stateLabel: document.querySelector("#incident-state"),
  portalNode: document.querySelector("#portal-node"),
  paymentNode: document.querySelector("#payment-node"),
  ledgerNode: document.querySelector("#ledger-node"),
  portalApiLink: document.querySelector("#portal-api-link"),
  apiLedgerLink: document.querySelector("#api-ledger-link"),
  impact: document.querySelector("#summary-impact"),
  impactDetail: document.querySelector("#summary-impact-detail"),
  credentialStatus: document.querySelector("#credential-status"),
  credentialRequests: document.querySelector("#credential-requests"),
  outcome: document.querySelector("#response-outcome"),
  outcomeIcon: document.querySelector("#outcome-icon"),
  outcomeTitle: document.querySelector("#outcome-title"),
  outcomeDescription: document.querySelector("#outcome-description"),
  outcomeKicker: document.querySelector("#outcome-kicker"),
  resetButton: document.querySelector("#reset-simulation"),
  outageNotice: document.querySelector("#storefront-outage"),
  outageTitle: document.querySelector("#outage-title"),
  outageCopy: document.querySelector("#outage-copy"),
  labState: document.querySelector("#lab-state"),
  labStateText: document.querySelector("#lab-state span"),
  runButton: document.querySelector("#run-simulated-attack"),
  runLabel: document.querySelector("#run-attack-label"),
  feed: document.querySelector("#attack-feed"),
  feedEmpty: document.querySelector("#feed-empty"),
  feedCount: document.querySelector("#feed-count"),
  detectionSummary: document.querySelector("#detection-summary"),
  detectionCopy: document.querySelector("#detection-copy")
};

function updateMarketplaceAvailability() {
  simulation.outageNotice.hidden = simulatedResponse !== "isolate" && simulatedResponse !== "attack";
  if (simulatedResponse === "attack") {
    simulation.outageTitle.textContent = "Demo checkout is disrupted.";
    simulation.outageCopy.textContent = " The mock billing event degraded the Payment API; browsing and your bag remain available.";
  } else if (simulatedResponse === "isolate") {
    simulation.outageTitle.textContent = "Demo checkout remains unavailable.";
    simulation.outageCopy.textContent = " The simulated Payment API host is isolated; browsing and your bag remain available.";
  }
  renderCart();
}

function setNodeStatus(node, status, health) {
  node.dataset.health = health;
  node.querySelector("[data-node-status]").textContent = status;
}

let labEventCount = 0;
let requestSequence = 0;

function updateFeedCount() {
  simulation.feedCount.textContent = `${labEventCount} ${labEventCount === 1 ? "EVENT" : "EVENTS"}`;
}

function appendLabEvent({ time, kind, message, reference }) {
  simulation.feedEmpty.hidden = true;
  const row = document.createElement("li");
  row.className = "feed-event";
  row.dataset.kind = kind;

  const timestamp = document.createElement("time");
  timestamp.className = "feed-time";
  timestamp.textContent = `${time} UTC`;
  const dot = document.createElement("span");
  dot.className = "feed-dot";
  dot.setAttribute("aria-hidden", "true");
  const description = document.createElement("span");
  description.className = "feed-message";
  description.textContent = message;
  const eventReference = document.createElement("span");
  eventReference.className = "feed-reference";
  eventReference.textContent = reference;

  row.append(timestamp, dot, description, eventReference);
  simulation.feed.append(row);
  labEventCount += 1;
  updateFeedCount();
  simulation.feed.scrollTop = simulation.feed.scrollHeight;
}

function nextRequestTime() {
  requestSequence += 1;
  const second = String(20 + (requestSequence % 35)).padStart(2, "0");
  return `09:22:${second}`;
}

function runProtectedRequest() {
  if (simulatedResponse === "revoke") {
    appendLabEvent({
      time: nextRequestTime(),
      kind: "blocked",
      message: "Synthetic request denied: svc-billing-worker is revoked.",
      reference: "IDENTITY BLOCK"
    });
    simulation.labState.dataset.state = "contained";
    simulation.labStateText.textContent = "REQUEST BLOCKED";
    simulation.detectionSummary.dataset.state = "contained";
    simulation.detectionCopy.textContent = "Protection active: this synthetic identity's follow-up request was denied. Marketplace services remain available.";
  } else if (simulatedResponse === "isolate") {
    appendLabEvent({
      time: nextRequestTime(),
      kind: "blocked",
      message: "Synthetic request denied: Payment API host is isolated.",
      reference: "HOST ISOLATED"
    });
    simulation.labState.dataset.state = "contained";
    simulation.labStateText.textContent = "HOST ISOLATED";
    simulation.detectionSummary.dataset.state = "contained";
    simulation.detectionCopy.textContent = "Containment active: the isolated mock host accepts no requests. Marketplace browsing remains available; checkout is unavailable.";
  } else if (simulatedResponse === "attack") {
    appendLabEvent({
      time: nextRequestTime(),
      kind: "success",
      message: "Synthetic follow-up billing request reached the degraded mock service.",
      reference: "MOCK REQUEST"
    });
    simulation.labState.dataset.state = "detected";
    simulation.labStateText.textContent = "INCIDENT ACTIVE";
    simulation.detectionSummary.dataset.state = "detected";
    simulation.detectionCopy.textContent = "The mock billing identity is still active. Choose a response: revoke it to restore checkout, or isolate the Payment API host.";
  }
  simulation.runLabel.textContent = "Replay synthetic request";
  simulation.runButton.disabled = false;
}

function waitForDemoTick() {
  return new Promise(resolve => window.setTimeout(resolve, 420));
}

async function runSimulatedAttack() {
  if (attackIsRunning) return;

  attackIsRunning = true;
  simulation.runButton.disabled = true;
  document.querySelectorAll(".response-button").forEach(button => {
    button.disabled = true;
  });
  simulation.labState.dataset.state = "running";
  simulation.labStateText.textContent = "GENERATING EVENTS";
  simulation.detectionSummary.dataset.state = "";
  simulation.detectionCopy.textContent = "Synthetic mock requests are being generated locally. No credentials or network requests are involved.";

  try {
    if (attackHasRun || simulatedResponse !== "baseline") {
      attackHasRun = true;
      runProtectedRequest();
    } else {
      attackHasRun = true;
      const attempts = [
        {
          time: "09:14:03",
          kind: "failed",
          message: "Synthetic sign-in rejected for mock identity svc-billing-worker · 203.0.113.42.",
          reference: "ATTEMPT 01"
        },
        {
          time: "09:16:51",
          kind: "failed",
          message: "Second synthetic sign-in rejected · documentation range 198.51.100.27.",
          reference: "ATTEMPT 02"
        },
        {
          time: "09:22:18",
          kind: "success",
          message: "Synthetic sign-in accepted in the local mock model · no secret was used.",
          reference: "MOCK SESSION"
        }
      ];

      for (const attempt of attempts) {
        await waitForDemoTick();
        appendLabEvent(attempt);
      }

      await waitForDemoTick();
      appendLabEvent({
        time: "09:22:18.500",
        kind: "success",
        message: "Synthetic billing operation degraded the mock Payment API; demo checkout is now interrupted.",
        reference: "CHECKOUT IMPACT"
      });
      simulatedResponse = "attack";
      simulation.state = "attack";
      setNodeStatus(simulation.paymentNode, "Degraded · checkout down", "degraded");
      simulation.portalApiLink.dataset.health = "degraded";
      simulation.apiLedgerLink.dataset.health = "degraded";
      simulation.impact.textContent = "Checkout disrupted";
      simulation.impactDetail.textContent = "Mock billing operation degraded Payment API";
      updateMarketplaceAvailability();

      await waitForDemoTick();
      appendLabEvent({
        time: "09:22:19",
        kind: "detection",
        message: "Bastion detected repeated failed sign-ins followed by a synthetic success.",
        reference: "DEMO DETECTION"
      });
      simulation.labState.dataset.state = "detected";
      simulation.labStateText.textContent = "PATTERN DETECTED";
      simulation.detectionSummary.dataset.state = "detected";
      simulation.detectionCopy.textContent = "Credential-abuse pattern detected: two failed attempts followed by a synthetic sign-in. Choose a response to contain the mock session.";
      simulation.stateLabel.dataset.state = "detected";
      simulation.stateLabel.innerHTML = "<span></span> SIMULATED · CHECKOUT DISRUPTED";
      simulation.runLabel.textContent = "Choose a response to continue";
      simulation.runButton.disabled = true;
      document.querySelectorAll(".response-button").forEach(button => {
        button.disabled = false;
      });
    }
  } finally {
    attackIsRunning = false;
    document.querySelectorAll(".response-button").forEach(button => {
      button.disabled = !attackHasRun;
    });
    if (simulatedResponse === "attack") {
      simulation.runButton.disabled = true;
      simulation.runLabel.textContent = "Choose a response to continue";
    } else if (simulatedResponse !== "baseline" && attackHasRun) {
      simulation.runButton.disabled = false;
      simulation.runLabel.textContent = "Replay synthetic request";
    }
  }
}

function resetSimulation() {
  simulation.state = "baseline";
  simulatedResponse = "baseline";
  attackHasRun = false;
  attackIsRunning = false;
  labEventCount = 0;
  requestSequence = 0;
  simulation.stateLabel.dataset.state = "";
  simulation.stateLabel.innerHTML = "<span></span> INVESTIGATING";
  simulation.portalNode.dataset.health = "available";
  setNodeStatus(simulation.portalNode, "Available", "available");
  setNodeStatus(simulation.paymentNode, "Reachable", "available");
  setNodeStatus(simulation.ledgerNode, "Available", "available");
  simulation.portalApiLink.dataset.health = "available";
  simulation.apiLedgerLink.dataset.health = "available";
  simulation.impact.textContent = "Checkout reachable";
  simulation.impactDetail.textContent = "No simulated service interruption";
  simulation.credentialStatus.textContent = "Active · simulated";
  simulation.credentialStatus.dataset.state = "";
  simulation.credentialRequests.textContent = "Allowed · not exercised";
  simulation.outcome.hidden = true;
  simulation.outcome.dataset.outcome = "";
  simulation.resetButton.hidden = true;
  simulation.labState.dataset.state = "ready";
  simulation.labStateText.textContent = "READY TO RUN";
  simulation.runButton.disabled = false;
  simulation.runLabel.textContent = "Run simulated attack";
  simulation.feed.innerHTML = "";
  simulation.feed.append(simulation.feedEmpty);
  simulation.feedEmpty.hidden = false;
  simulation.feedEmpty.textContent = "No lab events yet. Run the simulation to generate a synthetic sequence.";
  updateFeedCount();
  simulation.detectionSummary.dataset.state = "";
  simulation.detectionCopy.textContent = "Bastion detection is waiting for simulated events.";
  document.querySelectorAll(".response-card").forEach(card => {
    delete card.dataset.selected;
  });
  document.querySelectorAll(".response-button").forEach(button => {
    button.disabled = true;
  });
  updateMarketplaceAvailability();
}

function applySimulation(response) {
  if (!attackHasRun || attackIsRunning) return;
  simulation.state = response;
  simulatedResponse = response;
  simulation.outcome.hidden = false;
  simulation.outcome.dataset.outcome = response;
  simulation.resetButton.hidden = false;
  document.querySelectorAll(".response-card").forEach(card => {
    card.dataset.selected = String(card.id === (response === "isolate" ? "isolate-card" : "revoke-card"));
  });

  if (response === "isolate") {
    simulation.stateLabel.dataset.state = "isolated";
    simulation.stateLabel.innerHTML = "<span></span> SIMULATED · HOST ISOLATED";
    setNodeStatus(simulation.portalNode, "Available", "available");
    setNodeStatus(simulation.paymentNode, "Host isolated", "contained");
    setNodeStatus(simulation.ledgerNode, "Available", "available");
    simulation.portalApiLink.dataset.health = "contained";
    simulation.apiLedgerLink.dataset.health = "contained";
    simulation.impact.textContent = "Checkout interrupted";
    simulation.impactDetail.textContent = "Portal stays up · payment host isolated";
    simulation.credentialStatus.textContent = "Active · simulated";
    simulation.credentialStatus.dataset.state = "";
    simulation.credentialRequests.textContent = "Host offline · requests stop";
    simulation.outcomeIcon.textContent = "!";
    simulation.outcomeKicker.textContent = "SIMULATED RESPONSE · A";
    simulation.outcomeTitle.textContent = "Payment API host isolated";
    simulation.outcomeDescription.textContent = "The synthetic billing identity is contained by taking the whole mock host offline. This stops further requests but does not restore checkout; the marketplace remains browseable.";
    appendLabEvent({
      time: "09:22:19.000",
      kind: "system",
      message: "Payment API host isolated in the local model.",
      reference: "CONTROL A"
    });
  } else {
    simulation.stateLabel.dataset.state = "revoked";
    simulation.stateLabel.innerHTML = "<span></span> SIMULATED · CREDENTIAL REVOKED";
    setNodeStatus(simulation.portalNode, "Available", "available");
    setNodeStatus(simulation.paymentNode, "Reachable", "available");
    setNodeStatus(simulation.ledgerNode, "Available", "available");
    simulation.portalApiLink.dataset.health = "available";
    simulation.apiLedgerLink.dataset.health = "available";
    simulation.impact.textContent = "Checkout reachable";
    simulation.impactDetail.textContent = "Mock Payment API recovered · malicious identity blocked";
    simulation.credentialStatus.textContent = "Revoked · simulated";
    simulation.credentialStatus.dataset.state = "revoked";
    simulation.credentialRequests.textContent = "Blocked · this identity only";
    simulation.outcomeIcon.textContent = "✓";
    simulation.outcomeKicker.textContent = "SIMULATED RESPONSE · B";
    simulation.outcomeTitle.textContent = "Billing credential revoked";
    simulation.outcomeDescription.textContent = "Bastion blocks the synthetic billing identity, clears the mock service degradation, and restores the Payment API. Follow-up malicious requests are denied while marketplace browsing and checkout are available again.";
    appendLabEvent({
      time: "09:22:19.000",
      kind: "system",
      message: "Synthetic billing credential revoked in the local model.",
      reference: "CONTROL B"
    });
  }
  updateMarketplaceAvailability();
  if (attackHasRun) runProtectedRequest();
}

document.querySelector(".response-cards").addEventListener("click", event => {
  const button = event.target.closest("[data-response]");
  if (button && !attackIsRunning) applySimulation(button.dataset.response);
});

document.querySelector("#run-simulated-attack").addEventListener("click", runSimulatedAttack);

simulation.resetButton.addEventListener("click", resetSimulation);

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value;
  renderProducts();
});

searchInput.addEventListener("keydown", event => {
  if (event.key === "Escape" && searchInput.value) {
    searchInput.value = "";
    searchTerm = "";
    renderProducts();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

document.querySelector("#clear-filters").addEventListener("click", () => {
  activeCategory = "All things";
  searchTerm = "";
  searchInput.value = "";
  renderCategories();
  renderProducts();
  searchInput.focus();
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find(item => item.id === button.dataset.add);
  cart.set(product.id, (cart.get(product.id) || 0) + 1);
  renderCart();
  announceCart(`${product.name} added to your bag. ${cartSize()} ${cartSize() === 1 ? "item" : "items"} in your bag.`);
});

document.querySelector("#open-cart").addEventListener("click", () => {
  renderCart();
  cartDialog.showModal();
});

cartDialog.addEventListener("click", event => {
  const closeButton = event.target.closest('[data-close-dialog="cart-dialog"]');
  if (closeButton) {
    cartDialog.close();
    return;
  }
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");
  const remove = event.target.closest("[data-remove]");
  if (increase) changeQuantity(increase.dataset.increase, 1);
  if (decrease) changeQuantity(decrease.dataset.decrease, -1);
  if (remove) {
    cart.delete(remove.dataset.remove);
    renderCart();
    const product = products.find(item => item.id === remove.dataset.remove);
    announceCart(`${product.name} removed from your bag.`);
  }
  if (event.target.closest("#checkout-button") && cart.size > 0 && simulatedResponse !== "isolate" && simulatedResponse !== "attack") {
    cartDialog.close();
    document.querySelector("#order-number").textContent = `DEMO ORDER DW-${String(1000 + Math.floor(Math.random() * 9000))}`;
    cart.clear();
    renderCart();
    checkoutDialog.showModal();
    announceCart("Demo order confirmed. No payment was taken.");
  }
});

document.addEventListener("click", event => {
  const button = event.target.closest('[data-close-dialog="checkout-dialog"]');
  if (button) checkoutDialog.close();
});

document.querySelectorAll(".dialog-top .icon-button, .checkout-close").forEach(button => {
  button.addEventListener("click", () => {
    const dialog = button.closest("dialog");
    if (dialog?.open) dialog.close();
  });
});

renderCategories();
renderProducts();
renderCart();
resetSimulation();

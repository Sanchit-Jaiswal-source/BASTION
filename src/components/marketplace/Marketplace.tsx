import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { categories, formatPrice, productImage, products, type Product } from "../../data/marketplace";

type StoreView = "home" | "cart" | "delivery" | "payment" | "review" | "success";
type CartLine = { id: string; quantity: number };
type Delivery = {
  name: string;
  phone: string;
  pin: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  note: string;
};
type OrderConfirmation = {
  id: string;
  lines: CartLine[];
  total: number;
  delivery: Delivery;
  payment: string;
};

const EMPTY_DELIVERY: Delivery = { name: "", phone: "", pin: "", address: "", landmark: "", city: "", state: "", note: "" };
const paymentLabels: Record<string, string> = {
  cod: "Cash on Delivery",
  card: "Credit / Debit Card · Demo",
  upi: "UPI · Demo",
};

export function Marketplace({ active, checkoutUnavailable, onOpenShop }: { active: boolean; checkoutUnavailable: boolean; onOpenShop: () => void }) {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState<StoreView>("home");
  const [category, setCategory] = useState("All products");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [detail, setDetail] = useState<Product | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(1);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [payment, setPayment] = useState("cod");
  const [delivery, setDelivery] = useState<Delivery>(EMPTY_DELIVERY);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const detailTitle = useRef<HTMLHeadingElement>(null);
  const detailPanel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const orderNumber = useRef(0);
  const toastTimer = useRef<number | undefined>(undefined);

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cart.reduce((total, line) => {
    const item = products.find((product) => product.id === line.id);
    return total + (item?.price ?? 0) * line.quantity;
  }, 0);
  const shipping = subtotal === 0 || subtotal >= 1499 ? 0 : 49;
  const total = subtotal + shipping;
  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All products" || product.category === category;
      const searchable = `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
    if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [category, query, sort]);

  useEffect(() => {
    if (!active && detail) setDetail(null);
  }, [active, detail]);

  useEffect(() => {
    if (checkoutUnavailable && ["delivery", "payment", "review"].includes(view)) {
      setView("cart");
    }
  }, [checkoutUnavailable, view]);

  useEffect(() => {
    if (!active || !detail) return;
    detailTitle.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDetail();
      if (event.key === "ArrowRight") setGalleryIndex((index) => (index % 3) + 1);
      if (event.key === "ArrowLeft") setGalleryIndex((index) => ((index + 1) % 3) + 1);
      if (event.key === "Tab") {
        const focusable = detailPanel.current?.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === detailTitle.current)) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === detailTitle.current)) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active, detail]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      if (!active) onOpenShop();
      if (!entered) setEntered(true);
      setView("home");
      window.setTimeout(() => document.getElementById("product-search")?.focus(), 0);
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, [active, entered, onOpenShop]);

  const notify = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2300);
  };

  const goTo = (next: StoreView) => {
    if (checkoutUnavailable && ["delivery", "payment", "review"].includes(next)) {
      setView("cart");
      setMenuOpen(false);
      return;
    }
    setView(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const addToCart = (id: string, quantity = 1) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    setCart((current) => {
      const existing = current.find((line) => line.id === id);
      return existing
        ? current.map((line) => line.id === id ? { ...line, quantity: line.quantity + quantity } : line)
        : [...current, { id, quantity }];
    });
    notify(`${product.name} added to your bag ✳`);
  };

  const openDetail = (product: Product, trigger: HTMLButtonElement) => {
    returnFocus.current = trigger;
    setDetail(product);
    setGalleryIndex(1);
    setDetailQuantity(1);
  };

  const closeDetail = () => {
    setDetail(null);
    window.setTimeout(() => returnFocus.current?.focus(), 0);
  };

  const chooseCategory = (name: string) => {
    setCategory(name);
    setQuery("");
    setView("home");
    setMenuOpen(false);
    window.setTimeout(() => document.getElementById("nova-products")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    }), 0);
  };

  const cartChange = (id: string, amount: number) => {
    setCart((current) => current
      .map((line) => line.id === id ? { ...line, quantity: line.quantity + amount } : line)
      .filter((line) => line.quantity > 0));
  };

  const handleDelivery = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkoutUnavailable) {
      setView("cart");
      return;
    }
    const values = new FormData(event.currentTarget);
    const address: Delivery = {
      name: String(values.get("name") ?? "").trim(),
      phone: String(values.get("phone") ?? "").trim(),
      pin: String(values.get("pin") ?? "").trim(),
      address: String(values.get("address") ?? "").trim(),
      landmark: String(values.get("landmark") ?? "").trim(),
      city: String(values.get("city") ?? "").trim(),
      state: String(values.get("state") ?? "").trim(),
      note: String(values.get("note") ?? "").trim(),
    };
    setDelivery(address);
    goTo("payment");
  };

  const placeDemoOrder = () => {
    if (!cart.length || checkoutUnavailable) return;
    orderNumber.current += 1;
    setConfirmation({
      id: `NOVA-DEMO-${String(orderNumber.current).padStart(4, "0")}`,
      lines: cart.map((line) => ({ ...line })),
      total,
      delivery: { ...delivery },
      payment: paymentLabels[payment] ?? paymentLabels.cod!,
    });
    setCart([]);
    setDelivery(EMPTY_DELIVERY);
    setPayment("cod");
    goTo("success");
  };

  const renderSummary = (withProducts: boolean) => (
    <div className="summary-box">
      <h3>{withProducts ? "Your order" : "Order summary"}</h3>
      {withProducts && <div className="summary-products">{cart.map((line) => {
        const product = products.find((item) => item.id === line.id);
        if (!product) return null;
        return <div className="summary-product" key={line.id}>
          <img src={productImage(product)} alt="" />
          <span><b>{product.name}</b><small>Qty {line.quantity}</small></span>
          <strong>{formatPrice(product.price * line.quantity)}</strong>
        </div>;
      })}</div>}
      <div className="summary-line"><span>Subtotal · {cartCount} item{cartCount === 1 ? "" : "s"}</span><strong>{formatPrice(subtotal)}</strong></div>
      <div className="summary-line"><span>Delivery</span><strong>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong></div>
      <hr className="summary-divider" />
      <div className="summary-line total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
      <p className="summary-legal">Sample INR prices and illustrative shipping. No live offers, tax calculation, payment, or order is connected.</p>
    </div>
  );

  const productCard = (product: Product, index: number) => (
    <article className="product-card" key={product.id} style={{ animationDelay: `${Math.min(index * 45, 360)}ms` }}>
      <div className="product-image-wrap">
        <button className="product-image-trigger" onClick={(event) => openDetail(product, event.currentTarget)} aria-label={`View ${product.name}`}>
          <img src={productImage(product)} alt={product.name} loading="lazy" />
        </button>
        <span className="product-tag">{product.tag}</span>
        <button className={`wishlist-button ${wishlist.includes(product.id) ? "active" : ""}`} onClick={() => setWishlist((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} aria-label={`${wishlist.includes(product.id) ? "Remove from" : "Add to"} favourites`} aria-pressed={wishlist.includes(product.id)}>
          {wishlist.includes(product.id) ? "♥" : "♡"}
        </button>
        <button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to bag`}>＋ Add to bag</button>
      </div>
      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <div className="product-title-line">
          <button className="product-title" onClick={(event) => openDetail(product, event.currentTarget)}>{product.name}</button>
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
        <div className="product-meta"><span className="rating"><span>★</span> {product.rating.toFixed(1)} <small>(demo)</small></span><span className="product-category">{product.category}</span></div>
      </div>
    </article>
  );

  const renderHome = () => (
    <>
      {!entered ? <section id="nova-intro" className="intro" aria-labelledby="nova-intro-title">
        <div className="intro-scene" aria-hidden="true">
          <div className="scene-glow" /><div className="scene-horizon" /><div className="scene-grid" />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="scene-tile tile-left"><img src={productImage(products[0]!)} alt="" /><span>Audio, elevated.</span></div>
          <div className="scene-tile tile-right"><img src={productImage(products[8]!)} alt="" /><span>Everyday icons.</span></div>
          <div className="scene-tile tile-back"><img src={productImage(products[2]!)} alt="" /><span>Made to move.</span></div>
          <div className="scene-particles"><i /><i /><i /><i /><i /></div>
        </div>
        <div className="intro-copy">
          <div className="brand-lockup intro-brand"><NovaMark /><span>NOVA<span className="brand-light">MARKET</span></span></div>
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR WORLD, WELL FOUND</p>
          <h1 id="nova-intro-title">A little more<br /><em>wonderful.</em></h1>
          <p className="intro-lede">Thoughtful finds for every corner of your day. Explore a universe of good things, all in one place.</p>
          <button className="btn btn-primary btn-large" onClick={() => setEntered(true)}><span>Explore marketplace</span><span className="btn-arrow" aria-hidden="true">↗</span></button>
          <p className="intro-footnote">A front-end shopping demo · no real payments or orders</p>
        </div>
        <div className="intro-bottom"><span>CURATED FOR EVERY DAY</span><span>SCROLL LESS. FIND MORE. <b>✳</b></span><span>01 — 06</span></div>
      </section> : <>
        <div className="demo-strip"><span className="demo-pill">DEMO STORE</span> Sample catalog · Checkout does not process payment</div>
        <header className="site-header">
          <button className="brand-lockup header-brand" onClick={() => { setCategory("All products"); setQuery(""); goTo("home"); }} aria-label="NOVA Market home"><NovaMark small /><span>NOVA<span className="brand-light">MARKET</span></span></button>
          <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Marketplace categories">
            {categories.slice(0, 5).map((item) => <button key={item.name} data-category={item.name} className={`nav-link ${category === item.name && view === "home" ? "active" : ""}`} onClick={() => chooseCategory(item.name)}>{item.name === "All products" ? "Discover" : item.name}</button>)}
          </nav>
          <div className="header-actions">
            <button className="icon-button search-shortcut" onClick={() => { setView("home"); document.getElementById("product-search")?.focus(); }} aria-label="Focus product search">⌕</button>
            <button className="cart-button" onClick={() => goTo("cart")} aria-label={`Bag, ${cartCount} items`}><span className="bag-icon" aria-hidden="true">▱</span><span className="cart-label">Bag</span><span className="cart-count" aria-live="polite">{cartCount}</span></button>
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close categories" : "Open categories"} aria-expanded={menuOpen}>☰</button>
          </div>
        </header>
        <main id="main-content">
          <section className="store-hero page-enter">
            <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> THE NOVA EDIT · VOL. 01</p><h2>Good finds.<br /><em>Great feelings.</em></h2><p>From your everyday essentials to the things you didn't know you needed — this is your place to find them.</p><div className="hero-actions"><button className="btn btn-primary" onClick={() => document.getElementById("nova-products")?.scrollIntoView({ behavior: "smooth" })}>Shop the collection <span className="btn-arrow">↗</span></button><span className="hero-note"><span className="tiny-spark">✳</span> A world of little upgrades</span></div></div>
            <div className="hero-art" aria-label="Featured products"><div className="hero-blob" /><div className="hero-orbit orbit-a" /><div className="hero-orbit orbit-b" /><div className="floating-product product-float-a"><img src={productImage(products[0]!)} alt="Studio wireless headphones" /><span>Sound, reimagined</span></div><div className="floating-product product-float-b"><img src={productImage(products[2]!)} alt="Minimal smart watch" /></div><div className="hero-sticker">THE<br />GOOD<br />STUFF <b>✳</b></div></div>
          </section>
          <section className="search-section" aria-label="Search products"><div className="search-box"><span className="search-icon" aria-hidden="true">⌕</span><input id="product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, brands, little obsessions…" autoComplete="off" aria-label="Search products" /><kbd>⌘ K</kbd>{query && <button className="clear-search" onClick={() => { setQuery(""); document.getElementById("product-search")?.focus(); }} aria-label="Clear search">×</button>}</div><p className="search-hint">Try “headphones”, “coffee”, or “sneakers”</p></section>
          {!query && <section className="category-section"><div className="section-heading"><div><p className="eyebrow">FIND YOUR KIND OF THING</p><h2>Browse your <em>world.</em></h2></div><span className="section-side-note">A little something for every day <b>↘</b></span></div><div className="category-grid">{categories.map((item) => {
            const count = item.name === "All products" ? products.length : products.filter((product) => product.category === item.name).length;
            return <button key={item.name} className={`category-card ${category === item.name ? "selected" : ""}`} data-cat={item.name} onClick={() => chooseCategory(item.name)} aria-pressed={category === item.name}><span className="cat-orb" /><span className="cat-symbol">{item.symbol}</span><span className="cat-title">{item.name}<small className="cat-count">{count} thoughtful finds · {item.description}</small></span></button>;
          })}</div></section>}
          <section id="nova-products" className="product-section"><div className="section-heading product-heading"><div><p className="eyebrow">{query ? `${filteredProducts.length} MATCH${filteredProducts.length === 1 ? "" : "ES"} FOUND` : category === "All products" ? "THE NOVA COLLECTION" : `${category.toUpperCase()} · CURATED FINDS`}</p><h2>{query ? <>Search <em>results.</em></> : category === "All products" ? <>The good <em>stuff.</em></> : <>{category} <em>edit.</em></>}</h2></div><div className="sort-wrap"><label htmlFor="sort-products">Sort by</label><select id="sort-products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></div></div>
            <div className="active-filters">{category !== "All products" && <span className="filter-chip">{category}<button onClick={() => setCategory("All products")} aria-label="Clear category">×</button></span>}{query && <span className="filter-chip">“{query}”<button onClick={() => setQuery("")} aria-label="Clear search">×</button></span>}</div>
            {filteredProducts.length ? <div className="product-grid">{filteredProducts.map(productCard)}</div> : <div className="empty-state"><span className="empty-icon">⌕</span><h3>No matches just yet.</h3><p>Try another search or explore a different category.</p><button className="btn btn-outline" onClick={() => { setQuery(""); setCategory("All products"); }}>Clear filters</button></div>}
          </section>
          <section className="bottom-promo"><div className="promo-spark">✳</div><div><p className="eyebrow">THE NOVA PROMISE</p><h2>Little discoveries.<br /><em>Lovely everyday.</em></h2></div><p>Thoughtful picks across the things you love. This sample storefront is a local interactive demo — no live inventory or real checkout.</p><button className="btn btn-light" onClick={() => document.getElementById("product-search")?.focus()}>Keep exploring <span>↗</span></button></section>
        </main>
        <footer className="site-footer"><span className="brand-lockup footer-brand"><NovaMark small /><span>NOVA<span className="brand-light">MARKET</span></span></span><span>Good things, thoughtfully found. <b>✳</b></span><span>Sample storefront · Demo only</span></footer>
      </>}
    </>
  );

  return <div className="nova-experience">
    {checkoutUnavailable && view !== "success" && <div id="checkout-simulation-notice" className="checkout-simulation-alert" role="status" aria-live="polite">
      <strong>CHECKOUT ISOLATED IN THE LOCAL TWIN</strong>
      <span>Store browsing and your bag remain available. Demo checkout is disabled until the simulation is reset.</span>
    </div>}
    {view === "home" && renderHome()}
    {view === "cart" && <section className="view page-enter">
      <div className="view-title-row"><div><p className="eyebrow">YOUR LITTLE COLLECTION</p><h1>Your <em>bag.</em></h1><p className="muted">Good choices. Let’s make them yours.</p></div><button className="text-link" onClick={() => goTo("home")}>← Back to shopping</button></div>
      <div className="cart-layout">{!cart.length ? <div className="empty-cart"><span className="empty-icon">▱</span><h2>Your bag is taking a little breather.</h2><p>There’s nothing in here just yet. Go find something lovely.</p><button className="btn btn-primary" onClick={() => goTo("home")}>Explore the marketplace <span>↗</span></button></div> : <div className="cart-grid"><div><div className="cart-list">{cart.map((line) => {
        const product = products.find((item) => item.id === line.id);
        if (!product) return null;
        return <article className="cart-item" key={line.id}><img src={productImage(product)} alt={product.name} /><div><p className="product-brand">{product.brand}</p><h3>{product.name}</h3><p className="item-small">{product.category}</p><div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button onClick={() => cartChange(product.id, -1)} aria-label={`Decrease ${product.name} quantity`}>−</button><span>{line.quantity}</span><button onClick={() => cartChange(product.id, 1)} aria-label={`Increase ${product.name} quantity`}>＋</button></div><button className="remove-item" onClick={() => setCart((current) => current.filter((item) => item.id !== product.id))}>Remove</button></div><span className="item-price">{formatPrice(product.price * line.quantity)}</span></article>;
      })}</div><button className="text-link" onClick={() => goTo("home")} style={{ marginTop: 20 }}>← Keep browsing</button></div><aside>{renderSummary(false)}<button className="btn btn-primary btn-large full-width" style={{ marginTop: 15 }} onClick={() => { if (!cart.length || checkoutUnavailable) return; goTo("delivery"); }} disabled={checkoutUnavailable} aria-describedby={checkoutUnavailable ? "checkout-simulation-notice" : undefined}>Continue to delivery <span className="btn-arrow">→</span></button><p className="summary-legal">Demo checkout. No real order or payment will be made.</p></aside></div>}</div>
    </section>}
    {view === "delivery" && <section className="checkout-view page-enter">
      <div className="checkout-top"><button className="back-link" onClick={() => goTo("cart")}>← Back to bag</button><CheckoutSteps active={1} /></div>
      <div className="checkout-layout"><div className="checkout-main"><p className="eyebrow">FIRST THINGS FIRST</p><h1>Where should we <em>send it?</em></h1><p className="muted">Tell us where your parcel should land. This demo keeps your details in this page only.</p><form onSubmit={handleDelivery}><div className="form-grid">
        <label className="field full-field">Full name <span>*</span><input name="name" autoComplete="name" placeholder="Name of the recipient" minLength={2} required defaultValue={delivery.name} /></label>
        <label className="field">Phone number <span>*</span><div className="phone-input"><span>🇮🇳 +91</span><input name="phone" inputMode="numeric" autoComplete="tel-national" maxLength={10} pattern="[0-9]{10}" placeholder="10-digit mobile number" required defaultValue={delivery.phone} /></div></label>
        <label className="field">PIN code <span>*</span><input name="pin" inputMode="numeric" autoComplete="postal-code" maxLength={6} pattern="[1-9][0-9]{5}" placeholder="6-digit PIN code" required defaultValue={delivery.pin} /></label>
        <label className="field full-field">Flat, house no., building, street <span>*</span><input name="address" autoComplete="street-address" placeholder="House number and street name" minLength={5} required defaultValue={delivery.address} /></label>
        <label className="field">Landmark <small className="optional">Optional</small><input name="landmark" placeholder="Near a park, shop…" defaultValue={delivery.landmark} /></label>
        <label className="field">City <span>*</span><input name="city" autoComplete="address-level2" placeholder="City" minLength={2} required defaultValue={delivery.city} /></label>
        <label className="field">State <span>*</span><input name="state" autoComplete="address-level1" placeholder="State" minLength={2} required defaultValue={delivery.state} /></label>
        <label className="field full-field">Delivery note <small className="optional">Optional</small><textarea name="note" rows={3} placeholder="Anything the delivery person should know?" defaultValue={delivery.note} /></label>
      </div><button className="btn btn-primary btn-large full-width" type="submit">Continue to payment <span className="btn-arrow">→</span></button></form><p className="privacy-note">♧ Your details stay in this demo session and are not sent to a server.</p></div><aside className="order-summary">{renderSummary(true)}</aside></div>
    </section>}
    {view === "payment" && <section className="checkout-view page-enter">
      <div className="checkout-top"><button className="back-link" onClick={() => goTo("delivery")}>← Back to delivery</button><CheckoutSteps active={2} /></div>
      <div className="checkout-layout"><div className="checkout-main"><p className="eyebrow">YOUR WAY TO PAY</p><h1>Make it <em>easy.</em></h1><p className="muted">Choose a demo payment option. No money will be taken.</p><form onSubmit={(event) => { event.preventDefault(); goTo("review"); }}>
        <div className="payment-options" role="radiogroup" aria-label="Demo payment method">
          <PaymentOption value="cod" current={payment} onChange={setPayment} symbol="₹" label="Cash on Delivery" detail="Pay when your parcel arrives" />
          <PaymentOption value="card" current={payment} onChange={setPayment} symbol="▤" label="Credit / Debit Card" detail="Preview only — no card details needed" />
          <PaymentOption value="upi" current={payment} onChange={setPayment} symbol="⌁" label="UPI" detail="Demo selection only — no UPI ID needed" />
        </div>
        <div className="method-note">{payment === "cod" ? "You’ll pay in person on delivery. No payment will be collected in this demo." : payment === "card" ? "Card selected for demonstration only. Do not enter card details — no payment form or processor is connected." : "UPI selected for demonstration only. No UPI ID or payment credentials are needed."}</div>
        <button className="btn btn-primary btn-large full-width" type="submit">Review your order <span className="btn-arrow">→</span></button>
      </form><p className="privacy-note">♧ Demo checkout only. No payment processor is connected.</p></div><aside className="order-summary">{renderSummary(true)}</aside></div>
    </section>}
    {view === "review" && <section className="checkout-view page-enter">
      <div className="checkout-top"><button className="back-link" onClick={() => goTo("payment")}>← Back to payment</button><CheckoutSteps active={3} /></div>
      <div className="checkout-layout"><div className="checkout-main"><p className="eyebrow">ONE LAST LOOK</p><h1>Ready when <em>you are.</em></h1><p className="muted">Double-check your delivery details and chosen payment method.</p>
        <div className="review-card"><h3>Delivery address <button className="text-link" onClick={() => goTo("delivery")}>Edit</button></h3><p><b>{delivery.name}</b></p><p>{delivery.address}{delivery.landmark ? `, ${delivery.landmark}` : ""}</p><p>{delivery.city}, {delivery.state} · {delivery.pin}</p><p>+91 {delivery.phone}</p>{delivery.note && <p>Note: {delivery.note}</p>}<p className="review-pay">Payment: {paymentLabels[payment]} <button className="text-link" onClick={() => goTo("payment")}>Change</button></p></div>
        <div className="review-items">{cart.map((line) => {
          const product = products.find((item) => item.id === line.id);
          if (!product) return null;
          return <div className="review-item" key={line.id}><img src={productImage(product)} alt="" /><span><b>{product.name}</b><small>{line.quantity} × {formatPrice(product.price)}</small></span><strong>{formatPrice(product.price * line.quantity)}</strong></div>;
        })}</div>
        <button className="btn btn-primary btn-large full-width" onClick={placeDemoOrder} disabled={checkoutUnavailable} aria-describedby={checkoutUnavailable ? "checkout-simulation-notice" : undefined}>Place demo order <span className="btn-arrow">→</span></button><p className="privacy-note">This creates a demo confirmation only. No real order or payment is placed.</p>
      </div><aside className="order-summary">{renderSummary(true)}</aside></div>
    </section>}
    {view === "success" && <section className="success-view page-enter">
      <div className="success-sky"><div className="success-orbit" /><div className="success-mark">✓</div></div><p className="eyebrow">THAT’S A WRAP</p><h1>Well, this is <em>exciting.</em></h1><p className="success-intro">Your demo order is in the books. Consider this a preview of the NOVA checkout.</p>
      {confirmation && <div className="confirmation-card"><div className="confirm-head"><b>NOVA<span style={{ opacity: 0.5 }}>MARKET</span></b><span className="confirm-tag">DEMO CONFIRMED</span></div><p className="confirm-order-id">ORDER REFERENCE</p><p className="confirm-total">{formatPrice(confirmation.total)}</p><p className="confirm-reference">{confirmation.id}</p><div className="confirm-detail-grid">
        <div><small>Delivering to</small><b>{confirmation.delivery.name}<br />{confirmation.delivery.address}<br />{confirmation.delivery.city}, {confirmation.delivery.state} {confirmation.delivery.pin}</b></div>
        <div><small>Contact</small><b>+91 {confirmation.delivery.phone}</b><small className="confirm-subheading">Payment method</small><b>{confirmation.payment}</b></div>
        <div><small>Items</small><b>{confirmation.lines.reduce((count, item) => count + item.quantity, 0)} product{confirmation.lines.reduce((count, item) => count + item.quantity, 0) === 1 ? "" : "s"}</b></div>
        <div><small>Delivery</small><b>Illustrative only</b></div>
      </div></div>}
      <p className="muted tiny-disclaimer">Sample confirmation only · no real order has been created · no payment was taken</p><button className="btn btn-primary btn-large" onClick={() => { setCategory("All products"); setQuery(""); setView("home"); }}>Back to the good stuff <span className="btn-arrow">↗</span></button>
    </section>}
    {detail && <div className="modal" role="dialog" aria-modal="true" aria-labelledby="product-detail-title" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDetail(); }}>
      <button className="modal-backdrop" onClick={closeDetail} aria-label="Close product details" />
      <div className="detail-panel" ref={detailPanel}><button className="modal-close" onClick={closeDetail} aria-label="Close product details">×</button>
        <div className="detail-layout"><div className="detail-gallery"><div className="gallery-main"><img src={productImage(detail, galleryIndex)} alt={`${detail.name} photo ${galleryIndex} of 3`} /><span className="gallery-index">{galleryIndex} / 3</span></div><div className="gallery-thumbs">{[1, 2, 3].map((image) => <button key={image} className={`gallery-thumb ${galleryIndex === image ? "active" : ""}`} onClick={() => setGalleryIndex(image)} aria-label={`Show product photo ${image}`} aria-pressed={galleryIndex === image}><img src={productImage(detail, image)} alt="" /></button>)}</div></div>
          <div className="detail-info"><p className="product-brand">{detail.brand} · {detail.category}</p><h2 id="product-detail-title" ref={detailTitle} tabIndex={-1}>{detail.name}</h2><p className="detail-price">{formatPrice(detail.price)} <del>{formatPrice(detail.oldPrice)}</del></p><p className="detail-rating"><span>★</span> {detail.rating.toFixed(1)} <span className="muted">· illustrative customer rating</span></p><p className="detail-desc">{detail.description}</p><div className="detail-specs">{detail.specs.map((spec) => <span key={spec}>{spec}</span>)}</div>
            <div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button onClick={() => setDetailQuantity((quantity) => Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><span>{detailQuantity}</span><button onClick={() => setDetailQuantity((quantity) => Math.min(10, quantity + 1))} aria-label="Increase quantity">＋</button></div></div>
            <div className="detail-actions"><button className="btn btn-primary" onClick={() => { addToCart(detail.id, detailQuantity); closeDetail(); }}>＋ Add to bag</button><button className="btn btn-outline-dark" onClick={() => { addToCart(detail.id, detailQuantity); closeDetail(); goTo("cart"); }} disabled={checkoutUnavailable} aria-describedby={checkoutUnavailable ? "checkout-simulation-notice" : undefined}>Buy now ↗</button></div><p className="privacy-note">Sample product information and imagery · demo catalog only</p>
          </div>
        </div>
      </div>
    </div>}
    <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
  </div>;
}

function CheckoutSteps({ active }: { active: number }) {
  const steps = ["Delivery", "Payment", "Review"];
  return <div className="checkout-steps" aria-label={`Checkout step ${active} of 3`}>{steps.map((label, index) => <span className="checkout-step-wrap" key={label}><span className={`checkout-step ${index + 1 === active ? "active" : index + 1 < active ? "done" : ""}`}><span>0{index + 1}</span> <b>{label}</b></span>{index < steps.length - 1 && <i aria-hidden="true" />}</span>)}</div>;
}

function NovaMark({ small = false }: { small?: boolean }) {
  return <span className={`brand-mark ${small ? "small-mark" : ""}`} aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M20 3 36 12v16L20 37 4 28V12Z" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="m12 21 5 5 11-13" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
}

function PaymentOption({ value, current, onChange, symbol, label, detail }: {
  value: string;
  current: string;
  onChange: (value: string) => void;
  symbol: string;
  label: string;
  detail: string;
}) {
  return <label className="payment-option"><input type="radio" name="payment" value={value} checked={current === value} onChange={() => onChange(value)} /><span className="payment-symbol">{symbol}</span><span className="payment-copy"><b>{label}</b><small>{detail}</small></span><span className="payment-check" /></label>;
}

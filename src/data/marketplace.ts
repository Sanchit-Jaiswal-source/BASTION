export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  tag: string;
  description: string;
  specs: string[];
}

export interface ProductCategory {
  name: string;
  symbol: string;
  description: string;
}

export const products: Product[] = [
  { id: "headphones", name: "Studio Wireless Headphones", brand: "SONORA", category: "Electronics", price: 5499, oldPrice: 6999, rating: 4.8, tag: "BESTSELLER", description: "Rich, balanced sound and a soft over-ear fit that makes the everyday feel a little more cinematic. A clean silhouette, easy controls, and all-day listening comfort.", specs: ["Wireless audio", "Soft over-ear fit", "USB-C charging"] },
  { id: "speaker", name: "Portable Bluetooth Speaker", brand: "SONORA", category: "Electronics", price: 2899, oldPrice: 3499, rating: 4.6, tag: "NEW ARRIVAL", description: "A compact companion with room-filling sound, tactile controls, and a travel-friendly shape for slow mornings and late-night playlists.", specs: ["Portable design", "Bluetooth audio", "Rechargeable"] },
  { id: "smartwatch", name: "Minimal Smart Watch", brand: "TEMPO", category: "Electronics", price: 3799, oldPrice: 4499, rating: 4.5, tag: "NOVA PICK", description: "A minimalist watch face, a comfortable everyday strap, and useful activity snapshots in one understated accessory.", specs: ["Minimal dial", "Comfort strap", "Daily activity"] },
  { id: "earbuds", name: "Everyday Wireless Earbuds", brand: "SONORA", category: "Electronics", price: 1799, oldPrice: 2299, rating: 4.4, tag: "GOOD FIND", description: "Small, pocket-ready earbuds with an easy fit for calls, commutes, workouts, and everything between.", specs: ["Compact case", "Wireless listening", "Pocket-sized"] },
  { id: "coffee", name: "House Blend Coffee Beans", brand: "ROAST & RISE", category: "Groceries", price: 549, oldPrice: 649, rating: 4.9, tag: "STAFF FAVOURITE", description: "A cosy, balanced roast with notes that make the first cup of the day feel like a ritual worth keeping.", specs: ["Whole bean", "Medium roast", "250 g pouch"] },
  { id: "olive-oil", name: "Golden Grove Olive Oil", brand: "GOLDEN GROVE", category: "Groceries", price: 699, oldPrice: 799, rating: 4.7, tag: "PANTRY ESSENTIAL", description: "A versatile kitchen staple for bright dressings, warm vegetables, and everyday cooking. Displayed here as a sample product.", specs: ["500 ml bottle", "Kitchen staple", "Demo catalog item"] },
  { id: "citrus", name: "Citrus Market Box", brand: "FRESH FINDS", category: "Groceries", price: 399, oldPrice: 449, rating: 4.6, tag: "FRESH PICK", description: "A colourful mix inspired by market-day citrus. This is a sample catalog entry; freshness and quantities are illustrative.", specs: ["Seasonal mix", "Market-inspired", "Demo listing"] },
  { id: "granola", name: "Maple Morning Granola", brand: "SUNDAY TABLE", category: "Groceries", price: 329, oldPrice: 379, rating: 4.5, tag: "MORNING MOOD", description: "Crunchy clusters, a mellow maple note, and a breakfast shelf staple for easy mornings.", specs: ["300 g pouch", "Breakfast pantry", "Sample item"] },
  { id: "sneakers", name: "Everyday Court Sneakers", brand: "FORM / FIELD", category: "Fashion", price: 3299, oldPrice: 3999, rating: 4.7, tag: "NOVA PICK", description: "An easy-to-style everyday sneaker with a clean shape designed to go from coffee runs to weekend plans.", specs: ["Everyday silhouette", "Lace-up fit", "Versatile styling"] },
  { id: "tote", name: "Canvas Everyday Tote", brand: "FORM / FIELD", category: "Fashion", price: 899, oldPrice: 1099, rating: 4.6, tag: "EASY CARRY", description: "A roomy, relaxed tote for errands, books, market finds, and all the things a day tends to collect.", specs: ["Canvas-inspired look", "Everyday carry", "Roomy shape"] },
  { id: "backpack", name: "Weekender Daypack", brand: "FORM / FIELD", category: "Fashion", price: 2199, oldPrice: 2699, rating: 4.5, tag: "TRAVEL READY", description: "A streamlined backpack with a clean profile for daily commutes and little weekend escapes.", specs: ["Multi-pocket look", "Daily carry", "Travel-friendly"] },
  { id: "sunglasses", name: "Sculpted Everyday Sunglasses", brand: "FORM / FIELD", category: "Fashion", price: 1299, oldPrice: 1599, rating: 4.3, tag: "SUNNY DAYS", description: "A slightly sculpted frame with a modern, low-key profile for sunny walks and long lunches outdoors.", specs: ["Sculpted frame", "Everyday accessory", "Sample style"] },
  { id: "lamp", name: "Soft Glow Table Lamp", brand: "STILL STUDIO", category: "Home & Living", price: 2499, oldPrice: 2999, rating: 4.8, tag: "ROOM REFRESH", description: "Warm, layered lighting makes an evening corner feel like a destination. A sculptural lamp for bedside tables and reading nooks.", specs: ["Warm ambient mood", "Sculptural profile", "Home accent"] },
  { id: "candle", name: "Cedar & Linen Candle", brand: "STILL STUDIO", category: "Home & Living", price: 799, oldPrice: 999, rating: 4.6, tag: "SLOW EVENINGS", description: "A calm, cosy candle concept for desk rituals, wind-down hours, and the little pause between busy days.", specs: ["Cedar-inspired scent", "Linen notes", "Home fragrance"] },
  { id: "vase", name: "Organic Shape Ceramic Vase", brand: "STILL STUDIO", category: "Home & Living", price: 1199, oldPrice: 1499, rating: 4.5, tag: "DESIGN DETAIL", description: "A gentle, sculptural silhouette that looks just as good holding a stem as it does on its own.", specs: ["Organic silhouette", "Shelf accent", "Neutral finish"] },
  { id: "throw", name: "Cloudsoft Knit Throw", brand: "STILL STUDIO", category: "Home & Living", price: 1899, oldPrice: 2299, rating: 4.7, tag: "COSY CORNER", description: "A soft-texture throw for sofas, reading chairs, and slow Sunday afternoons.", specs: ["Soft knit texture", "Layering piece", "Living room accent"] },
  { id: "serum", name: "Dew Drop Face Serum", brand: "MORNING DEW", category: "Beauty", price: 999, oldPrice: 1299, rating: 4.6, tag: "GLOW ROUTINE", description: "A skincare-shelf favourite concept with a lightweight, fresh-feeling routine in mind. Product claims are intentionally illustrative.", specs: ["Daily routine", "Glass bottle look", "Sample listing"] },
  { id: "water-bottle", name: "Ripple Steel Water Bottle", brand: "TEMPO", category: "Home & Living", price: 699, oldPrice: 899, rating: 4.4, tag: "DAILY SIDEKICK", description: "A simple, reusable bottle shape for your desk, gym bag, or daily commute.", specs: ["Reusable bottle", "Everyday hydration", "Minimal finish"] },
];

export const categories: ProductCategory[] = [
  { name: "All products", symbol: "✳", description: "A little of everything" },
  { name: "Electronics", symbol: "⌁", description: "Better everyday tech" },
  { name: "Groceries", symbol: "◒", description: "Good things for the pantry" },
  { name: "Fashion", symbol: "◈", description: "Wear your kind of thing" },
  { name: "Home & Living", symbol: "⌂", description: "Make room for cosy" },
  { name: "Beauty", symbol: "✺", description: "Little self-care rituals" },
];

export function productImage(product: Product, index = 1): string {
  return `${import.meta.env.BASE_URL}assets/products/${product.id}-${index}.jpg`;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

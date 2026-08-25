import type { Product } from "./types";

/**
 * Local catalogue used to seed Supabase and as a fallback when
 * Supabase environment variables are not configured.
 */
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Bubblegum Heart Shades",
    slug: "bubblegum-heart-shades",
    description:
      "Heart-shaped frames in glossy bubblegum pink with gradient rose lenses. UV400 protection wrapped in pure fun — made for first crushes and last-day-of-school selfies.",
    price: 39,
    category: "shades",
    age_group: "teens",
    color_from: "#f9a8d4",
    color_to: "#e879f9",
    featured: true,
  },
  {
    id: "2",
    name: "Daydream Cat-Eye",
    slug: "daydream-cat-eye",
    description:
      "A soft cat-eye in translucent lilac acetate with mirrored lavender lenses. Light as a daydream, bold as a first step.",
    price: 45,
    category: "shades",
    age_group: "teens",
    color_from: "#c4b5fd",
    color_to: "#f0abfc",
    featured: false,
  },
  {
    id: "3",
    name: "Skyline Aviator",
    slug: "skyline-aviator",
    description:
      "Slim gold-tone aviators with amber gradient lenses. For boardrooms, rooftops and everywhere the future is being decided.",
    price: 89,
    category: "shades",
    age_group: "twenties-thirties",
    color_from: "#fcd34d",
    color_to: "#fb7185",
    featured: true,
  },
  {
    id: "4",
    name: "Muse Oversized Square",
    slug: "muse-oversized-square",
    description:
      "Oversized square frames in warm tortoise with smoky brown lenses. Equal parts armor and allure for the woman on her way up.",
    price: 95,
    category: "shades",
    age_group: "twenties-thirties",
    color_from: "#fdba74",
    color_to: "#f43f5e",
    featured: false,
  },
  {
    id: "5",
    name: "Riviera Round",
    slug: "riviera-round",
    description:
      "Perfectly round frames in champagne metal with rose-tinted lenses. A quiet nod to the classics, worn by the women who redefine them.",
    price: 110,
    category: "shades",
    age_group: "forties-fifties",
    color_from: "#fda4af",
    color_to: "#fbbf24",
    featured: true,
  },
  {
    id: "6",
    name: "Signature Butterfly",
    slug: "signature-butterfly",
    description:
      "Sweeping butterfly frames in deep burgundy acetate with polarized bronze lenses. Commanding, graceful, unmistakably her.",
    price: 120,
    category: "shades",
    age_group: "forties-fifties",
    color_from: "#f87171",
    color_to: "#fcd34d",
    featured: false,
  },
  {
    id: "7",
    name: "Grande Dame Oval",
    slug: "grande-dame-oval",
    description:
      "Elegant oval frames in pearl-white acetate with soft violet lenses. Lightweight comfort with a presence that needs no introduction.",
    price: 105,
    category: "shades",
    age_group: "sixty-plus",
    color_from: "#ddd6fe",
    color_to: "#fda4af",
    featured: true,
  },
  {
    id: "8",
    name: "Legacy Square",
    slug: "legacy-square",
    description:
      "Gently squared frames in warm mauve with anti-glare amethyst lenses. Designed with extra-light hinges for all-day ease and timeless poise.",
    price: 99,
    category: "shades",
    age_group: "sixty-plus",
    color_from: "#c084fc",
    color_to: "#f9a8d4",
    featured: false,
  },
  {
    id: "9",
    name: "Petal Drop Earrings",
    slug: "petal-drop-earrings",
    description:
      "Hand-finished rose-gold drops shaped like falling petals. The finishing touch to any shade of you.",
    price: 35,
    category: "jewelry",
    age_group: null,
    color_from: "#fecdd3",
    color_to: "#fda4af",
    featured: false,
  },
  {
    id: "10",
    name: "Silk Blush Scarf",
    slug: "silk-blush-scarf",
    description:
      "100% mulberry silk in a watercolor blush print. Wear it in your hair, on your neck, or tied to your favorite bag.",
    price: 55,
    category: "scarves",
    age_group: null,
    color_from: "#fbcfe8",
    color_to: "#fef3c7",
    featured: false,
  },
  {
    id: "11",
    name: "Mini Croissant Bag",
    slug: "mini-croissant-bag",
    description:
      "A soft crescent shoulder bag in buttery vegan leather. Fits your shades, your phone and your whole mood.",
    price: 79,
    category: "bags",
    age_group: null,
    color_from: "#fde68a",
    color_to: "#fdba74",
    featured: false,
  },
  {
    id: "12",
    name: "Golden Hour Chain",
    slug: "golden-hour-chain",
    description:
      "A delicate layered chain in 18k gold plating that catches the light like the last hour of the day.",
    price: 49,
    category: "jewelry",
    age_group: null,
    color_from: "#fcd34d",
    color_to: "#fca5a5",
    featured: false,
  },
];

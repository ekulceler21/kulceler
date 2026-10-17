import type { Product } from "@/types/product";
import { asset } from "@/lib/asset";

const finishes = (sku: string, base: number): Product["variants"] => [
  {
    id: `${sku}-2-cilali`,
    label: "2 cm · Cilalı",
    sku: `${sku}-2C`,
    price: base,
    inventory: "in_stock",
    attributes: { kalinlik: "2 cm", yuzey: "Cilalı" },
  },
  {
    id: `${sku}-3-cilali`,
    label: "3 cm · Cilalı",
    sku: `${sku}-3C`,
    price: Math.round(base * 1.18),
    inventory: "in_stock",
    attributes: { kalinlik: "3 cm", yuzey: "Cilalı" },
  },
  {
    id: `${sku}-2-honlu`,
    label: "2 cm · Honlu",
    sku: `${sku}-2H`,
    price: Math.round(base * 0.96),
    inventory: "made_to_order",
    attributes: { kalinlik: "2 cm", yuzey: "Honlu" },
  },
];

export const CATEGORIES = [
  "Mermer",
  "Traverten",
  "Granit",
  "Oniks",
  "Mozaik",
] as const;

export const products: Product[] = [
  {
    id: "p-nero",
    slug: "nero-obsidian",
    name: "Nero Obsidian",
    description:
      "Derin siyah zemin, ince gümüş damar. Tezgâh, duvar kaplama ve özel hacimler için.",
    category: "Mermer",
    images: ["/products/nero-obsidian.svg", "/products/noir-bookmatch.svg"],
    price: 4200,
    sku: "KL-M-001",
    variants: finishes("KL-M-001", 4200),
    inventory: "in_stock",
    attributes: { koken: "Seçilmiş levha", kullanim: "İç mekân", bakim: "Nötr temizleyici" },
    published: true,
    featured: true,
    isDemo: true,
    relatedIds: ["p-calacatta", "p-silver", "p-bookmatch"],
  },
  {
    id: "p-calacatta",
    slug: "calacatta-night",
    name: "Calacatta Night",
    description:
      "Koyu zemin üzerinde dramatik damar. Ada tezgâhı ve feature duvarlar için.",
    category: "Mermer",
    images: ["/products/calacatta-night.svg", "/products/ivory-line.svg"],
    price: 6800,
    sku: "KL-M-002",
    variants: finishes("KL-M-002", 6800),
    inventory: "in_stock",
    attributes: { koken: "Seçilmiş levha", kullanim: "İç mekân", bakim: "Mermer bakımı" },
    published: true,
    featured: true,
    isDemo: true,
    relatedIds: ["p-nero", "p-ivory", "p-onyx"],
  },
  {
    id: "p-silver",
    slug: "silver-vein",
    name: "Silver Vein",
    description:
      "Grafit zemin, keskin gümüş hatlar. Çağdaş mimari yüzeyler için.",
    category: "Mermer",
    images: ["/products/silver-vein.svg", "/products/nero-obsidian.svg"],
    price: 5100,
    sku: "KL-M-003",
    variants: finishes("KL-M-003", 5100),
    inventory: "in_stock",
    attributes: { koken: "Seçilmiş levha", kullanim: "İç / yarı açık", bakim: "Nötr temizleyici" },
    published: true,
    featured: true,
    isDemo: true,
    relatedIds: ["p-nero", "p-granite", "p-honed"],
  },
  {
    id: "p-ivory",
    slug: "ivory-line",
    name: "Ivory Line",
    description:
      "Sakin damar, sıcak gri-fildişi geçiş. Geniş zemin ve duvar uygulamaları.",
    category: "Mermer",
    images: ["/products/ivory-line.svg", "/products/calacatta-night.svg"],
    price: 3900,
    sku: "KL-M-004",
    variants: finishes("KL-M-004", 3900),
    inventory: "in_stock",
    attributes: { koken: "Seçilmiş levha", kullanim: "İç mekân", bakim: "Mermer bakımı" },
    published: true,
    isDemo: true,
    relatedIds: ["p-calacatta", "p-trav"],
  },
  {
    id: "p-bookmatch",
    slug: "noir-bookmatch",
    name: "Noir Bookmatch",
    description:
      "Ayna kesim levha çifti. Feature duvar ve özel hacimler için rezerve.",
    category: "Mermer",
    images: ["/products/noir-bookmatch.svg", "/products/nero-obsidian.svg"],
    price: 9200,
    sku: "KL-M-005",
    variants: [
      {
        id: "KL-M-005-pair",
        label: "Çift levha · Cilalı",
        sku: "KL-M-005-P",
        price: 9200,
        inventory: "made_to_order",
        attributes: { kalinlik: "2 cm", yuzey: "Cilalı" },
      },
      {
        id: "KL-M-005-pair-3",
        label: "Çift levha · 3 cm",
        sku: "KL-M-005-P3",
        price: 10800,
        inventory: "made_to_order",
        attributes: { kalinlik: "3 cm", yuzey: "Cilalı" },
      },
    ],
    inventory: "made_to_order",
    attributes: { koken: "Eşleştirilmiş levha", kullanim: "Feature duvar", bakim: "Nötr temizleyici" },
    published: true,
    featured: true,
    isDemo: true,
    relatedIds: ["p-nero", "p-onyx"],
  },
  {
    id: "p-trav",
    slug: "travertine-graphite",
    name: "Travertine Graphite",
    description:
      "Dolgu ve honlu seçenekleriyle grafit traverten. Zemin ve ıslak hacim.",
    category: "Traverten",
    images: ["/products/travertine-graphite.svg", "/products/honed-slate.svg"],
    price: 2800,
    sku: "KL-T-001",
    variants: finishes("KL-T-001", 2800),
    inventory: "in_stock",
    attributes: { koken: "Seçilmiş levha", kullanim: "Zemin / duvar", bakim: "Traverten bakımı" },
    published: true,
    featured: true,
    isDemo: true,
    relatedIds: ["p-honed", "p-ivory"],
  },
  {
    id: "p-honed",
    slug: "honed-slate-stone",
    name: "Honed Graphite",
    description:
      "Mat honlu yüzey, düşük yansıma. Geniş zemin plakaları.",
    category: "Traverten",
    images: ["/products/honed-slate.svg", "/products/travertine-graphite.svg"],
    price: 2450,
    sku: "KL-T-002",
    variants: finishes("KL-T-002", 2450),
    inventory: "in_stock",
    attributes: { koken: "Seçilmiş levha", kullanim: "Zemin", bakim: "Mat yüzey bakımı" },
    published: true,
    isDemo: true,
    relatedIds: ["p-trav", "p-granite"],
  },
  {
    id: "p-granite",
    slug: "granite-ash",
    name: "Granite Ash",
    description:
      "Yoğun dokulu kül grisi granit. Dış mekân ve yoğun kullanım yüzeyleri.",
    category: "Granit",
    images: ["/products/granite-ash.svg", "/products/silver-vein.svg"],
    price: 3100,
    sku: "KL-G-001",
    variants: finishes("KL-G-001", 3100),
    inventory: "in_stock",
    attributes: { koken: "Seçilmiş levha", kullanim: "İç / dış", bakim: "Granit bakımı" },
    published: true,
    featured: true,
    isDemo: true,
    relatedIds: ["p-verde", "p-silver"],
  },
  {
    id: "p-verde",
    slug: "verde-depth",
    name: "Verde Depth",
    description:
      "Koyu yeşil damarlı granit. Tezgâh ve özel kesim parçalar.",
    category: "Granit",
    images: ["/products/verde-depth.svg", "/products/granite-ash.svg"],
    price: 3600,
    sku: "KL-G-002",
    variants: [
      ...finishes("KL-G-002", 3600),
      {
        id: "KL-G-002-out",
        label: "2 cm · Alevli",
        sku: "KL-G-002-2A",
        price: 3750,
        inventory: "unavailable",
        attributes: { kalinlik: "2 cm", yuzey: "Alevli" },
      },
    ],
    inventory: "in_stock",
    attributes: { koken: "Seçilmiş levha", kullanim: "Tezgâh", bakim: "Granit bakımı" },
    published: true,
    isDemo: true,
    relatedIds: ["p-granite", "p-nero"],
  },
  {
    id: "p-onyx",
    slug: "onyx-ice",
    name: "Onyx Ice",
    description:
      "Yarı saydam oniks. Arkadan aydınlatmalı feature yüzeyler için.",
    category: "Oniks",
    images: ["/products/onyx-ice.svg", "/products/calacatta-night.svg"],
    price: 12400,
    sku: "KL-O-001",
    variants: [
      {
        id: "KL-O-001-20",
        label: "2 cm · Cilalı",
        sku: "KL-O-001-2C",
        price: 12400,
        inventory: "made_to_order",
        attributes: { kalinlik: "2 cm", yuzey: "Cilalı" },
      },
      {
        id: "KL-O-001-15",
        label: "1.5 cm · Backlit",
        sku: "KL-O-001-15B",
        price: 14800,
        inventory: "made_to_order",
        attributes: { kalinlik: "1.5 cm", yuzey: "Backlit" },
      },
    ],
    inventory: "made_to_order",
    attributes: { koken: "Seçilmiş levha", kullanim: "Aydınlatmalı duvar", bakim: "Hassas yüzey" },
    published: true,
    featured: true,
    isDemo: true,
    relatedIds: ["p-bookmatch", "p-calacatta"],
  },
  {
    id: "p-mosaic",
    slug: "obsidian-mosaic",
    name: "Obsidian Mosaic",
    description:
      "30×30 cm mozaik karo. Islak hacim ve detay yüzeyler.",
    category: "Mozaik",
    images: ["/products/mosaic-grid.svg", "/products/nero-obsidian.svg"],
    price: 890,
    sku: "KL-Z-001",
    variants: [
      {
        id: "KL-Z-001-30",
        label: "30×30 · Mat",
        sku: "KL-Z-001-30M",
        price: 890,
        inventory: "in_stock",
        attributes: { kalinlik: "1 cm", yuzey: "Mat" },
      },
      {
        id: "KL-Z-001-30p",
        label: "30×30 · Cilalı",
        sku: "KL-Z-001-30C",
        price: 960,
        inventory: "in_stock",
        attributes: { kalinlik: "1 cm", yuzey: "Cilalı" },
      },
    ],
    inventory: "in_stock",
    attributes: { koken: "Karo", kullanim: "Duvar / zemin detay", bakim: "Derz bakımı" },
    published: true,
    isDemo: true,
    relatedIds: ["p-nero", "p-honed"],
  },
  {
    id: "p-mosaic-ice",
    slug: "ice-mosaic",
    name: "Ice Mosaic",
    description:
      "Açık gümüş mozaik. Spa ve ıslak hacim detayları.",
    category: "Mozaik",
    images: ["/products/mosaic-grid.svg", "/products/onyx-ice.svg"],
    price: 940,
    sku: "KL-Z-002",
    variants: [
      {
        id: "KL-Z-002-30",
        label: "30×30 · Mat",
        sku: "KL-Z-002-30M",
        price: 940,
        inventory: "in_stock",
        attributes: { kalinlik: "1 cm", yuzey: "Mat" },
      },
    ],
    inventory: "in_stock",
    attributes: { koken: "Karo", kullanim: "Duvar", bakim: "Derz bakımı" },
    published: true,
    isDemo: true,
    relatedIds: ["p-mosaic", "p-onyx"],
  },
];

for (const product of products) {
  product.images = product.images.map(asset);
}

export const publishedProducts = products.filter((p) => p.published);

export function getProductBySlug(slug: string) {
  return publishedProducts.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return publishedProducts.find((p) => p.id === id);
}

export const PRICE_BOUNDS = {
  min: Math.min(...publishedProducts.map((p) => p.price)),
  max: Math.max(...publishedProducts.map((p) => p.price)),
};

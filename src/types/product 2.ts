export type InventoryStatus = "in_stock" | "made_to_order" | "unavailable";

export type ProductVariant = {
  id: string;
  label: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventory: InventoryStatus;
  attributes: Record<string, string>;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  sku: string;
  variants: ProductVariant[];
  inventory: InventoryStatus;
  attributes: Record<string, string>;
  reviews?: ProductReview[];
  published: boolean;
  featured?: boolean;
  isDemo: boolean;
  relatedIds?: string[];
};

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

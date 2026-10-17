import type { Product, SortKey } from "@/types/product";

export function searchProducts(products: Product[], query: string) {
  const q = query.trim().toLocaleLowerCase("tr");
  if (!q) return products;
  return products.filter((p) => {
    const hay = [
      p.name,
      p.description,
      p.sku,
      p.category,
      ...Object.values(p.attributes),
      ...p.variants.flatMap((v) => [v.sku, v.label]),
    ]
      .join(" ")
      .toLocaleLowerCase("tr");
    return hay.includes(q);
  });
}

export function sortProducts(products: Product[], sort: SortKey) {
  const next = [...products];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price - b.price);
    case "price-desc":
      return next.sort((a, b) => b.price - a.price);
    case "name-asc":
      return next.sort((a, b) => a.name.localeCompare(b.name, "tr"));
    default:
      return next.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}

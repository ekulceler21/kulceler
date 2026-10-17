import { useState } from "react";
import { ProductGrid } from "@/components/product/ProductCard";
import { publishedProducts } from "@/data/products";
import { STORE } from "@/data/site";

const PAGE = 8;

export function Catalog() {
  const [visible, setVisible] = useState(PAGE);
  const filtered = publishedProducts;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 md:px-6">
      <p className="text-xs tracking-[0.28em] text-muted uppercase">Katalog</p>
      <h1 className="font-display mt-2 text-4xl md:text-6xl">Koleksiyon</h1>
      <p className="mt-4 max-w-2xl text-[16px] text-soft">
        Levha ve karo seçkisi. {STORE.demoNotice}
      </p>
      <p className="mt-3 text-sm text-muted">{filtered.length} ürün</p>

      <div className="mt-10">
        <ProductGrid products={filtered.slice(0, visible)} />
        {visible < filtered.length && (
          <button
            type="button"
            className="mt-10 h-12 w-full border border-border text-sm tracking-[0.16em] uppercase transition hover:border-silver"
            onClick={() => setVisible((v) => v + PAGE)}
          >
            Daha fazla
          </button>
        )}
      </div>
    </div>
  );
}

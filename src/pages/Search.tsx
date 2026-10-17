import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "@/components/product/ProductCard";
import { publishedProducts } from "@/data/products";
import { searchProducts } from "@/lib/search";

export function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [draft, setDraft] = useState(q);
  const results = useMemo(() => searchProducts(publishedProducts, q), [q]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (draft.trim()) next.set("q", draft.trim());
    else next.delete("q");
    setParams(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 md:px-6">
      <h1 className="font-display text-4xl">Arama</h1>
      <form onSubmit={submit} className="mt-6 flex gap-3" role="search">
        <label htmlFor="search-page" className="sr-only">
          Ara
        </label>
        <input
          id="search-page"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="h-12 flex-1 border border-border bg-graphite px-4"
          placeholder="Ürün, açıklama, SKU, kategori"
        />
        <button type="submit" className="h-12 bg-ice px-5 text-obsidian">
          Ara
        </button>
        {q && (
          <button
            type="button"
            className="h-12 border border-border px-4"
            onClick={() => {
              setDraft("");
              setParams({});
            }}
          >
            Temizle
          </button>
        )}
      </form>
      {q ? (
        results.length ? (
          <p className="mt-6 text-sm text-muted">
            “{q}” için {results.length} sonuç
          </p>
        ) : (
          <p className="mt-10 text-soft">Eşleşen ürün yok. Farklı bir SKU veya kategori deneyin.</p>
        )
      ) : (
        <p className="mt-10 text-soft">Aramak için bir kelime yazın.</p>
      )}
      <div className="mt-8">
        <ProductGrid products={results} />
      </div>
    </div>
  );
}

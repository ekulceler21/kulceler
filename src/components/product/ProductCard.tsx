import { Link } from "react-router-dom";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col bg-graphite">
      <Link to={`/urun/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-img h-full w-full transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {product.isDemo && (
          <span className="absolute top-3 left-3 bg-obsidian/75 px-2 py-1 text-[10px] tracking-[0.16em] text-silver uppercase">
            Örnek
          </span>
        )}
      </Link>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">{product.category}</p>
          <h3 className="mt-1 text-[16px] text-ice">
            <Link to={`/urun/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-soft">Bu kriterlere uygun ürün yok.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

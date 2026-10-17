import { Link } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import { getProductById } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductCard";

export function Favorites() {
  const { ids } = useFavorites();
  const products = ids.map(getProductById).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 md:px-6">
      <h1 className="font-display text-4xl">Favoriler</h1>
      {products.length === 0 ? (
        <p className="mt-8 text-soft">
          Henüz kayıt yok.{" "}
          <Link className="underline" to="/koleksiyon">
            Koleksiyona göz atın
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
}

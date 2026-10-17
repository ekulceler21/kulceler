import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatMoney } from "@/lib/currency";

export function Cart() {
  const { items, setQty, remove, subtotal } = useCart();
  const rows = items
    .map((item) => {
      const product = getProductById(item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant) return null;
      return { item, product, variant };
    })
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center">
        <h1 className="font-display text-4xl">Sepet boş</h1>
        <p className="mt-4 text-soft">Koleksiyondan levha ekleyin.</p>
        <Link to="/koleksiyon" className="mt-8 inline-flex h-12 items-center bg-ice px-6 text-obsidian">
          Alışverişe devam
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 pb-20 md:px-6">
      <h1 className="font-display text-4xl">Sepet</h1>
      <ul className="mt-10 divide-y divide-border border-y border-border">
        {rows.map(({ item, product, variant }) => (
          <li key={`${item.productId}-${item.variantId}`} className="flex flex-col gap-4 py-6 sm:flex-row">
            <img src={product.images[0]} alt="" className="h-28 w-20 object-cover" />
            <div className="flex-1">
              <Link to={`/urun/${product.slug}`} className="text-lg text-ice hover:underline">
                {product.name}
              </Link>
              <p className="text-sm text-muted">{variant.label}</p>
              <p className="mt-1 text-silver">{formatMoney(variant.price)}</p>
              <div className="mt-3 flex items-center gap-3">
                <label className="text-sm">
                  Adet
                  <input
                    type="number"
                    min={1}
                    className="ml-2 h-11 w-16 border border-border bg-graphite px-2"
                    value={item.quantity}
                    onChange={(e) =>
                      setQty(item.productId, item.variantId, Math.max(1, Number(e.target.value) || 1))
                    }
                  />
                </label>
                <button
                  type="button"
                  className="text-sm text-muted underline"
                  onClick={() => remove(item.productId, item.variantId)}
                >
                  Kaldır
                </button>
              </div>
            </div>
            <p className="text-ice">{formatMoney(variant.price * item.quantity)}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-end gap-3">
        <p className="text-lg">
          Ara toplam <span className="ml-4">{formatMoney(subtotal)}</span>
        </p>
        <p className="text-sm text-muted">Nakliye ödeme adımında hesaplanır. Tutarlar önizlemedir.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/koleksiyon" className="h-12 border border-border px-5 leading-[48px] text-sm">
            Alışverişe devam
          </Link>
          <Link to="/odeme" className="h-12 bg-ice px-6 leading-[48px] text-sm text-obsidian">
            Ödemeye geç
          </Link>
        </div>
      </div>
    </div>
  );
}

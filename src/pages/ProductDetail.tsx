import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById, getProductBySlug } from "@/data/products";
import { productInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { ProductGrid } from "@/components/product/ProductCard";
import { STORE } from "@/data/site";

const statusLabel = {
  in_stock: "Stokta",
  made_to_order: "Sipariş üzerine üretim",
  unavailable: "Bu seçenek yok",
};

export function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [idx, setIdx] = useState(0);
  const [variantId, setVariantId] = useState(product?.variants[0]?.id ?? "");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    setIdx(0);
    setVariantId(product?.variants[0]?.id ?? "");
  }, [product?.id]);

  const variant = useMemo(
    () => product?.variants.find((v) => v.id === variantId) ?? product?.variants[0],
    [product, variantId],
  );

  if (!product || !variant) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center">
        <h1 className="font-display text-3xl">Ürün bulunamadı</h1>
        <Link className="mt-6 inline-block text-silver underline" to="/koleksiyon">
          Koleksiyona dön
        </Link>
      </div>
    );
  }

  const related = (product.relatedIds ?? [])
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
            <img
              src={product.images[idx]}
              alt={`${product.name} görsel ${idx + 1}`}
              className="product-img h-full w-full lg:cursor-zoom-in lg:hover:scale-110"
            />
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                className={`h-20 w-16 overflow-hidden border ${i === idx ? "border-accent" : "border-border"}`}
                onClick={() => setIdx(i)}
                aria-label={`Görsel ${i + 1}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">{product.category}</p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="font-display text-4xl md:text-5xl">{product.name}</h1>
          </div>
          <p className="mt-2 text-sm text-muted">SKU {variant.sku}</p>
          {product.isDemo && <p className="mt-4 text-sm text-silver">{STORE.demoNotice}</p>}
          <p className="mt-6 text-[16px] text-soft">{product.description}</p>

          <p className="mt-4 text-sm text-silver">{statusLabel[variant.inventory]}</p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              className="inline-flex h-12 w-full items-center justify-center bg-ice text-sm tracking-[0.14em] text-obsidian uppercase"
              href={whatsappUrl(productInquiryMessage(product.name, variant.sku))}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ile Bilgi Alın
            </a>
            <a
              className="inline-flex h-12 w-full items-center justify-center border border-border text-sm tracking-[0.12em] uppercase text-center px-4"
              href={`mailto:${STORE.email}?subject=${encodeURIComponent(`Bilgi Talebi: ${product.name} (${variant.sku})`)}&body=${encodeURIComponent(`Merhaba,\n\n"${product.name}" (${variant.sku} - ${variant.label}) ürünü hakkında bilgi, stok ve teklif almak istiyorum.\n\nTeşekkürler.`)}`}
            >
              E-posta ile İletişim
            </a>
          </div>

          <dl className="mt-10 grid gap-3 border-t border-border pt-6 text-sm">
            {Object.entries(product.attributes)
              .filter(([k]) => !["koken", "kullanim", "bakim"].includes(k))
              .map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <dt className="text-muted capitalize">{k}</dt>
                  <dd className="text-ice">{v}</dd>
                </div>
              ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl">İlgili yüzeyler</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}

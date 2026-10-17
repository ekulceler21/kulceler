import { Link } from "react-router-dom";
import { ScrollHero } from "@/components/home/ScrollHero";
import { ProductGrid } from "@/components/product/ProductCard";
import { publishedProducts } from "@/data/products";
import { STORE } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function Home() {
  const featured = publishedProducts.filter((p) => p.featured);

  return (
    <>
      <ScrollHero />

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.28em] text-muted uppercase">Seçkiler</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl">Öne çıkan modeller</h2>
          </div>
          <Link to="/koleksiyon" className="text-sm tracking-wide text-silver underline-offset-4 hover:underline">
            Tümünü gör
          </Link>
        </div>
        <p className="mb-8 text-sm text-muted">{STORE.demoNotice}</p>
        <ProductGrid products={featured} />
      </section>

      <section id="yapi" className="border-t border-border bg-space py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div className="max-w-3xl">
              <p className="text-xs tracking-[0.3em] text-silver uppercase">Malzeme ve Yaklaşım</p>
              <h2 className="font-display mt-4 text-4xl text-ice md:text-6xl">
                İçte taş.
                <br />
                Dışta farklı bir yapı.
              </h2>
              <p className="mt-6 text-[18px] leading-relaxed text-soft">
                Görünen estetik yüzey ile dış taşıyıcı katmanın birbirini tamamladığı bir eviye yaklaşımı. Gereksiz teknik karmaşa olmadan, gerçek ürünün ne sunduğunu gösteriyoruz.
              </p>
            </div>
            <div className="flex-shrink-0 self-center md:self-start pt-2">
              <img
                src="/media/logo.svg"
                alt="Logo"
                className="h-24 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="border border-border bg-graphite p-8">
              <p className="text-xs tracking-[0.2em] text-silver uppercase">01 / İç Yüzey</p>
              <h3 className="font-display mt-3 text-2xl text-ice">Kuvars</h3>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Damar karakteri, renk ve yüzey etkisi ürünün görünen iç bölümünde öne çıkar.
              </p>
            </div>
            <div className="border border-border bg-graphite p-8">
              <p className="text-xs tracking-[0.2em] text-silver uppercase">02 / Dış Yapı</p>
              <h3 className="font-display mt-3 text-2xl text-ice">Epoksi ve elyaf</h3>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Dış gövde damarsız kompozit yapıdadır.
              </p>
            </div>
            <div className="border border-border bg-graphite p-8">
              <p className="text-xs tracking-[0.2em] text-silver uppercase">03 / İş Birliği</p>
              <h3 className="font-display mt-3 text-2xl text-ice">Üreticiye yönelik</h3>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Tezgâh üreticileri ve uygulamacılar için malzeme ve proje ihtiyaçlarına göre görüşme olanağı.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href={whatsappUrl("Merhaba, tezgâh üreticisi / uygulamacıyım. Özel kuvars eviye projeleri hakkında görüşmek istiyorum.")}
              className="inline-flex h-14 items-center justify-center bg-ice px-8 text-sm tracking-[0.16em] text-obsidian uppercase transition hover:bg-white"
              target="_blank"
              rel="noreferrer"
            >
              Proje ve İş Birliği İçin Görüşün
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

import type { ReactNode } from "react";

export function Info({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-24 pb-20 md:px-6">
      <h1 className="font-display text-4xl">{title}</h1>
      <div className="mt-8 space-y-4 text-[16px] text-soft">{children}</div>
    </article>
  );
}

export function ShippingPage() {
  return (
    <Info title="Teslimat">
      <p>Showroom teslim Denizli Merkezefendi adresinden yapılır.</p>
      <p>Nakliye, ölçü ve güzergâha göre teklif edilir. Sitedeki nakliye tutarı önizlemedir.</p>
    </Info>
  );
}

export function ReturnsPage() {
  return (
    <Info title="İade">
      <p>Kesilmiş veya özel üretilmiş levhalar iade edilemez.</p>
      <p>Standart karo siparişlerinde hasarsız ürünler için 14 gün içinde iletişime geçin.</p>
    </Info>
  );
}

export function PrivacyPage() {
  return (
    <Info title="Gizlilik">
      <p>Bu ön yüzde sipariş formu tarayıcınızda saklanır. Ödeme kartı bilgisi toplanmaz.</p>
      <p>WhatsApp görüşmeleri ilgili uygulamanın politikalarına tabidir.</p>
    </Info>
  );
}

export function TermsPage() {
  return (
    <Info title="Koşullar">
      <p>Katalog fiyatları ve görseller örneklemedir. Kesin teklif stok ve ölçü onayından sonra geçerlidir.</p>
      <p>Ödeme adımı demo / test modundadır; gerçek tahsilat yoktur.</p>
    </Info>
  );
}

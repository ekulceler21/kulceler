import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatMoney } from "@/lib/currency";
import { PAYMENT_METHODS, SHIPPING_METHODS, STORE } from "@/data/site";

const FORM_KEY = "kulceler-checkout-v1";

type Form = {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  shipping: string;
  payment: string;
  notes: string;
};

const empty: Form = {
  name: "",
  email: "",
  phone: "",
  city: "Denizli",
  address: "",
  shipping: "showroom",
  payment: "whatsapp",
  notes: "",
};

export function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(() => {
    try {
      const raw = sessionStorage.getItem(FORM_KEY);
      return raw ? { ...empty, ...(JSON.parse(raw) as Form) } : empty;
    } catch {
      return empty;
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    sessionStorage.setItem(FORM_KEY, JSON.stringify(form));
  }, [form]);

  const rows = items
    .map((item) => {
      const product = getProductById(item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant) return null;
      return { item, product, variant };
    })
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const blocked = rows.some((r) => r.variant.inventory === "unavailable");
  const shipping = SHIPPING_METHODS.find((s) => s.id === form.shipping) ?? SHIPPING_METHODS[0];
  const total = subtotal + shipping.price;

  const field = (key: keyof Form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Ad soyad gerekli.";
    if (!form.email.includes("@")) e.email = "Geçerli e-posta girin.";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Telefon eksik.";
    if (!form.address.trim()) e.address = "Adres gerekli.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (blocked) return;
    if (!validate()) return;
    const id = `KL-DEMO-${Date.now().toString().slice(-6)}`;
    const order = {
      id,
      simulated: true,
      form,
      shipping,
      total,
      items: rows.map((r) => ({
        name: r.product.name,
        variant: r.variant.label,
        qty: r.item.quantity,
        price: r.variant.price,
      })),
    };
    sessionStorage.setItem("kulceler-last-order", JSON.stringify(order));
    clear();
    navigate(`/siparis/${id}`);
  };

  const summary = useMemo(
    () => (
      <aside className="border border-border bg-graphite p-6">
        <h2 className="font-display text-xl">Özet</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {rows.map((r) => (
            <li key={r.variant.id} className="flex justify-between gap-3">
              <span>
                {r.product.name} · {r.item.quantity}
              </span>
              <span>{formatMoney(r.variant.price * r.item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between text-sm text-soft">
          <span>Ara toplam</span>
          <span>{formatMoney(subtotal)}</span>
        </p>
        <p className="mt-2 flex justify-between text-sm text-soft">
          <span>{shipping.name}</span>
          <span>{shipping.price ? formatMoney(shipping.price) : "Ücretsiz"}</span>
        </p>
        <p className="mt-4 flex justify-between text-lg">
          <span>Toplam</span>
          <span>{formatMoney(total)}</span>
        </p>
        <p className="mt-4 text-xs text-muted">Ödeme simüle edilir. Kart bilgisi alınmaz.</p>
      </aside>
    ),
    [rows, shipping, subtotal, total],
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-32 text-center">
        <h1 className="font-display text-3xl">Sepet boş</h1>
        <Link className="mt-6 inline-block underline" to="/koleksiyon">
          Koleksiyona dön
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 md:px-6">
      <h1 className="font-display text-4xl">Ödeme</h1>
      <p className="mt-3 text-sm text-silver">Misafir ödeme · demo / test modu</p>
      {blocked && (
        <p className="mt-4 border border-red-400/40 bg-red-400/10 p-3 text-sm">
          Sepette stokta olmayan bir seçenek var. Lütfen sepeti güncelleyin.
        </p>
      )}
      <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]" noValidate>
        <div className="space-y-8">
          <section>
            <h2 className="text-sm tracking-[0.2em] text-muted uppercase">İletişim</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Ad soyad" error={errors.name}>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => field("name", e.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="E-posta" error={errors.email}>
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={(e) => field("email", e.target.value)}
                  autoComplete="email"
                />
              </Field>
              <Field label="Telefon" error={errors.phone}>
                <input
                  className="input"
                  value={form.phone}
                  onChange={(e) => field("phone", e.target.value)}
                  autoComplete="tel"
                />
              </Field>
            </div>
          </section>
          <section>
            <h2 className="text-sm tracking-[0.2em] text-muted uppercase">Teslimat adresi</h2>
            <div className="mt-4 grid gap-4">
              <Field label="Şehir">
                <input className="input" value={form.city} onChange={(e) => field("city", e.target.value)} />
              </Field>
              <Field label="Adres" error={errors.address}>
                <textarea
                  className="input min-h-24 py-3"
                  value={form.address}
                  onChange={(e) => field("address", e.target.value)}
                />
              </Field>
            </div>
          </section>
          <fieldset>
            <legend className="text-sm tracking-[0.2em] text-muted uppercase">Teslimat</legend>
            <div className="mt-4 space-y-3">
              {SHIPPING_METHODS.map((s) => (
                <label key={s.id} className="flex cursor-pointer gap-3 border border-border p-4">
                  <input
                    type="radio"
                    name="shipping"
                    checked={form.shipping === s.id}
                    onChange={() => field("shipping", s.id)}
                  />
                  <span>
                    <span className="block text-ice">{s.name}</span>
                    <span className="text-sm text-muted">{s.detail}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm tracking-[0.2em] text-muted uppercase">Ödeme</legend>
            <div className="mt-4 space-y-3">
              {PAYMENT_METHODS.map((p) => (
                <label key={p.id} className="flex cursor-pointer gap-3 border border-border p-4">
                  <input
                    type="radio"
                    name="payment"
                    checked={form.payment === p.id}
                    onChange={() => field("payment", p.id)}
                  />
                  <span>
                    <span className="block text-ice">{p.name}</span>
                    <span className="text-sm text-muted">{p.detail}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field label="Not (isteğe bağlı)">
            <textarea className="input min-h-20 py-3" value={form.notes} onChange={(e) => field("notes", e.target.value)} />
          </Field>
          <button
            disabled={blocked}
            className="h-12 w-full bg-ice text-sm tracking-[0.16em] text-obsidian uppercase disabled:opacity-40"
          >
            Siparişi simüle et
          </button>
          <p className="text-xs text-muted">
            Showroom: {STORE.address}. Kart formu yoktur; ödeme sağlayıcı entegre edilmedi.
          </p>
        </div>
        {summary}
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm text-soft">
      {label}
      <div className="mt-2 [&_.input]:h-12 [&_.input]:w-full [&_.input]:border [&_.input]:border-border [&_.input]:bg-graphite [&_.input]:px-3 [&_.input]:text-[16px] [&_.input]:text-ice">
        {children}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-300" role="alert">
          {error}
        </p>
      )}
    </label>
  );
}

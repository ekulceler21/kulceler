import { Link, useParams } from "react-router-dom";
import { formatMoney } from "@/lib/currency";
import { STORE } from "@/data/site";

type Order = {
  id: string;
  simulated: boolean;
  total: number;
  shipping: { name: string; detail: string };
  form: { name: string; address: string; city: string; payment: string };
  items: { name: string; variant: string; qty: number; price: number }[];
};

export function Confirmation() {
  const { id } = useParams();
  let order: Order | null = null;
  try {
    const raw = sessionStorage.getItem("kulceler-last-order");
    if (raw) order = JSON.parse(raw) as Order;
  } catch {
    order = null;
  }

  if (!order || order.id !== id) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-32 text-center">
        <h1 className="font-display text-3xl">Sipariş bulunamadı</h1>
        <Link className="mt-6 inline-block underline" to="/">
          Ana sayfa
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-24 pb-20 md:px-6">
      <p className="text-xs tracking-[0.28em] text-accent uppercase">Simüle edilmiş onay</p>
      <h1 className="font-display mt-3 text-4xl">Sipariş alındı (demo)</h1>
      <p className="mt-4 text-soft">
        Referans <strong className="text-ice">{order.id}</strong>. Bu bir gerçek tahsilat değildir.
      </p>
      <ul className="mt-8 divide-y divide-border border-y border-border">
        {order.items.map((i) => (
          <li key={i.name + i.variant} className="flex justify-between py-4 text-sm">
            <span>
              {i.name} · {i.variant} × {i.qty}
            </span>
            <span>{formatMoney(i.price * i.qty)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-lg">Toplam {formatMoney(order.total)}</p>
      <p className="mt-4 text-sm text-soft">
        Teslimat: {order.shipping.name}. {order.form.address}, {order.form.city}.
      </p>
      <p className="mt-6 text-sm text-muted">
        Sonraki adım: {STORE.phoneDisplay} veya WhatsApp üzerinden levha onayı.
      </p>
      <Link to="/koleksiyon" className="mt-10 inline-flex h-12 items-center border border-border px-6">
        Koleksiyona dön
      </Link>
    </div>
  );
}

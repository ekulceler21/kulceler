import { useState, type FormEvent } from "react";
import { STORE } from "@/data/site";
import { IconInstagram, IconMail, IconPhone } from "@/components/ui/Icon";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`İletişim Formu: ${form.name}`);
    const body = encodeURIComponent(`Ad Soyad: ${form.name}\nE-posta: ${form.email}\n\nMesaj:\n${form.message}`);
    window.location.href = `mailto:${STORE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-24 pb-20 md:px-6">
      <h1 className="font-display text-4xl md:text-5xl">İletişim</h1>
      <p className="mt-6 text-[16px] text-soft">{STORE.address}</p>
      <div className="mt-4 space-y-3">
        <p className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-graphite text-ice">
            <IconPhone className="h-4 w-4" />
          </span>
          <a className="text-ice underline" href={`tel:${STORE.phoneTel}`}>
            {STORE.phoneDisplay}
          </a>
        </p>
        <p className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-graphite text-ice">
            <IconMail className="h-4 w-4" />
          </span>
          <a className="text-ice underline" href={`mailto:${STORE.email}`}>
            {STORE.email}
          </a>
        </p>
        <p className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-graphite text-ice">
            <IconInstagram className="h-4 w-4" />
          </span>
          <a className="text-ice underline" href={STORE.instagramUrl} target="_blank" rel="noreferrer">
            @{STORE.instagramHandle}
          </a>
        </p>
      </div>



      <div className="mt-10 overflow-hidden border border-border bg-graphite">
        <div className="aspect-[16/9] w-full">
          <iframe
            title="Külçeler Marble Konum"
            src="https://maps.google.com/maps?q=Zafer,+Yavuz+Selim+Cd.+No:4,+20020+Denizli+Merkezefendi/Denizli&t=&z=17&ie=UTF8&iwloc=near&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(95%)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mt-16 border-t border-border pt-12">
        <h2 className="font-display text-2xl">E-posta Gönder</h2>
        <p className="mt-2 text-sm text-muted">Doğrudan {STORE.email} adresine mesaj iletin.</p>

        {sent ? (
          <div className="mt-6 border border-border bg-graphite p-6 text-center">
            <p className="text-ice">E-posta istemciniz açıldı / mesajınız iletildi.</p>
            <button
              type="button"
              className="mt-4 text-xs text-silver underline"
              onClick={() => {
                setSent(false);
                setForm({ name: "", email: "", message: "" });
              }}
            >
              Yeni mesaj gönder
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted">Ad Soyad</label>
              <input
                required
                className="mt-1 h-12 w-full border border-border bg-graphite px-4 text-ice"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted">E-posta Adresiniz</label>
              <input
                required
                type="email"
                className="mt-1 h-12 w-full border border-border bg-graphite px-4 text-ice"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted">Mesajınız</label>
              <textarea
                required
                className="mt-1 min-h-32 w-full border border-border bg-graphite p-4 text-ice"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button type="submit" className="h-12 bg-ice px-6 text-sm tracking-[0.14em] text-obsidian uppercase">
              E-posta Gönder
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

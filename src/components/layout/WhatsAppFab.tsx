import { STORE } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { IconInstagram, IconMail, IconWhatsApp } from "@/components/ui/Icon";

export function WhatsAppFab() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <a
        href={`mailto:${STORE.email}?subject=${encodeURIComponent("Bilgi Talebi")}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-graphite border border-border text-ice shadow-elev transition hover:scale-[1.04]"
        aria-label={`E-posta: ${STORE.email}`}
      >
        <IconMail className="h-5 w-5" />
      </a>
      <a
        href={STORE.instagramUrl}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-graphite border border-border text-ice shadow-elev transition hover:scale-[1.04]"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <IconInstagram className="h-5 w-5" />
      </a>
      <a
        href={whatsappUrl("Merhaba, Külçeler Marble koleksiyonu hakkında bilgi almak istiyorum.")}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-graphite border border-border text-ice shadow-elev transition hover:scale-[1.04]"
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp: ${STORE.phoneDisplay}`}
      >
        <IconWhatsApp className="h-5 w-5" />
      </a>
    </div>
  );
}

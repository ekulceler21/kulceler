import { Link } from "react-router-dom";
import { STORE } from "@/data/site";
import { asset } from "@/lib/asset";

export function Footer() {
  return (
    <footer className="border-t border-border bg-space">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block" aria-label="Külçeler ana sayfa">
            <img
              src={asset("/media/logokulceler-2.png")}
              alt="Külçeler"
              className="h-10 w-auto object-contain"
              width={160}
              height={40}
            />
          </Link>
          <p className="mt-5 max-w-md text-[15px] text-soft">{STORE.address}</p>
          <p className="mt-2 text-[15px]">
            <a className="text-ice underline-offset-4 hover:underline" href={`tel:${STORE.phoneTel}`}>
              {STORE.phoneDisplay}
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">Gezinme</p>
          <ul className="mt-4 space-y-2 text-[15px] text-soft">
            <li><Link className="hover:text-ice" to="/">Ana Sayfa</Link></li>
            <li><Link className="hover:text-ice" to="/koleksiyon">Koleksiyon</Link></li>
            <li><Link className="hover:text-ice" to="/iletisim">İletişim</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.2em] text-muted uppercase">İletişim</p>
          <ul className="mt-4 space-y-2 text-[15px] text-soft">
            <li><Link className="hover:text-ice" to="/iletisim">Bize Ulaşın</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted md:px-6">
        © {new Date().getFullYear()} Külçeler Marble · Denizli
      </div>
    </footer>
  );
}

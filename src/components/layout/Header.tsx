import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV_LINKS } from "@/data/site";
import { publishedProducts } from "@/data/products";
import { searchProducts } from "@/lib/search";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconClose, IconSearch } from "@/components/ui/Icon";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const line3 = useRef<HTMLSpanElement>(null);

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || reduced) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 24,
        onUpdate: (self) => {
          const p = Math.min(1, self.scroll() / 180);
          gsap.to(header, {
            backgroundColor: `rgba(8,9,11,${0.15 + p * 0.85})`,
            backdropFilter: `blur(${p * 10}px)`,
            borderBottomColor: `rgba(48,55,64,${p})`,
            duration: 0.2,
            overwrite: "auto",
          });
          if (line1.current && line2.current && line3.current) {
            gsap.to(line1.current, { y: p * 5, scaleX: 1 - p * 0.15, duration: 0.2, overwrite: "auto" });
            gsap.to(line2.current, { opacity: 1 - p * 0.35, scaleX: 0.7 + (1 - p) * 0.3, duration: 0.2, overwrite: "auto" });
            gsap.to(line3.current, { y: -p * 5, scaleX: 1 - p * 0.15, duration: 0.2, overwrite: "auto" });
          }
        },
      });
    }, header);
    return () => ctx.revert();
  }, [reduced]);

  const suggestions = q.trim().length > 1 ? searchProducts(publishedProducts, q).slice(0, 6) : [];

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/arama?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-obsidian/20"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:h-[72px] md:px-6">
        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          <span ref={line1} className="block h-px w-6 bg-ice" />
          <span ref={line2} className="block h-px w-6 bg-ice" />
          <span ref={line3} className="block h-px w-6 bg-ice" />
        </button>

        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Külçeler ana sayfa">
          <img
            src="./media/logokulceler-2.png"
            alt="Külçeler"
            className="h-9 w-auto object-contain"
            width={160}
            height={40}
          />
        </Link>

        <nav className="ml-8 hidden items-center gap-7 md:flex" aria-label="Ana menü">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-[13px] tracking-[0.16em] uppercase transition ${
                  isActive ? "text-ice" : "text-soft hover:text-ice"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center text-ice"
            aria-label="Aramayı aç"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <IconSearch />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-obsidian/95 px-4 py-4 md:px-6">
          <form onSubmit={onSearch} className="mx-auto flex max-w-7xl items-center gap-3" role="search">
            <label htmlFor="site-search" className="sr-only">
              Ürün ara
            </label>
            <input
              id="site-search"
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ürün, SKU veya kategori"
              className="h-12 flex-1 border border-border bg-graphite px-4 text-[15px] text-ice placeholder:text-muted"
            />
            <button type="submit" className="h-12 bg-ice px-5 text-sm tracking-wide text-obsidian">
              Ara
            </button>
            <button type="button" className="grid h-12 w-12 place-items-center" aria-label="Aramayı kapat" onClick={() => setSearchOpen(false)}>
              <IconClose />
            </button>
          </form>
          {suggestions.length > 0 && (
            <ul className="mx-auto mt-3 max-w-7xl divide-y divide-border border border-border bg-graphite">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <Link to={`/urun/${p.slug}`} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate">
                    <img src={p.images[0]} alt="" className="h-10 w-8 object-cover" />
                    <span>{p.name}</span>
                    <span className="ml-auto text-muted">{p.sku}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-obsidian md:hidden">
          <nav className="flex flex-col px-4 py-4" aria-label="Mobil menü">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className="border-b border-border py-4 text-sm tracking-[0.18em] uppercase">
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

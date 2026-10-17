/** Prefix public files so they work both at `/` (local) and `/kulceler/` (GitHub Pages). */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}

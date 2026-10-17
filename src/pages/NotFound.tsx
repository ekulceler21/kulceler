import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-20 text-center">
      <h1 className="font-display text-4xl">Sayfa yok</h1>
      <Link className="mt-6 inline-block underline" to="/">
        Ana sayfa
      </Link>
    </div>
  );
}

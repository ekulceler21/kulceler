import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFab } from "./WhatsAppFab";
import { useCart } from "@/context/CartContext";

export function Layout() {
  const { notice } = useCart();
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      {notice && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 border border-border bg-graphite px-4 py-3 text-sm text-ice shadow-elev"
        >
          {notice.message}
        </div>
      )}
    </div>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Catalog } from "@/pages/Catalog";
import { ProductDetail } from "@/pages/ProductDetail";
import { Search } from "@/pages/Search";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { Confirmation } from "@/pages/Confirmation";
import { Favorites } from "@/pages/Favorites";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/koleksiyon" element={<Catalog />} />
              <Route path="/urun/:slug" element={<ProductDetail />} />
              <Route path="/arama" element={<Search />} />
              <Route path="/sepet" element={<Cart />} />
              <Route path="/odeme" element={<Checkout />} />
              <Route path="/siparis/:id" element={<Confirmation />} />
              <Route path="/favoriler" element={<Favorites />} />
              <Route path="/iletisim" element={<Contact />} />
              <Route path="/hesap" element={<Navigate to="/iletisim" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  );
}

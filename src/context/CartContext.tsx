import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/data/products";
import type { CartItem } from "@/types/product";

const KEY = "kulceler-cart-v1";

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

type Notice = { kind: "add" | "remove" | "error"; message: string } | null;

type CartContextValue = {
  items: CartItem[];
  notice: Notice;
  add: (productId: string, variantId: string, quantity?: number) => boolean;
  setQty: (productId: string, variantId: string, quantity: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);
  const [notice, setNotice] = useState<Notice>(null);

  const persist = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const flash = (n: Notice) => {
    setNotice(n);
    window.setTimeout(() => setNotice(null), 2800);
  };

  const add = useCallback((productId: string, variantId: string, quantity = 1) => {
    const product = getProductById(productId);
    const variant = product?.variants.find((v) => v.id === variantId);
    if (!product || !variant || variant.inventory === "unavailable") {
      flash({ kind: "error", message: "Bu seçenek şu an satın alınamıyor." });
      return false;
    }
    persist(
      (() => {
        const current = load();
        const idx = current.findIndex(
          (i) => i.productId === productId && i.variantId === variantId,
        );
        if (idx >= 0) {
          const copy = [...current];
          copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
          return copy;
        }
        return [...current, { productId, variantId, quantity }];
      })(),
    );
    flash({ kind: "add", message: `${product.name} sepete eklendi.` });
    return true;
  }, []);

  const setQty = useCallback((productId: string, variantId: string, quantity: number) => {
    if (quantity < 1) return;
    persist(
      load().map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i,
      ),
    );
  }, []);

  const remove = useCallback((productId: string, variantId: string) => {
    persist(load().filter((i) => !(i.productId === productId && i.variantId === variantId)));
    flash({ kind: "remove", message: "Ürün sepetten çıkarıldı." });
  }, []);

  const clear = useCallback(() => persist([]), []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const item of items) {
      const product = getProductById(item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant) continue;
      count += item.quantity;
      subtotal += variant.price * item.quantity;
    }
    return { count, subtotal };
  }, [items]);

  const value = useMemo(
    () => ({ items, notice, add, setQty, remove, clear, count, subtotal }),
    [items, notice, add, setQty, remove, clear, count, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

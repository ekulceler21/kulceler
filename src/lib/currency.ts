import { STORE } from "@/data/site";

export function formatMoney(amount: number, currency = STORE.currency) {
  return new Intl.NumberFormat(STORE.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

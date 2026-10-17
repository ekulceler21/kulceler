import { STORE } from "@/data/site";

export function whatsappUrl(text: string) {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function productInquiryMessage(name: string, sku: string) {
  return `Merhaba, ${name} (${sku}) ürünü hakkında ölçü, stok ve fiyat detayı almak istiyorum.`;
}

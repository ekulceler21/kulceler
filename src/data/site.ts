export const STORE = {
  name: "Külçeler",
  tagline: "Marble",
  currency: "TRY" as const,
  locale: "tr-TR",
  phoneDisplay: "0532 275 04 63",
  phoneTel: "+905322750463",
  whatsapp: "905322750463",
  email: "kulcemer@hotmail.com",
  instagramHandle: "kulcelerquartzsink",
  instagramUrl: "https://www.instagram.com/kulcelerquartzsink",
  address: "Zafer, Yavuz Selim Cd. No:4, 20020 Denizli Merkezefendi/Denizli",
  mapsQuery: "Zafer, Yavuz Selim Cd. No:4, 20020 Denizli Merkezefendi/Denizli",
  demoNotice: "",
} as const;

export const NAV_LINKS = [
  { to: "/koleksiyon", label: "Koleksiyon" },
  { to: "/koleksiyon?kategori=Mermer", label: "Mermer" },
  { to: "/koleksiyon?kategori=Traverten", label: "Traverten" },
  { to: "/koleksiyon?kategori=Granit", label: "Granit" },
  { to: "/iletisim", label: "İletişim" },
] as const;

export const SHIPPING_METHODS = [
  {
    id: "showroom",
    name: "Showroom teslim",
    detail: "Denizli showroom’dan teslim. Ücretsiz.",
    price: 0,
  },
  {
    id: "freight",
    name: "Nakliye (teklif)",
    detail: "Ölçü ve güzergâha göre netleşir. Ön izleme tutarı.",
    price: 2500,
  },
] as const;

export const PAYMENT_METHODS = [
  {
    id: "whatsapp",
    name: "WhatsApp ile sipariş",
    detail: "Danışman onayından sonra kesinleşir.",
  },
  {
    id: "transfer",
    name: "Banka havalesi (demo)",
    detail: "Ödeme bilgileri sipariş onayında gösterilir. Gerçek tahsilat yoktur.",
  },
] as const;

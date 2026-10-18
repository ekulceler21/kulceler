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
  demoNotice:
    "Şirketimizin ürettiği kuvars eviyelerimiz, bulunan kuvars markalarının çıktılarını kullanarak 5 parçadan üretilmektedir. Döküm veya benzeri bir yöntem uygulanmamaktadır. Üretmiş olduğumuz kuvars eviyelerimizin dıştan kaplamış olduğumuz yerde polyester esaslı reçine sayesinde kuvars lavabolarımız su sızdırması engellenmiş olup sağlamlığı artırılmıştır. Eviye tabanında, suyun gidere düzgün bir şekilde akmasını sağlamak için gidere doğru bir eğim oluşturduk. Kuvars lavabolarımız 8 yıllık bir Ar-Ge sürecinden geçmiş olup mülkiyet hukuku kapsamında tescillidir. 2018 yılında firmamızın başladığı yerde kuvars eviyelerini sağlam ve emin adımlarla geliştirerek, kayıt Ar-Ge ve test aşamalarını günümüze kadar emin adımlarla devam ettirdik. Daha önce yapılmamış bu üretim tesisi ile devam ettiğimiz kuvars eviyelerimiz, mutfaklarınızda çeşitli renk ve desen seçenekleriyle kuvars tezgahınızdaki şıklık bir bütün oluşturuyor.",
} as const;

export const NAV_LINKS = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/koleksiyon", label: "Koleksiyon" },
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

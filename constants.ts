import type { NavLinkItem, GalleryItem, ServiceItem, TestimonialItem } from './types';

export const palette = {
  background: "#121212",      // Deep Charcoal
  surface: "#1E1E1E",         // Lighter Charcoal for cards
  primary: "#D1B07E",         // Sophisticated Gold
  textPrimary: "#FFFFFF",     // Pure White
  textSecondary: "#A8A8A8",   // Light Gray
  border: "#333333",          // Subtle Border
  white: "#FFFFFF",
  text: "#FFFFFF" // for legacy compatibility
};

export const imagePaths = {
  hero: "assets/hero.jpg",
  about: "assets/about.jpg",
  gallery: [
    "assets/gallery-1.jpg",
    "assets/gallery-2.jpg",
    "assets/gallery-3.jpg",
    "assets/gallery-4.jpg",
    "assets/gallery-5.jpg",
    "assets/gallery-6.jpg",
  ]
};

export const navLinks: NavLinkItem[] = [
  { href: "#home", label: "خانه" },
  { href: "#about", label: "درباره من" },
  { href: "#portfolio", label: "نمونه کارها" },
  { href: "#services", label: "خدمات" },
  { href: "#contact", label: "تماس با ما" },
];

export const galleryItems: GalleryItem[] = [
  { src: imagePaths.gallery[0], title: "غرق در شکلات", tag: "تولد" },
  { src: imagePaths.gallery[1], title: "ورق طلا", tag: "عروسی" },
  { src: imagePaths.gallery[2], title: "سیاره آبرنگی", tag: "هنری" },
  { src: imagePaths.gallery[3], title: "مخمل سرخ", tag: "کلاسیک" },
  { src: imagePaths.gallery[4], title: "انجیر و خامه", tag: "نامزدی" },
  { src: imagePaths.gallery[5], title: "شب طلایی", tag: "جشن ویژه" },
];


export const serviceItems: ServiceItem[] = [
  {
    name: "کیک‌های سفارشی",
    price: "شروع از ۵ میلیون",
    features: ["طراحی منحصر به فرد با توجه به سلیقه شما", "برای تولدها و جشن‌های خاص", "مشاوره برای خلق طعم‌های جدید"],
  },
  {
    name: "کیک‌های عروسی",
    price: "شروع از ۱۸ میلیون",
    features: ["کیک‌های طبقاتی مجلل و هنری", "کریستال‌های شکری دست‌ساز", "هماهنگ با تم مراسم شما"],
  },
  {
    name: "پکیج دسر",
    price: "شروع از ۴ میلیون",
    features: ["انواع کاپ‌کیک و دسر برای تکمیل مراسم شما", "مناسب برای مهمانی‌ها و رویدادها", "حداقل سفارش ۲۰ عدد"],
  },
];

export const testimonialItems: TestimonialItem[] = [
  { name: "هدی و کامران", text: "کیک عروسی ما یک اثر هنری واقعی بود! هم زیبا و هم فوق‌العاده خوش‌طعم. ممنون از فرزین عزیز.", role: "مشتری عروسی" },
  { name: "شرکت پردیس", text: "طراحی کیک برای رویداد شرکتی ما بی‌نظیر بود و همه همکاران را تحت تاثیر قرار داد. کاملا حرفه‌ای و دقیق.", role: "مشتری شرکتی" },
  { name: "نازنین", text: "طعم کیک‌هاشون واقعا عالیه! خلاقیت و کیفیت در بالاترین سطح ممکن. همیشه برای مناسبت‌هام بهشون سفارش میدم.", role: "مشتری تولد" },
];

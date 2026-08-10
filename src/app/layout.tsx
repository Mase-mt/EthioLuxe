import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "../context/ShopContext";
import { StarryBackground } from "../components/StarryBackground";
import { Navbar } from "../components/Navbar";
import { CartDrawer } from "../components/CartDrawer";
import { QuickViewModal } from "../components/QuickViewModal";
import { CheckoutModal } from "../components/CheckoutModal";
import { SearchModal } from "../components/SearchModal";
import { StoryConcierge } from "../components/StoryConcierge";

export const metadata: Metadata = {
  title: "EthioLuxe | Authentic Ethiopian Marketplace & Heritage Collection",
  description: "Discover organic Yirgacheffe coffee, handwoven Habesha Kemis, gourmet Berbere spices, and handcrafted Ethiopian art with cinematic luxury UX/UI.",
  keywords: ["Ethiopian coffee", "Habesha Kemis", "Berbere spice", "Ethiopian market", "Jebena", "Telebirr", "Addis Ababa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#0E0E0D] text-[#F5F5F3] font-sans antialiased selection:bg-amber-400 selection:text-neutral-950" suppressHydrationWarning>
        <ShopProvider>
          <StarryBackground />
          <Navbar />
          <main className="relative z-10 mx-auto max-w-7xl pb-16">
            {children}
          </main>
          <CartDrawer />
          <QuickViewModal />
          <CheckoutModal />
          <SearchModal />
          <StoryConcierge />
        </ShopProvider>
      </body>
    </html>
  );
}

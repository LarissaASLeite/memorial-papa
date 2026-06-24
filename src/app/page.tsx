import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import GuestbookSection from "@/components/GuestbookSection";
import Footer from "@/components/Footer";

/**
 * Memorial page — accessed via QR code on the gravestone.
 * Composed of: Hero · Gallery · Guestbook · Footer
 */
export default function MemorialPage() {
  return (
    <main id="pagina-memorial" className="min-h-screen">
      <HeroSection />
      <GallerySection />
      <GuestbookSection />
      <Footer />
    </main>
  );
}

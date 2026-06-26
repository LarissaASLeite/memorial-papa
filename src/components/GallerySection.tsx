"use client";

import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useGallery } from "@/hooks/useGallery";
import gal1 from "../../public/gallery_1.png";

export default function GallerySection() {
  const { images, loading, error, seedImages } = useGallery();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages = !loading && !error && images.length > 0 
    ? images.map(img => {
        let finalUrl = img.imageUrl;
        if (typeof img.imageUrl === 'string') {
          if (img.imageUrl.startsWith('http') || img.imageUrl.startsWith('/')) {
            finalUrl = img.imageUrl;
          } else {
            finalUrl = gal1;
          }
        }
        return {
          ...img,
          imageUrl: finalUrl
        };
      })
    : seedImages;

  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + displayImages.length) % displayImages.length
      );
    }
  };

  return (
      <section
        id="galeria"
        className="py-16 sm:py-20 flex flex-col items-center w-full"
        style={{ background: "var(--cream-dark)" }}
      >
        <div className="w-full max-w-4xl px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-10">
            <div className="section-divider">
              <Camera
                size={16}
                style={{ color: "var(--stone-light)" }}
                aria-hidden="true"
              />
            </div>
            <h2
              className="font-serif"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                letterSpacing: "0.02em",
              }}
            >
              Galeria de Lembranças
            </h2>
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                letterSpacing: "0.03em",
              }}
            >
              Momentos eternizados com amor
            </p>
          </div>

          {/* Masonry gallery */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 size={32} className="animate-spin" style={{ color: "var(--sage-light)" }} />
            </div>
          ) : (
            <div className="gallery-grid">
              {displayImages.map((img, idx) => (
                <figure
                  key={img.id}
                  className="gallery-item animate-scale-in"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                  title={img.caption || "Foto da galeria"}
                  onClick={() => setLightboxIndex(idx)}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.caption || "Lembrança"}
                    width={600}
                    height={600}
                    className="w-full h-auto"
                    sizes="(max-width: 640px) 46vw, 30vw"
                    quality={85}
                  />
                  <figcaption className="sr-only">{img.caption || "Lembrança"}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && displayImages[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              aria-label="Fechar galeria"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-10 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={40} />
            </button>

            <div className="relative w-full max-w-4xl max-h-[85vh] flex justify-center">
              <Image
                src={displayImages[lightboxIndex].imageUrl}
                alt={displayImages[lightboxIndex].caption || "Lembrança"}
                width={1200}
                height={1200}
                className="object-contain max-h-[85vh] w-auto rounded-md shadow-2xl"
                quality={100}
                priority
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-10 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        )}
      </section>
  );
}

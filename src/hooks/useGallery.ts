"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface GalleryImage {
  id: string;
  imageUrl: string;
  caption?: string;
  createdAt: Timestamp | null;
}

// ─── Seed images shown when Firestore is empty or not yet connected ────────
const SEED_IMAGES: GalleryImage[] = [
  {
    id: "seed-1",
    imageUrl: "/gallery_1.png",
    caption: "O jardim que ele tanto amava",
    createdAt: Timestamp.fromDate(new Date("2023-11-10T10:00:00")),
  },
  {
    id: "seed-2",
    imageUrl: "/gallery_2.png",
    caption: "Momentos de serenidade",
    createdAt: Timestamp.fromDate(new Date("2023-11-09T09:15:00")),
  },
  {
    id: "seed-3",
    imageUrl: "/gallery_3.png",
    caption: "Leveza e beleza",
    createdAt: Timestamp.fromDate(new Date("2023-11-08T14:30:00")),
  },
  {
    id: "seed-4",
    imageUrl: "/gallery_4.png",
    caption: "O caminho que ele percorreu",
    createdAt: Timestamp.fromDate(new Date("2023-11-07T16:45:00")),
  },
  {
    id: "seed-5",
    imageUrl: "/gallery_5.png",
    caption: "Pôr do sol favorito",
    createdAt: Timestamp.fromDate(new Date("2023-11-06T18:20:00")),
  },
  {
    id: "seed-6",
    imageUrl: "/gallery_6.png",
    caption: "Paz e transcendência",
    createdAt: Timestamp.fromDate(new Date("2023-11-05T10:10:00")),
  },
];

export function useGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<GalleryImage, "id">),
        }));
        setImages(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error (gallery):", err);
        setError("Não foi possível carregar as imagens.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { images, loading, error, seedImages: SEED_IMAGES };
}

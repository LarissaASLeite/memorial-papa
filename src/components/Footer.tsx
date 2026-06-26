"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="py-10 px-6 text-center"
      style={{
        background: "var(--cream-dark)",
        borderTop: "1px solid var(--parchment)",
      }}
    >
      {/* Ornamental separator */}
      <p
        className="ornament text-sm tracking-[0.3em] mb-5 opacity-50"
        aria-hidden="true"
      >
        ✦ ✦ ✦
      </p>

      {/* Memorial name */}
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "1.125rem",
          color: "var(--stone)",
          marginBottom: "0.5rem",
        }}
      >
        José Marcos Melo Damasceno Junior
      </p>

      {/* Dates */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          letterSpacing: "0.06em",
          marginBottom: "1.5rem",
        }}
      >
        17 JUL 1967 — 26 ABR 2026
      </p>

      {/* Heart */}
      <Heart
        size={18}
        style={{ color: "var(--sage)", fill: "var(--sage)" }}
        className="mx-auto mb-5 animate-pulse-soft"
        aria-hidden="true"
      />

      {/* Legal note */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          opacity: 0.65,
        }}
      >
        Página memorial criada com amor pela família
      </p>
    </footer>
  );
}

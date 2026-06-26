"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import profilePic from "../../public/memorial_profile.png";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="hero-bg relative flex flex-col items-center justify-center px-6 pt-16 pb-20 text-center overflow-hidden"
    >
      {/* Subtle decorative petals */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-12 -left-12 w-64 h-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(168,197,181,0.6) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-8 w-80 h-80 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(196,168,130,0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Top ornament */}
      <p className="ornament text-lg tracking-[0.35em] mb-8 animate-fade-in opacity-70">
        ✦ in memoriam ✦
      </p>

      {/* Profile photo */}
      <div className="profile-ring animate-float mb-8 animate-scale-in">
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden bg-[var(--cream-dark)]">
          <Image
            src={profilePic}
            alt="Foto de José Marcos Melo Damasceno Junior"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 176px, 208px"
          />
        </div>
      </div>

      {/* Name */}
      <h1
        className="font-serif animate-fade-up delay-200"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2.25rem, 8vw, 3.5rem)",
          fontWeight: 400,
          letterSpacing: "0.02em",
          color: "var(--text-primary)",
          lineHeight: 1.15,
          maxWidth: "22ch",
        }}
      >
        José Marcos Melo Damasceno Junior
      </h1>

      {/* Dates */}
      <p
        className="mt-4 animate-fade-up delay-300"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
          fontWeight: 300,
          color: "var(--stone)",
          letterSpacing: "0.08em",
        }}
      >
        <span className="ornament">✦</span>
        &nbsp;17 de Julho, 1967&nbsp;&nbsp;
        <span style={{ color: "var(--stone-light)" }}>—</span>
        &nbsp;&nbsp;†&nbsp;26 de Abril, 2026
      </p>

      {/* Memorial phrase */}
      <p
        className="mt-8 animate-fade-up delay-400 max-w-xs sm:max-w-sm"
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "clamp(1.1rem, 4.5vw, 1.35rem)",
          fontWeight: 300,
          color: "var(--sage-dark)",
          lineHeight: 1.6,
        }}
      >
        &ldquo;Seu sorriso iluminou cada dia que tivemos juntos.
        Sempre em nossos corações.&rdquo;
      </p>

      {/* Heart icon */}
      <div className="mt-10 animate-fade-up delay-500">
        <Heart
          size={22}
          style={{ color: "var(--sage)", fill: "var(--sage)" }}
          className="animate-pulse-soft mx-auto"
          aria-hidden="true"
        />
      </div>

    </section>
  );
}

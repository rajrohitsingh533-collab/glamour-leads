import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

/* Floating decorative particles (CSS-only, no JS) */
const PARTICLES = [
  { size: 80,  top: "12%", left: "8%",  delay: "0s",   duration: "9s"  },
  { size: 50,  top: "65%", left: "4%",  delay: "2s",   duration: "11s" },
  { size: 100, top: "30%", right: "3%", delay: "1s",   duration: "8s"  },
  { size: 60,  top: "75%", right: "8%", delay: "3.5s", duration: "12s" },
  { size: 35,  top: "50%", left: "18%", delay: "0.5s", duration: "10s" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden gradient-hero pt-16"
    >
      {/* ── Animated gradient blobs ─────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-25 blur-3xl animate-gradient"
        style={{
          background:
            "radial-gradient(circle, #f43f6b 0%, #fda4b5 40%, transparent 70%)",
          backgroundSize: "300% 300%",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #be123d, transparent 65%)",
          animation: "float-slow 10s ease-in-out infinite",
        }}
      />

      {/* ── CSS Particles ───────────────────────────────── */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="particle"
          style={{
            width:  p.size,
            height: p.size,
            top:    p.top,
            left:   (p as any).left  ?? "auto",
            right:  (p as any).right ?? "auto",
            animationDelay:    p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Text column ─────────────────────────────── */}
        <div>
          <span className="section-tag mb-5 inline-block animate-fade-in-up">
            ✨ New 2025 Collection
          </span>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-stone-900 mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Glow Like{" "}
            <span className="text-gradient-animate italic">You&apos;ve</span>
            <br />
            Always{" "}
            <span className="text-gradient-brand">Deserved</span>
          </h1>

          <p
            className="text-lg text-stone-500 leading-relaxed mb-8 max-w-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Luxurious skincare and cosmetics infused with botanical extracts and
            cutting-edge science. Transform your routine, transform your skin.
          </p>

          {/* Star rating */}
          <div
            className="flex items-center gap-2 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-stone-600">
              4.9/5 · Loved by 12,000+ customers
            </span>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a href="#contact" id="hero-cta-primary" className="btn-primary text-base px-7 py-3">
              Claim Free Sample
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#about" id="hero-cta-secondary" className="btn-secondary text-base px-7 py-3">
              Learn More
            </a>
          </div>
        </div>

        {/* ── Image column ─────────────────────────────── */}
        <div
          className="relative flex justify-center animate-fade-in-scale"
          style={{ animationDelay: "0.25s" }}
        >
          {/* Spinning dashed rings */}
          <div
            aria-hidden="true"
            className="absolute w-[420px] h-[420px] rounded-full border-2 border-rose-200/60 border-dashed animate-spin-slow"
          />
          <div
            aria-hidden="true"
            className="absolute w-[360px] h-[360px] rounded-full border border-rose-300/40 border-dotted animate-spin-reverse"
          />

          {/* Main product image — floats */}
          <div className="relative w-72 h-72 sm:w-[340px] sm:h-[340px] rounded-3xl overflow-hidden shadow-2xl animate-pulse-glow img-hover-zoom animate-float">
            <Image
              src="/assets/hero-product.jpeg"
              alt="Glamour Glow hero product — skincare bottles with pink ribbon"
              fill
              sizes="(max-width: 640px) 288px, 340px"
              className="object-cover"
              priority
            />
          </div>

          {/* Floating badge — Rating */}
          <div
            className="absolute -top-4 -right-2 sm:-right-6 card-glass px-4 py-3 flex items-center gap-2 animate-float-delayed"
          >
            <span className="text-rose-500 text-xl">🌸</span>
            <div>
              <p className="text-xs text-stone-400 leading-none">Rating</p>
              <p className="text-sm font-bold text-stone-800">4.9 ★</p>
            </div>
          </div>

          {/* Floating badge — Natural */}
          <div
            className="absolute -bottom-4 -left-2 sm:-left-6 card-glass px-4 py-3 flex items-center gap-2 animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <span className="text-emerald-500 text-xl">🌿</span>
            <div>
              <p className="text-xs text-stone-400 leading-none">Formula</p>
              <p className="text-sm font-bold text-stone-800">100% Natural</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom border */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 fill-white">
          <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}

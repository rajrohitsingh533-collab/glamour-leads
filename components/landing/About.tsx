"use client";
import Image from "next/image";
import { Leaf, FlaskConical, HeartHandshake } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PILLARS = [
  { icon: Leaf, color: "text-emerald-500", bg: "bg-emerald-50", title: "Pure Ingredients", desc: "Every product is crafted from certified organic botanicals sourced from sustainable farms." },
  { icon: FlaskConical, color: "text-violet-500", bg: "bg-violet-50", title: "Science-Backed", desc: "Our formulations are developed by dermatologists and tested for safety and efficacy." },
  { icon: HeartHandshake, color: "text-rose-500", bg: "bg-rose-50", title: "Cruelty-Free", desc: "Never tested on animals. We are certified by PETA and Leaping Bunny." },
];

const STATS = [
  { value: "12K+", label: "Happy Customers" },
  { value: "98%", label: "Natural Ingredients" },
  { value: "5★", label: "Average Rating" },
];

export default function About() {
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section id="about" ref={sectionRef as any} className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left text ──────────────────────────────── */}
          <div>
            <span className="section-tag mb-4 reveal">Our Story</span>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 mt-4 mb-6 leading-tight reveal" style={{ transitionDelay: "0.1s" }}>
              Beauty Born from{" "}
              <span className="text-gradient-brand">Nature&apos;s Wisdom</span>
            </h2>

            <p className="text-stone-500 leading-relaxed mb-4 reveal" style={{ transitionDelay: "0.2s" }}>
              Founded in 2019 by a team of beauty enthusiasts and scientists,
              Glamour Glow started with a simple belief: that skincare should be
              powerful, pure, and kind to the planet.
            </p>
            <p className="text-stone-500 leading-relaxed mb-8 reveal" style={{ transitionDelay: "0.25s" }}>
              Today, our award-winning range of serums, moisturizers, and
              cosmetics have been adopted by over 12,000 women who refuse to
              compromise on quality or conscience.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 reveal" style={{ transitionDelay: "0.35s" }}>
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-rose-50 border border-rose-100 transition-all duration-300 hover:bg-rose-100 hover:shadow-md hover:-translate-y-1 cursor-default"
                >
                  <p className="font-display text-2xl font-bold text-gradient-brand">{stat.value}</p>
                  <p className="text-xs text-stone-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — image + pillars ─────────────────── */}
          <div className="flex flex-col gap-5">
            {/* Brand image with hover zoom */}
            <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-lg img-hover-zoom reveal-right">
              <Image
                src="/assets/about-brand.jpg"
                alt="Glamour Glow brand — luxury perfume with rose petals"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent" />
              <div className="absolute bottom-4 left-4 card-glass px-3 py-2 shadow">
                <p className="text-xs font-semibold text-rose-600">🌹 Botanical Luxury</p>
              </div>
            </div>

            {/* Pillars */}
            <div className="flex flex-col gap-4">
              {PILLARS.map(({ icon: Icon, color, bg, title, desc }, i) => (
                <div
                  key={title}
                  className="card p-5 flex gap-4 items-start reveal"
                  style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                >
                  <span className={`${bg} ${color} p-3 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-stone-800 mb-1">{title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

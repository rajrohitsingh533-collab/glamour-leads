"use client";
import Image from "next/image";
import { Droplets, ShieldCheck, Sun, Zap, Clock, Smile } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BENEFITS = [
  { icon: Droplets,    color: "text-sky-500",     bg: "from-sky-50 to-blue-50",       border: "border-sky-100",     title: "Deep Hydration",          desc: "Hyaluronic acid and ceramides lock in moisture for up to 72 hours, leaving skin plump and supple." },
  { icon: ShieldCheck, color: "text-emerald-500", bg: "from-emerald-50 to-green-50",  border: "border-emerald-100", title: "Skin Barrier Protection", desc: "Fortifies your natural skin barrier against pollution, UV damage, and environmental stressors." },
  { icon: Sun,         color: "text-amber-500",   bg: "from-amber-50 to-yellow-50",   border: "border-amber-100",   title: "Brightening Effect",      desc: "Vitamin C and niacinamide fade dark spots and even out skin tone for a luminous complexion." },
  { icon: Zap,         color: "text-violet-500",  bg: "from-violet-50 to-purple-50",  border: "border-violet-100",  title: "Fast Absorption",         desc: "Our lightweight, non-greasy formula absorbs in seconds — no sticky residue, ever." },
  { icon: Clock,       color: "text-rose-500",    bg: "from-rose-50 to-pink-50",      border: "border-rose-100",    title: "Anti-Aging Formula",      desc: "Retinol and peptides visibly reduce fine lines and wrinkles, turning back the clock naturally." },
  { icon: Smile,       color: "text-orange-500",  bg: "from-orange-50 to-red-50",     border: "border-orange-100",  title: "Dermatologist Tested",    desc: "Safe for all skin types including sensitive skin. Tested and approved by leading dermatologists." },
];

export default function Benefits() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="benefits"
      ref={sectionRef as any}
      className="py-24 gradient-hero overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-tag mb-4 reveal">Why Glamour Glow</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 mt-4 mb-4 leading-tight reveal" style={{ transitionDelay: "0.1s" }}>
            Skin Benefits That{" "}
            <span className="text-gradient-brand">Actually Work</span>
          </h2>
          <p className="text-stone-500 leading-relaxed reveal" style={{ transitionDelay: "0.2s" }}>
            We combine the best of nature and science to deliver real, visible
            results — not empty promises.
          </p>
        </div>

        {/* Full-width product collection image */}
        <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl mb-12 reveal img-hover-zoom">
          <Image
            src="/assets/product-1.jpg"
            alt="Glamour Glow full skincare product collection on marble platform"
            fill
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700"
          />
          {/* Animated overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/50 to-transparent flex items-center px-8 sm:px-12">
            <div>
              <p className="text-white font-display text-2xl sm:text-3xl font-bold mb-2">
                The Complete Collection
              </p>
              <p className="text-white/80 text-sm max-w-xs mb-4">
                Every product crafted for visible results from day one.
              </p>
              <a href="#contact" className="btn-primary text-sm py-2 px-6 inline-flex">
                Get Free Sample
              </a>
            </div>
          </div>
        </div>

        {/* Benefits grid — each card reveals on scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(({ icon: Icon, color, bg, border, title, desc }, i) => (
            <div
              key={title}
              className={`card p-6 bg-gradient-to-br ${bg} border ${border} group reveal`}
              style={{ transitionDelay: `${0.05 + i * 0.08}s` }}
            >
              {/* Icon with scale-on-hover */}
              <span className={`${color} mb-4 block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 origin-left`}>
                <Icon className="w-7 h-7" />
              </span>
              <h3 className="font-semibold text-stone-800 mb-2 text-lg group-hover:text-rose-600 transition-colors duration-200">
                {title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TESTIMONIALS = [
  { name: "Priya Sharma",    location: "Mumbai, India",    avatar: "PS", avatarColor: "from-rose-400 to-pink-500",     rating: 5, review: "I've tried dozens of serums but Glamour Glow's Radiance Serum is on another level. My skin is visibly brighter in just 2 weeks. I'm obsessed!", product: "Radiance Serum" },
  { name: "Amelia Johnson",  location: "New York, USA",    avatar: "AJ", avatarColor: "from-violet-400 to-purple-500", rating: 5, review: "Finally, a moisturizer that doesn't make my sensitive skin break out. The formula is so gentle yet so effective. Worth every penny.", product: "Botanical Moisturizer" },
  { name: "Liu Wei",         location: "Singapore",        avatar: "LW", avatarColor: "from-amber-400 to-orange-500",  rating: 5, review: "The eye cream reduced my dark circles in 10 days. My colleagues keep asking what changed — I look so refreshed and awake now!", product: "Brightening Eye Cream" },
  { name: "Sophie Dupont",   location: "Paris, France",    avatar: "SD", avatarColor: "from-emerald-400 to-teal-500", rating: 5, review: "As a makeup artist, I recommend Glamour Glow to all my clients. The primer is absolutely perfect — smooth canvas, long-lasting hold.", product: "Perfecting Primer" },
  { name: "Kavitha Nair",    location: "Bangalore, India", avatar: "KN", avatarColor: "from-sky-400 to-blue-500",     rating: 5, review: "I love that everything is cruelty-free and uses natural ingredients. The lip balm is my everyday essential — so nourishing!", product: "Botanical Lip Balm" },
  { name: "Maria Gonzalez",  location: "Madrid, Spain",    avatar: "MG", avatarColor: "from-fuchsia-400 to-pink-500", rating: 4, review: "Shipping was super fast and packaging is stunning. The tinting serum gives the most natural, dewy look. Highly recommend!", product: "Tinting Serum" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useScrollReveal();

  /* Duplicate for infinite marquee loop */
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" ref={sectionRef as any} className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-tag mb-4 reveal">Real Reviews</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 mt-4 mb-4 leading-tight reveal" style={{ transitionDelay: "0.1s" }}>
            Loved by Thousands,{" "}
            <span className="text-gradient-brand">Worldwide</span>
          </h2>
          <p className="text-stone-500 reveal" style={{ transitionDelay: "0.2s" }}>
            Join a global community of people who&apos;ve transformed their skincare routines.
          </p>
        </div>

        {/* Serum product banner */}
        <div className="relative w-full h-56 sm:h-72 rounded-3xl overflow-hidden shadow-xl mb-14 reveal img-hover-zoom">
          <Image
            src="/assets/serum-product.jpg"
            alt="Glamour Glow serum tube with cherry blossoms and water drops"
            fill
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-stone-900/50 to-transparent flex items-center justify-end px-8 sm:px-12">
            <div className="text-right">
              <p className="text-white font-display text-xl sm:text-2xl font-bold mb-1">Botanical Serum</p>
              <p className="text-white/75 text-sm">Fresh · Pure · Effective</p>
            </div>
          </div>
        </div>

        {/* ── Auto-scrolling marquee ───────────────────── */}
        <div className="relative mb-16 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex gap-5 animate-marquee w-max" style={{ animationDuration: "40s" }}>
            {doubled.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="card p-6 flex flex-col gap-4 w-80 shrink-0 hover:border-rose-200 hover:-translate-y-2 transition-all duration-300"
              >
                <Quote className="w-6 h-6 text-rose-200 shrink-0" />
                <p className="text-stone-600 text-sm leading-relaxed flex-1">&ldquo;{t.review}&rdquo;</p>
                <div className="border-t border-stone-100 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-800">{t.name}</p>
                      <p className="text-xs text-stone-400">{t.location}</p>
                    </div>
                  </div>
                  <StarRating rating={t.rating} />
                </div>
                <span className="self-start text-xs bg-rose-50 text-rose-500 border border-rose-100 px-2 py-0.5 rounded-full">
                  {t.product}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm reveal" style={{ transitionDelay: "0.3s" }}>
          {["✓ Verified Reviews", "✓ PETA Certified", "✓ Dermatologist Tested", "✓ 30-Day Returns"].map((item) => (
            <span key={item} className="font-medium text-stone-500 hover:text-rose-500 transition-colors cursor-default">
              {item}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

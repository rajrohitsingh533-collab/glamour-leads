"use client";
import { ClipboardList, Package, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  {
    icon: ClipboardList,
    title: "1. Tell Us About Your Skin",
    desc: "Fill out the short form to let us know your skin type and your main concerns, whether it's dryness, aging, or acne.",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100"
  },
  {
    icon: Package,
    title: "2. We Custom-Build Your Kit",
    desc: "Our beauty experts will handpick a complimentary Glamour Glow starter kit specifically matching your unique profile.",
    color: "text-violet-500",
    bg: "bg-violet-50",
    border: "border-violet-100"
  },
  {
    icon: Sparkles,
    title: "3. Glow Away for Free",
    desc: "We ship it straight to your door at absolutely zero cost. Transform your routine and see real results within days.",
    color: "text-sky-500",
    bg: "bg-sky-50",
    border: "border-sky-100"
  }
];

export default function HowItWorks() {
  const sectionRef = useScrollReveal();

  return (
    <section id="how-it-works" ref={sectionRef as any} className="py-24 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag mb-4 reveal">How It Works</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 mt-4 mb-4 leading-tight reveal" style={{ transitionDelay: "0.1s" }}>
            Your Journey to{" "}
            <span className="text-gradient-brand">Radiant Skin</span>
          </h2>
          <p className="text-stone-500 leading-relaxed reveal" style={{ transitionDelay: "0.2s" }}>
            Getting your personalized free sample kit is as easy as 1-2-3.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Decorative connecting line for desktop */}
          <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-stone-200" />

          {STEPS.map((step, i) => (
            <div 
              key={step.title} 
              className="relative flex flex-col items-center text-center reveal"
              style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 border-white ${step.bg} ${step.border} mb-6 shadow-md z-10`}>
                <step.icon className={`w-10 h-10 ${step.color}`} />
              </div>
              <h3 className="font-display font-bold text-xl text-stone-800 mb-3">{step.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

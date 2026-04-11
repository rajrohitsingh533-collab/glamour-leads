"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FAQS = [
  {
    question: "Is the sample kit really 100% free?",
    answer: "Yes! There are no hidden fees, no subscriptions, and we even cover the shipping costs within our regular delivery zones. We believe so strongly in our products that we want you to experience them completely risk-free."
  },
  {
    question: "Are your products cruelty-free and vegan?",
    answer: "Absolutely. We are PETA-certified cruelty-free, and all our formulations are 100% vegan. We never test on animals, and we strictly source ethical, natural ingredients."
  },
  {
    question: "How long will it take for my sample kit to arrive?",
    answer: "Standard shipping takes between 3 to 5 business days after our beauty experts confirm your personalized profile and build your custom kit."
  },
  {
    question: "What if I have sensitive skin?",
    answer: "Our formulations are dermatologist-tested and specifically created to be gentle. When you fill out the form, make sure to select 'Sensitive' under Skin Type, and we will tailor your kit with our most soothing botanical products."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, our free sample kit offer is limited to select regions. Please refer to our shipping policy during the sign-up process to see if your area is covered."
  }
];

export default function FAQ() {
  const sectionRef = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={sectionRef as any} className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4 reveal">
            Frequently Asked <span className="text-gradient-brand">Questions</span>
          </h2>
          <p className="text-stone-500 reveal" style={{ transitionDelay: "0.1s" }}>
            Everything you need to know about the Glamour Glow sample kit.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4 reveal" style={{ transitionDelay: "0.2s" }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className={`card border transition-all duration-300 ${isOpen ? "border-rose-300 bg-rose-50/30" : "border-stone-200 hover:border-rose-200"}`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-semibold text-stone-800 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-rose-500" : ""}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-6 pb-6 text-stone-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

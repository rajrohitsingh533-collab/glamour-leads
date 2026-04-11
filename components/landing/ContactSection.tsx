import Image from "next/image";
import LeadForm from "@/components/landing/LeadForm";
import { Sparkles, Mail, Phone } from "lucide-react";

/**
 * Contact section — wraps the LeadForm with a compelling header
 * and side contact info panel.
 */
export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-tag mb-4">Limited Offer</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 mt-4 mb-4 leading-tight">
            Claim Your{" "}
            <span className="text-gradient-brand">Free Sample Kit</span>
          </h2>
          <p className="text-stone-500 leading-relaxed">
            Fill in your details below and we&apos;ll send you a complimentary
            Glamour Glow starter kit — valued at ₹1,999, completely free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-3 card p-8">
            <LeadForm />
          </div>

          {/* Side info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Product image */}
            <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/product-2.jpg"
                alt="Glamour Glow serum product with flowers"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                🌸 Free Sample Kit Inside
              </span>
            </div>

            {/* What you get */}
            <div className="card p-6 gradient-hero border border-rose-100">
              <h3 className="font-display text-xl font-bold text-stone-800 mb-4">
                What&apos;s in your free kit?
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "🌸 Radiance Serum (5ml sample)",
                  "💧 Deep Hydration Moisturizer (10ml)",
                  "✨ Brightening Eye Cream (3ml)",
                  "🎁 Exclusive 20% discount code",
                  "📖 Personalised skincare guide",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-stone-600"
                  >
                    <span className="mt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div className="card p-6">
              <h3 className="font-semibold text-stone-800 mb-4">
                Questions? Reach us directly
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+911800000000"
                  className="flex items-center gap-3 text-sm text-stone-500 hover:text-rose-500 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-rose-500" />
                  </span>
                  +91 1800 000 000
                </a>
                <a
                  href="mailto:hello@glamourglow.com"
                  className="flex items-center gap-3 text-sm text-stone-500 hover:text-rose-500 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-rose-500" />
                  </span>
                  hello@glamourglow.com
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm text-stone-500 hover:text-rose-500 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                  </span>
                  @glamourglow.beauty
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

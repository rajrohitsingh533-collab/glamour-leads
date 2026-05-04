"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  MessageSquare,
  User,
  ArrowUpRight,
  Sparkles,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Beauty Boulevard", "Mumbai, Maharashtra 400001"],
    accent: "from-rose-500 to-pink-600",
    bgAccent: "bg-rose-50",
    textAccent: "text-rose-500",
    delay: "0.1s",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 1800 000 000", "Mon – Sat, 10am – 7pm"],
    accent: "from-violet-500 to-purple-600",
    bgAccent: "bg-violet-50",
    textAccent: "text-violet-500",
    delay: "0.2s",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@glamourglow.com", "support@glamourglow.com"],
    accent: "from-amber-500 to-orange-600",
    bgAccent: "bg-amber-50",
    textAccent: "text-amber-500",
    delay: "0.3s",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon – Sat: 10:00 AM – 7:00 PM", "Sunday: Closed"],
    accent: "from-emerald-500 to-teal-600",
    bgAccent: "bg-emerald-50",
    textAccent: "text-emerald-500",
    delay: "0.4s",
  },
];

const SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram", href: "#", handle: "@glamourglow.beauty" },
  { icon: Twitter, label: "Twitter", href: "#", handle: "@glamourglow" },
  { icon: Facebook, label: "Facebook", href: "#", handle: "Glamour Glow" },
];

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate sending (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));
    setFormStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact-page" className="contact-page-section">
      {/* ── Decorative background elements ──────────────── */}
      <div className="contact-page-bg-blob contact-page-bg-blob--top" aria-hidden="true" />
      <div className="contact-page-bg-blob contact-page-bg-blob--bottom" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-tag mb-4 inline-block animate-fade-in-up">
            Get In Touch
          </span>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold text-stone-900 mt-4 mb-5 leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            We&apos;d Love to{" "}
            <span className="text-gradient-brand">Hear From You</span>
          </h2>
          <p
            className="text-stone-500 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Have questions about our products, need skincare advice, or want to
            collaborate? Reach out and our beauty experts will get back to you
            within 24 hours.
          </p>
        </div>

        {/* ── Contact Info Cards ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {CONTACT_INFO.map((item) => (
            <div
              key={item.title}
              className="contact-info-card animate-fade-in-up"
              style={{ animationDelay: item.delay }}
            >
              <div className={`contact-info-card__icon ${item.bgAccent}`}>
                <item.icon className={`w-5 h-5 ${item.textAccent}`} />
              </div>
              <h3 className="font-semibold text-stone-800 text-base mb-1">
                {item.title}
              </h3>
              {item.details.map((line) => (
                <p key={line} className="text-sm text-stone-500 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* ── Main Content: Form + Map ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* ── Inquiry Form ─────────────────────────────── */}
          <div
            className="lg:col-span-3 contact-form-card animate-fade-in-left"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-stone-800">
                  Send Us a Message
                </h3>
                <p className="text-xs text-stone-400">
                  We typically respond within a few hours
                </p>
              </div>
            </div>

            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-14 text-center animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center animate-bounce-in">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-800">
                  Message Sent! 💌
                </h3>
                <p className="text-stone-500 max-w-sm text-sm">
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="btn-secondary text-sm mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="form-label">
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-icon-zone">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Jane Doe"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="form-label">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-icon-zone">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="form-label">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-icon-zone">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input appearance-none bg-white cursor-pointer"
                    >
                      <option value="">Choose a topic...</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="skincare-advice">Skincare Advice</option>
                      <option value="order-support">Order Support</option>
                      <option value="collaboration">Brand Collaboration</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="form-label">
                    Your Message <span className="text-rose-400">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-icon-zone">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  id="contact-form-submit"
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="btn-primary w-full mt-1"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right Column: Map + Social ───────────────── */}
          <div
            className="lg:col-span-2 flex flex-col gap-6 animate-fade-in-right"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Embedded Map */}
            <div className="contact-map-wrapper">
              <iframe
                title="Glamour Glow location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="contact-map-overlay">
                <MapPin className="w-5 h-5 text-rose-500" />
                <span className="text-sm font-medium text-stone-700">
                  Mumbai, Maharashtra
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="card p-6">
              <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2">
                <span className="text-lg">✨</span> Connect With Us
              </h3>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link group"
                  >
                    <span className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                      <Icon className="w-4 h-4 text-rose-500" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-700 group-hover:text-rose-600 transition-colors">
                        {label}
                      </p>
                      <p className="text-xs text-stone-400">{handle}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-rose-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Response Badge */}
            <div className="card p-5 gradient-hero border border-rose-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-800 text-sm mb-1">
                    Quick Response Guaranteed
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Our dedicated beauty consultants respond to every inquiry
                    within <strong className="text-stone-700">24 hours</strong>.
                    Urgent queries are handled the same business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",        href: "#about"        },
  { label: "Benefits",     href: "#benefits"     },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews",      href: "#testimonials" },
  { label: "FAQ",          href: "#faq"          },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Apply shadow when page is scrolled down
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo with hidden admin link on the icon */}
        <div className="flex items-center gap-2 group">
          <Link href="/admin" className="p-1.5 rounded-lg gradient-brand cursor-pointer transition-transform hover:scale-105" title="Staff Login">
            <Sparkles className="w-4 h-4 text-white" />
          </Link>
          <Link href="/" className="font-display text-xl font-bold text-gradient-brand cursor-pointer">
            Glamour Glow
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-stone-500 hover:text-rose-500 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a href="#contact" className="hidden md:inline-flex btn-primary text-sm py-2 px-5">
          Get a Free Sample
        </a>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg text-stone-500 hover:text-rose-500 hover:bg-rose-50 transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-rose-100 px-4 py-4 animate-fade-in">
          <ul className="flex flex-col gap-1 mb-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-3 text-sm font-medium text-stone-600 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary w-full text-sm py-2"
          >
            Get a Free Sample
          </a>
        </div>
      )}
    </header>
  );
}

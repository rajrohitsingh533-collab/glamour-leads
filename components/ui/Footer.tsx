import Link from "next/link";
import { Sparkles, Share2, MessageCircle, Globe } from "lucide-react";

const FOOTER_LINKS = [
  { label: "About",        href: "#about"        },
  { label: "Benefits",     href: "#benefits"     },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ",          href: "#faq"          },
  { label: "Privacy Policy", href: "/privacy"    },
];

const SOCIAL_LINKS = [
  { icon: Share2,         href: "#", label: "Instagram" },
  { icon: MessageCircle,  href: "#", label: "Twitter"   },
  { icon: Globe,          href: "#", label: "Facebook"  },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="p-1.5 rounded-lg gradient-brand">
                <Sparkles className="w-4 h-4 text-white" />
              </span>
              <span className="font-display text-xl font-bold text-white">
                Glamour Glow
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400">
              Premium cosmetics crafted with nature&apos;s finest ingredients.
              Reveal your most radiant self.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-rose-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & CTA */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3 mb-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-stone-500">
              Questions?{" "}
              <a
                href="mailto:hello@glamourglow.com"
                className="text-rose-400 hover:underline"
              >
                hello@glamourglow.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Glamour Glow. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-rose-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-rose-400 transition-colors">Terms of Service</a>
            <a href="/refund" className="hover:text-rose-400 transition-colors">Refund Policy</a>
          </div>
          <p className="hidden sm:block">Made with ❤️ for radiant skin</p>
        </div>
      </div>
    </footer>
  );
}

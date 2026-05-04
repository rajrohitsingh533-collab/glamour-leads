import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Benefits from "@/components/landing/Benefits";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import ContactSection from "@/components/landing/ContactSection";

/**
 * Landing page — assembles all landing sections in order.
 * This is a Server Component (no "use client" needed).
 */
export default function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
}

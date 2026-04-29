import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/ui/Chatbot";

export const metadata: Metadata = {
  title: "Glamour Glow — Premium Natural Cosmetics",
  description:
    "Discover luxury skincare and cosmetics made from 100% natural ingredients. Claim your free sample kit today and transform your beauty routine.",
  keywords: ["cosmetics", "skincare", "natural beauty", "organic", "glamour glow"],
  openGraph: {
    title: "Glamour Glow — Premium Natural Cosmetics",
    description: "Claim your free sample kit today!",
    type: "website",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}

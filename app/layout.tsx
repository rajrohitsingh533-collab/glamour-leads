import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Glamour Glow — Premium Natural Cosmetics",
    template: "%s | Glamour Glow",
  },
  description:
    "Luxurious skincare and cosmetics infused with botanical extracts. Transform your routine, transform your skin.",
  openGraph: {
    images: ["/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

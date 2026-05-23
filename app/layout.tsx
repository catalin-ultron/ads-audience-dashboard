import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NXT Ads Audience Dashboard",
  description: "Multi-platform ad audience planning dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#0a0a0f]">{children}</body>
    </html>
  );
}

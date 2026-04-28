import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Poppins, Space_Grotesk } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import VisualEffects from "@/components/VisualEffects";

export const metadata: Metadata = {
  title: "NeTSOFT IT Computer Education",
  description: "Professional IT and programming training institute."
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const logoSrc = `${process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000"}/branding/logo`;

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${spaceGrotesk.variable}`}>
        <VisualEffects />
        <header className="site-header">
          <nav className="container nav-shell">
            <Link href="/" className="brand-wrap">
              <Image src={logoSrc} alt="Netsoft Computer Education" className="brand-logo" width={132} height={58} />
              <span className="brand-text">
                <strong className="brand">Netsoft Computer Education</strong>
                <small>Chitradurga</small>
              </span>
            </Link>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <ThemeToggle />
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "USViral",
    template: "%s · USViral",
  },
  description:
    "The 25 highest-volume US Google searches of the past 24 hours, each with a short blog.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <footer className="colophon">
          <div className="wrap colophon-row">
            <p className="colophon-mark">
              US<em>Viral</em>
            </p>
            <p>
              Original blogs on the 25 biggest US searches of the past 24 hours. Pictures are made
              for USViral. Edition dates follow US Eastern time. Not affiliated with Google.
            </p>
            <p className="colophon-meta">United States · Past 24 hours</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

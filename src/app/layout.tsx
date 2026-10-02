import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Utility Platform — Calculate, Convert, Compare",
    template: "%s | Utility Platform",
  },
  description:
    "Free, instant calculators and converters for everyday problems. No login, no account, no ads by default.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} antialiased bg-surface text-ink min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
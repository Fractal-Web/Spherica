import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const monteserrat = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spherica",
  description: "Spherica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monteserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}

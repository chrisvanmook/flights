import type { Metadata } from "next";
import { ReactNode } from "react";
import { Istok_Web } from "next/font/google";
import "./globals.css";

//  Apparently the closest alternative to Frutiger Neue
const istokWeb = Istok_Web({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Flights",
  description:
    "Check this overview of departures at Amsterdam Airport Schiphol. Save a flight and we will keep you informed of the current departure time",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={istokWeb.className}>{children}</body>
    </html>
  );
}

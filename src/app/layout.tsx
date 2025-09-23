import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EchoPress",
  description: "every voice gets heard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-r from-blue-600 antialiased`}
      >
        <div className="sticky top-0 z-50 mx-20 mt-10">
          <NavBar />
        </div>
        <main className="mx-20 my-10">
          {children}
        </main>
      </body>
    </html>
  );
}

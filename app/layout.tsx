import type { Metadata } from "next";
import { Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { OpenProvider } from "@/context/OpenViewContext";
import { MainBody } from "@/components/MainBody";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Landia Hostel",
  description: "Gestion de l'hotel Landia",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <OpenProvider>
        <MainBody>{children}</MainBody>
      </OpenProvider>
    </html>
  );
}

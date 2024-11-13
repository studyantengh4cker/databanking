import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const kumbh = localFont({
  src: "./fonts/KumbhSans-Black.ttf",
  variable: "--font-kumbh-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Data Banking",
  description: "Created using create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumbh.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

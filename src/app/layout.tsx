import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DevTools } from "@/components/dev/dev-tools";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flik | The fastest way to sell digital goods",
  description:
    "The creator-friendly platform for selling digital products, memberships, and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <DevTools />
        <Toaster />
      </body>
    </html>
  );
}

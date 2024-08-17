import type { Metadata } from "next";
import { Krub } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/QueryProvider";
import { Footer } from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header/Header";
import { Suspense } from "react";
import { SITE_METADATA } from "@/constants";

const krub = Krub({
  weight: ["200", "300", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-krub",
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("relative antialiased", krub.className)}>
        <Suspense>
          <QueryProvider>
            <main className="flex min-h-screen flex-col">
              {/* Header */}
              <Header />

              <div className="flex-1 flex-grow">{children}</div>
              {/* Footer */}
              <Footer />
            </main>
            <Toaster />
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}

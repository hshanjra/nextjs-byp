import type { Metadata } from "next";
import { Krub } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header/Header";

const krub = Krub({
  weight: ["200", "300", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buyurparts - Buy parts for your vehicle.",
  description:
    "Buy auto parts and accessoriesfor your Vehicle | Purchase across hundreds of Brands | Buy Ur Parts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", krub.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          {/* Header */}
          <Header />
          <div className="flex-grow flex-1">{children}</div>
          {/* Footer */}
        </main>
      </body>
    </html>
  );
}

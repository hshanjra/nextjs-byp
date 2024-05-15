import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Buyurparts - Buy parts for your vehicle.",
  description: "Buy auto parts and accessoriesfor your Vehicle | Purchase across hundreds of Brands | Buy Ur Parts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("relative h-full font-sans antialiased", roboto.className)}>
        <main className="relative flex flex-col min-h-screen">
         <div className="flex-grow flex-1">{children}</div>
          </main>
          </body>
    </html>
  );
}

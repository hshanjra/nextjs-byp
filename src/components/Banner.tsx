import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function Banner({
  imgUrl,
  className,
  href,
  children,
}: {
  imgUrl: string;
  className?: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "group relative overflow-hidden p-4 bg-gradient-to-r from-black/30",
          className
        )}
      >
        <Image
          fill
          src={imgUrl}
          alt="Banner"
          className="-z-10 h-full w-full object-cover object-center group-hover:scale-105 transition duration-300 ease-in"
        />
        {children}
      </div>
    </Link>
  );
}

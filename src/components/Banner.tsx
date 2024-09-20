import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

export default function Banner({
  imgUrl,
  className,
  children,
}: {
  imgUrl: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-gradient-to-r from-black/30 p-4",
        className,
      )}
    >
      <Image
        fill
        src={imgUrl}
        sizes="(100vw - 2rem) 100vh"
        alt="Banner"
        className="-z-10 h-full w-full object-cover object-center transition duration-300 ease-in group-hover:scale-105"
      />
      {children}
    </div>
  );
}

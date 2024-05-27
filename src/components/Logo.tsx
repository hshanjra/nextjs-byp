import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className,
  height,
  width,
}: {
  className?: string;
  height?: number;
  width?: number;
}) {
  return (
    <>
      <Link href="/">
        <Image
          src="/images/logo.webp"
          alt="logo"
          height={height ? height : 70}
          width={width ? width : 110}
          className={cn("w-auto h-auto", className)}
          priority={true}
        />
      </Link>
    </>
  );
}

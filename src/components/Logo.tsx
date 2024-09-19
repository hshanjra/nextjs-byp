import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className,
  height = 100,
  width = 120,
  variant = "default",
}: {
  className?: string;
  height?: number;
  width?: number;
  variant?: "default" | "light";
}) {
  switch (variant) {
    case "light":
      return (
        <Link href="/">
          <Image
            src="/static/logo-light.png"
            alt="logo"
            height={height}
            width={width}
            className={cn("h-auto w-auto", className)}
            priority
          />
        </Link>
      );

    default:
      return (
        <Link href="/">
          <Image
            src="/static/logo.png"
            alt="logo"
            height={height}
            width={width}
            className={cn("h-auto w-auto", className)}
            priority
          />
        </Link>
      );
  }
}

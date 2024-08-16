import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src={"/images/error-image.png"}
        alt="Not Found Image"
        height={300}
        width={400}
        className="w-1/2 lg:w-[400px] h-auto lg:mb-10"
      />
      <h1 className="font-bold text-2xl lg:text-[2.5rem] mt-5">
        That Page Can&apos;t Be Found
      </h1>
      <p className="font-thin text-sm mt-3">
        It looks like nothing was found at this location. Maybe try to search
        for what you are looking for?
      </p>
      <Link
        className={cn(buttonVariants({ variant: "default" }), "mt-5")}
        href="/"
      >
        Go To Homepage
      </Link>
    </MaxWidthWrapper>
  );
}

import { Suspense } from "react";
import ThankYou from "./ThankYou";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Logo from "@/components/Logo";
import Link from "next/link";
import { SITE_METADATA } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Thank You | ${SITE_METADATA.title}`,
  description: "Thank You for your order at Buyurparts.com",
};

export default function ThankYouPage() {
  return (
    <Suspense>
      <header className="w-full bg-zinc-100">
        <MaxWidthWrapper className="flex items-center justify-center gap-y-3 py-4">
          <Logo height={70} width={70} />
        </MaxWidthWrapper>
      </header>
      <ThankYou />
      <footer className="absolute -bottom-40 w-full bg-zinc-100 py-10 text-zinc-900">
        <MaxWidthWrapper className="flex items-center justify-between">
          <div>
            &copy; {new Date().getFullYear()} {SITE_METADATA.name}. All rights
            reserved.
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link href={"#"}>Terms of Use</Link>
              </li>
              <li>
                <Link href={"#"}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={"#"}>Refund Policy</Link>
              </li>
            </ul>
          </div>
        </MaxWidthWrapper>
      </footer>
    </Suspense>
  );
}

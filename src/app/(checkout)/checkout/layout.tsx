import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <MaxWidthWrapper className="flex flex-col lg:flex-row items-center justify-between py-4 gap-y-3">
          <Logo height={70} width={70} />

          <div className="flex items-center gap-x-5">
            <div>Cart</div>
            <div>Information</div>
            <div>Finish</div>
          </div>
        </MaxWidthWrapper>
      </header>

      <section> {children}</section>
    </>
  );
}

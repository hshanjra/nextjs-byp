import Banner from "@/components/Banner";
import Breadcrumb from "@/components/Breadcrumb";
import Filters from "@/components/Filters/Filters";
import PartsFinder from "@/components/Filters/PartsFinder";
import LoadingDots from "@/components/LoadingDots";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingDots />}>
      <MaxWidthWrapper>
        {/* Breadcrumb */}
        <section className="my-5">
          <Breadcrumb />
        </section>

        {/* Banner */}
        <Banner
          imgUrl={"/images/banner-31.jpg"}
          className="my-5 w-auto cursor-pointer rounded-lg p-5 text-white lg:p-10"
        >
          <span className="rounded-xl bg-primary px-2 py-1 text-xs font-bold">
            On Sale This Week
          </span>
          <h3 className="my-3 max-w-xl text-3xl font-bold capitalize">
            Get the Right Part at the Right Price for the Comfort of Your
            Vehicle
          </h3>
          <p className="my-2 text-sm text-gray-400 lg:my-5">
            Free delivery for all orders over $200
          </p>
          <div className="flex items-center">
            <span className="text-sm">Shop Now</span>
            <ArrowRight size={15} className="ml-1" />
          </div>
        </Banner>
        <section className="my-10 grid gap-x-5 lg:grid-cols-4">
          {/* Left Side */}
          <div className="hidden lg:block">
            <PartsFinder />
            {/* Filters */}
            <div className="my-5">
              <Suspense>
                <Filters />
              </Suspense>
            </div>
          </div>
          {/* Right Side */}
          <div className="col-span-3">
            {/* Display products here */}
            {children}
          </div>
        </section>
      </MaxWidthWrapper>
    </Suspense>
  );
}

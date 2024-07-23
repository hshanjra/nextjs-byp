import Banner from "@/components/Banner";
import Breadcrumb from "@/components/Breadcrumb";
import Filters from "@/components/Filters/Filters";
import MobileSidebarFilters from "@/components/Filters/MobileSidebarFilters";
import PartsFinder from "@/components/Filters/PartsFinder";
import ProductsHeaderFilter from "@/components/Filters/ProductsHeaderFilter";
import LoadingDots from "@/components/LoadingDots";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      {/* Breadcrumb */}
      <section className="my-5">
        <Breadcrumb />
      </section>

      {/* Banner */}
      <Banner
        imgUrl={"/images/banner-31.jpg"}
        className="my-5 rounded-lg text-white p-5 lg:p-10 w-auto cursor-pointer"
      >
        <span className="px-2 py-1 text-xs font-bold rounded-xl bg-primary">
          On Sale This Week
        </span>
        <h3 className="my-3 text-3xl font-bold capitalize max-w-xl">
          Get the Right Part at the Right Price for the Comfort of Your Vehicle
        </h3>
        <p className="text-sm text-gray-400 my-2 lg:my-5">
          Free delivery for all orders over $200
        </p>
        <div className="flex items-center">
          <span className="text-sm">Shop Now</span>
          <ArrowRight size={15} className="ml-1" />
        </div>
      </Banner>

      {/* Products */}
      <section className="grid lg:grid-cols-4 gap-x-5 my-10">
        {/* Left Side */}
        <div className="hidden lg:block">
          <PartsFinder />

          {/* Filters */}
          <div className="my-5">
            <Suspense fallback={<LoadingDots />}>
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
  );
}

import Banner from "@/components/Banner";
import Breadcrumb from "@/components/Breadcrumb";
import Filters from "@/components/Filters/Filters";
import PartsFinder from "@/components/Filters/PartsFinder";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SITE_METADATA } from "@/constants";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Explore Products at ${SITE_METADATA.name}`,
  description: "Explore wide range of auto parts that fits with your vehicle.",
};

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
        className="my-5 w-auto cursor-pointer rounded-lg p-5 text-white lg:p-10"
      >
        <span className="rounded-xl bg-primary px-2 py-1 text-xs font-bold">
          On Sale This Week
        </span>
        <h3 className="my-3 max-w-xl text-3xl font-bold capitalize">
          Get the Right Part at the Right Price for the Comfort of Your Vehicle
        </h3>
        <p className="my-2 text-sm text-gray-400 lg:my-5">
          Free delivery for all orders over $200
        </p>
        <div className="flex items-center">
          <span className="text-sm">Shop Now</span>
          <ArrowRight size={15} className="ml-1" />
        </div>
      </Banner>

      {/* Products */}
      <section className="my-10 grid gap-x-5 lg:grid-cols-4">
        {/* Left Side */}
        <div className="hidden lg:block">
          <PartsFinder />

          {/* Filters */}
          <Filters />
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

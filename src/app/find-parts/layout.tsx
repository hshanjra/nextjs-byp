import Breadcrumb from "@/components/Breadcrumb";
import Filters from "@/components/Filters/Filters";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { SITE_METADATA } from "@/constants";
import { Filter, Loader2 } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NoSSRSelectedVehicle = dynamic(
  () => import("../../components/Filters/SelectedVehicle"),
  { ssr: false },
);

export const metadata: Metadata = {
  title: `Find Compatible Parts at ${SITE_METADATA.name}`,
  description: "Explore wide range of auto parts that fits with your vehicle.",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      {/* Breadcrumb */}
      <section className="my-5">
        <Breadcrumb />
      </section>

      {/* Selected Vehicle Form */}
      <div>
        <NoSSRSelectedVehicle />
      </div>

      {/* Products */}
      <section className="my-10 grid gap-x-5 lg:grid-cols-4">
        {/* Left Side */}
        <div className="hidden lg:block">
          <h3 className="mb-2 flex items-center gap-2 text-base font-bold uppercase text-gray-500">
            Filters
            <Filter className="size-4 text-gray-500" strokeWidth={3} />
          </h3>
          <Separator />
          {/* Filters */}

          <Filters />
        </div>
        {/* Right Side */}
        <div className="col-span-3">
          {/* Display products here */}
          <Suspense
            fallback={
              <div className="mx-auto mt-10">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <h3 className="text-xl font-semibold">Loading...</h3>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

import Banner from "@/components/Banner";
import MobileSidebarFilters from "@/components/Filters/MobileSidebarFilters";
import PartsFinder from "@/components/Filters/PartsFinder";
import ProductsHeaderFilter from "@/components/Filters/ProductsHeaderFilter";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      {/* Breadcrumb */}
      <section className="my-5">
        <Breadcrumb className="text-xs">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
          Get the latest products on the market and best discounts for you.
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
        </div>
        {/* Right Side */}
        <div className="col-span-3">
          {/* Filters */}
          <div className="hidden lg:block md:block">
            <ProductsHeaderFilter />
          </div>
          {/* Mobile Filters */}
          <div className="block lg:hidden md:hidden">
            <div className="bg-gray-100 p-3 flex items-center justify-between rounded-lg">
              <MobileSidebarFilters />
              <div className="flex items-center gap-x-2">
                <Label htmlFor="sort">Sort:</Label>
                <select
                  name="sort"
                  id="sort"
                  className="bg-transparent text-sm max-w-[140px] outline-none"
                >
                  <option value="popular">Sort by popularity</option>
                  <option value="avgRating">Sort by average rating</option>
                  <option value="latest">Sort by latest</option>
                  <option value="low-to-high">
                    Sort by price: low to high
                  </option>
                  <option value="high-to-low">
                    Sort by price: high to low
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Display products here */}
          {children}
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

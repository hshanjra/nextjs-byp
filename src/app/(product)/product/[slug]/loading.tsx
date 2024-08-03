import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="mx-auto my-10 lg:space-x-7 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
          <section>
            {/* Product Images */}
            <div className="overflow-hidden mb-5">
              <Skeleton className="h-[350px] lg:h-[500px] w-full rounded-xl" />

              {/* Thumbnails */}
              <div className="flex items-center gap-2 mt-3">
                <Skeleton className="h-24 w-24 rounded-xl" />
                <Skeleton className="h-24 w-24 rounded-xl" />
                <Skeleton className="h-24 w-24 rounded-xl" />
              </div>
            </div>

            {/* Compatibility Table */}
            <div className="hidden lg:block">
              <div className="mt-5 border rounded-xl overflow-hidden">
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </section>
          {/* Product Info */}
          <div>
            <div className="flex flex-col gap-1 lg:gap-2">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-1/2 h-8" />
            </div>

            <div className="flex items-center gap-1 lg:gap-2 mt-5">
              {/* Review / SKU */}

              <Skeleton className="w-52 h-8" />
            </div>
            {/* Price */}
            <div className="flex my-5 items-end gap-x-2">
              <Skeleton className="w-36 h-8" />
            </div>
            {/* Short Description */}
            <div className="my-5">
              <Skeleton className="w-1/2 h-8" />
            </div>

            {/* Qty / Add to cart */}
            <div className="hidden my-3 lg:flex items-center space-x-3">
              {/* Counter */}
              <Skeleton className="w-48 h-8" />
            </div>

            {/* Add to favorites */}
            <div className="my-5 flex items-center justify-between">
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-24 h-8" />
            </div>

            {/* Contact Seller Goes */}
            <div className="rounded-lg">
              <Skeleton className="w-full h-24" />
            </div>

            {/* Marketing Icons  */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-7 mt-5">
              <div className="flex items-center gap-x-2">
                <Skeleton className="w-48 h-16" />
              </div>
              <div className="flex items-center gap-x-2">
                <Skeleton className="w-48 h-16" />
              </div>
              <div className="flex items-center gap-x-2">
                <Skeleton className="w-48 h-16" />
              </div>
              <div className="flex items-center gap-x-2">
                <Skeleton className="w-48 h-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}

        <section className="my-10 flex items-center gap-1 lg:gap-3">
          <Skeleton className="h-32 w-32 lg:h-56 lg:w-56 rounded-xl" />
          <Skeleton className="h-32 w-32 lg:h-56 lg:w-56 rounded-xl" />
          <Skeleton className="h-32 w-32 lg:h-56 lg:w-56 rounded-xl" />
          <Skeleton className="hidden lg:block h-32 w-32 lg:h-56 lg:w-56 rounded-xl" />
        </section>
      </MaxWidthWrapper>
    </>
  );
}

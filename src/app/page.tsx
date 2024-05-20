import { getProducts } from "@/actions/products-action";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FeaturedProducts from "@/components/Products/FeaturedProducts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <MaxWidthWrapper>
        <section className="mx-auto text-center h-96 grid lg:grid-cols-4 bg-red-400">
          <div className="hidden col-span-1 bg-gray-300 lg:block"></div>
          <div className="col-span-full bg-gray-200 lg:col-span-3 mx-3 h-full">
            Slider section
          </div>
        </section>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        {/* Featured Products */}
        <FeaturedProducts />
      </MaxWidthWrapper>
    </HydrationBoundary>
  );
}

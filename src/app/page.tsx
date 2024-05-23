import MainSlider from "@/components/MainSlider";
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
    queryFn: async () => await fetch("/api/products"),
  });
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      {/* Slider */}
      <MainSlider />

      <MaxWidthWrapper>
        {/* Featured Products */}
        <FeaturedProducts />
      </MaxWidthWrapper>
    </HydrationBoundary>
  );
}

import Banner from "@/components/Banner";
import LatestDeals from "@/components/LatestDeals";
import MainSlider from "@/components/MainSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FeaturedProducts from "@/components/Products/FeaturedProducts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";

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

        {/* Banners */}

        <section className="grid lg:grid-cols-3 gap-x-5 gap-y-5 text-white my-10">
          <Banner
            imgUrl="/images/banner-01.jpg"
            className="h-56 w-auto rounded-lg cursor-pointer"
            href="#"
          >
            <span className="px-2 py-1 text-xs font-semibold rounded-xl bg-primary">
              On Sale This Week
            </span>
            <h3 className="my-3 text-2xl font-bold max-w-60 capitalize">
              The World&apos;s Best Engine Oils for Your Car
            </h3>
          </Banner>
          <Banner
            imgUrl="/images/banner-02.jpg"
            className="h-56 w-auto rounded-lg cursor-pointer"
            href="#"
          >
            <span className="px-2 py-1 text-xs font-semibold rounded-xl bg-primary">
              On Sale This Week
            </span>
            <h3 className="my-3 text-2xl font-bold max-w-60 capitalize">
              Change tires for winter to ensure your safety.
            </h3>
          </Banner>
          <Banner
            imgUrl="/images/banner-03.jpg"
            className="h-56 w-auto rounded-lg cursor-pointer"
            href="#"
          >
            <span className="px-2 py-1 text-xs font-semibold rounded-xl bg-primary">
              On Sale This Week
            </span>
            <h3 className="my-3 text-2xl font-bold max-w-60 capitalize">
              unlish the true potential of your vehicle
            </h3>
          </Banner>
        </section>

        {/* Latest Deals */}
        <section className="my-10">
          <LatestDeals />
        </section>
      </MaxWidthWrapper>
    </HydrationBoundary>
  );
}

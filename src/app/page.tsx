import Banner from "@/components/Banner";
import LatestDeals from "@/components/LatestDeals";
import MainSlider from "@/components/MainSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FeaturedProducts from "@/components/Products/FeaturedProducts";
import ProductsShowcase from "@/components/Products/ProductsShowcase";
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
            <span className="text-sm">Shop Now</span>
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
            <span className="text-sm">Shop Now</span>
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
            <span className="text-sm">Shop Now</span>
          </Banner>
        </section>

        {/* Latest Deals */}
        <section className="my-10">
          <LatestDeals />
        </section>

        {/* Discount Coupon */}
        <section className="relative overflow-hidden flex flex-col lg:flex-row items-center justify-between border border-dashed p-8 border-primary bg-primary/5 rounded-lg space-x-8 my-10">
          <div className="flex flex-col lg:flex-row items-center space-x-10">
            <h5 className="text-4xl text-primary font-bold">-49$</h5>
            <div className="text-center lg:text-left">
              <h6 className="text-primary text-xl font-semibold">
                Super discount on your first purchase
              </h6>
              <p className="text-xs text-muted-foreground">
                Use <b>SAVEUPTO49</b> at checkout to avail the offer.
              </p>
            </div>
          </div>

          <h1 className="-z-20 select-none font-semibold text-primary text-9xl scale-150 absolute right-[25%] opacity-10">
            -49$
          </h1>

          <h3 className="text-primary text-xl font-bold font-roboto">
            SAVEUPTO49
          </h3>
        </section>

        {/* Products Showcase */}
        <ProductsShowcase />

        <section className="grid lg:grid-cols-2 gap-x-5 gap-y-5 text-white my-10">
          {/* Banner 04  */}

          <Banner
            imgUrl="/images/banner-05.jpg"
            className="h-72 p-7 w-full rounded-lg cursor-pointer"
            href="#"
          >
            <span className="px-2 py-1 text-xs font-semibold rounded-xl bg-primary">
              On Sale This Week
            </span>
            <h3 className="my-3 text-3xl font-bold max-w-96 leading-snug capitalize">
              Genuine auto parts you can find at affordable prices.
            </h3>
            <p className="text-xs text-white/85 font-thin mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              itaque.
            </p>
            <span className="text-sm">Shop Now &rarr;</span>
          </Banner>

          {/* Banner 05 */}

          <Banner
            imgUrl="/images/banner-06.jpg"
            className="h-72 p-7 w-auto rounded-lg cursor-pointer"
            href="#"
          >
            <span className="px-2 py-1 text-xs font-semibold rounded-xl bg-primary">
              On Sale This Week
            </span>
            <h3 className="my-3 text-3xl font-bold max-w-96 leading-snug capitalize">
              Wide range of genuine auto parts at premium pricing
            </h3>
            <p className="text-xs text-white/85 font-thin mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              itaque.
            </p>
            <span className="text-sm">Shop Now &rarr;</span>
          </Banner>
        </section>
      </MaxWidthWrapper>
    </HydrationBoundary>
  );
}

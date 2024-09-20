import Banner from "@/components/Banner";
import LatestDeals from "@/components/Products/LatestDeals";
import MainSlider from "@/components/MainSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FeaturedProducts from "@/components/Products/FeaturedProducts";
import LatestDealsSection from "@/components/Products/LatestDealsSection";
import ProductsShowcase from "@/components/Products/ProductsShowcase";
import TopCategories from "@/components/TopCategories";
import CustomerReviewsSection from "@/components/CustomerReviewsSection";

export default async function Home() {
  return (
    <>
      {/* Slider */}
      <MainSlider />

      <MaxWidthWrapper>
        {/* Featured Products */}
        <FeaturedProducts />

        {/* Banners */}

        <section className="my-10 grid gap-x-5 gap-y-5 text-white lg:grid-cols-3">
          <Banner
            imgUrl="/images/banner-01.jpg"
            className="h-56 w-auto cursor-pointer"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-60 text-2xl font-bold capitalize">
              The World&apos;s Best Engine Oils for Your Car
            </h3>
            <span className="text-sm">Shop Now</span>
          </Banner>
          <Banner
            imgUrl="/images/banner-02.jpg"
            className="h-56 w-auto cursor-pointer"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-60 text-2xl font-bold capitalize">
              Change tires for winter to ensure your safety.
            </h3>
            <span className="text-sm">Shop Now</span>
          </Banner>
          <Banner
            imgUrl="/images/banner-03.jpg"
            className="h-56 w-auto cursor-pointer"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-60 text-2xl font-bold capitalize">
              Know the true potential of your vehicle
            </h3>
            <span className="text-sm">Shop Now</span>
          </Banner>
        </section>

        {/* Latest Deals */}
        <section className="my-10">
          <LatestDeals />
        </section>

        {/* Discount Coupon */}
        <section className="relative my-10 flex flex-col items-center justify-between space-x-8 overflow-hidden rounded-lg border border-dashed border-primary bg-primary/5 p-8 lg:flex-row">
          <div className="flex flex-col items-center space-x-10 lg:flex-row">
            <h5 className="text-4xl font-bold text-primary">-49$</h5>
            <div className="text-center lg:text-left">
              <h6 className="text-xl font-semibold text-primary">
                Super discount on your first purchase
              </h6>
              <p className="text-xs text-muted-foreground">
                Use <b>SAVEUPTO49</b> at checkout to avail the offer.
              </p>
            </div>
          </div>

          <h1 className="absolute right-[25%] -z-20 scale-150 select-none text-9xl font-semibold text-primary opacity-10">
            -49$
          </h1>

          <h3 className="font-roboto text-xl font-bold text-primary">
            SAVEUPTO49
          </h3>
        </section>

        {/* Products Showcase */}
        <ProductsShowcase />

        <section className="my-10 grid gap-x-5 gap-y-5 text-white lg:grid-cols-2">
          {/* Banner 04  */}

          <Banner
            imgUrl="/images/banner-05.jpg"
            className="h-72 w-full cursor-pointer rounded-lg p-7"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-96 text-3xl font-bold capitalize leading-snug">
              Genuine auto parts you can find at affordable prices.
            </h3>
            <p className="mb-5 text-xs font-thin text-white/85">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              itaque.
            </p>
            <span className="text-sm">Shop Now &rarr;</span>
          </Banner>

          {/* Banner 05 */}

          <Banner
            imgUrl="/images/banner-06.jpg"
            className="h-72 w-auto cursor-pointer rounded-lg p-7"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-96 text-3xl font-bold capitalize leading-snug">
              Wide range of genuine auto parts at premium pricing
            </h3>
            <p className="mb-5 text-xs font-thin text-white/85">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              itaque.
            </p>
            <span className="text-sm">Shop Now &rarr;</span>
          </Banner>
        </section>

        {/* Latest Deals */}
        <LatestDealsSection />

        {/* Banner 07 */}
        <section className="my-10 text-white">
          <Banner
            imgUrl="/images/banner-07.jpg"
            className="h-72 w-auto cursor-pointer rounded-lg p-7"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-xl text-3xl font-bold capitalize leading-snug">
              Get the right part at the right price for the comfort of your
              vehicle
            </h3>
            <p className="mb-5 text-xs font-thin text-white/85">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              itaque.
            </p>
            <span className="text-sm">Shop Now &rarr;</span>
          </Banner>
        </section>

        {/* Top Categories */}
        <TopCategories />

        {/* Banners */}
        <section className="my-10 grid gap-x-5 gap-y-5 lg:grid-cols-3">
          <Banner
            imgUrl="/images/banner-08.jpg"
            className="h-56 w-auto cursor-pointer bg-gradient-to-r from-transparent"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold text-white">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-60 text-2xl font-bold capitalize">
              Proud supplier of quality vehicles
            </h3>
            <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet.</p>
            <span className="text-sm font-semibold">Shop Now &rarr;</span>
          </Banner>
          <Banner
            imgUrl="/images/banner-09.jpg"
            className="h-56 w-auto cursor-pointer bg-gradient-to-r from-transparent"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold text-white">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-60 text-2xl font-bold capitalize">
              Your trusted car parts store
            </h3>
            <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet.</p>
            <span className="text-sm font-semibold">Shop Now &rarr;</span>
          </Banner>
          <Banner
            imgUrl="/images/banner-10.jpg"
            className="cursor-pointers h-56 w-auto bg-gradient-to-r from-transparent"
          >
            <span className="rounded-xl bg-primary px-2 py-1 text-xs font-semibold text-white">
              On Sale This Week
            </span>
            <h3 className="my-3 max-w-60 text-2xl font-bold capitalize">
              Different type of tires available
            </h3>
            <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet.</p>
            <span className="text-sm font-semibold">Shop Now &rarr;</span>
          </Banner>
        </section>

        {/* Customer Reviews */}
        <CustomerReviewsSection />
      </MaxWidthWrapper>
    </>
  );
}

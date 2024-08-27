"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

interface sContent {
  p: string;
  h1: string;
  topTxt: string;
  price: string;
  discountedPrice: string;
  image: {
    url: string;
    alt: string;
  };
  href: string;
}

const sliderContent: sContent[] = [
  {
    topTxt: "This Week Only for World Premier",
    h1: "When Buying Parts With Installation",
    image: {
      url: "/images/slider-01.jpg",
      alt: "slider-1",
    },
    p: "Installation of parts in the services of, our partners. Limited time offer for only new customer, also get free shipping on orders.",
    price: "$179.00",
    discountedPrice: "$159.00",
    href: "#",
  },
  {
    topTxt: "Get The Best Auto Parts",
    h1: "We Make Car Repair Hassle Free",
    image: {
      url: "/images/slider-02.jpg",
      alt: "slider-2",
    },
    p: "Installation of parts in the services of, our partners. Limited time offer for only new customer, also get free shipping on orders.",
    discountedPrice: "",
    price: "",
    href: "",
  },
  {
    topTxt: "This Week Only for World Premier",
    h1: "We Have The Parts You Need",
    image: {
      url: "/images/slider-03.jpg",
      alt: "slider-2",
    },
    p: "Installation of parts in the services of, our partners. Limited time offer for only new customer, also get free shipping on orders.",
    discountedPrice: "$159.00",
    price: "$179.00",
    href: "",
  },
];

export default function MainSlider() {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (sliderContent.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (sliderContent.length ?? 0) - 1,
      });
    });
  }, [swiper]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center bg-white";

  const inactiveStyles = "hidden text-gray-400";
  return (
    <MaxWidthWrapper className="mt-5 h-96 lg:h-[550px]">
      <section className="mx-auto grid h-full px-0 py-1 lg:grid-cols-4 lg:pl-5">
        <div className="hidden bg-transparent lg:col-span-1 lg:block"></div>
        <div className="group relative col-span-full aspect-video h-full w-full overflow-hidden rounded-xl border bg-zinc-100 lg:col-span-3">
          <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                swiper?.slideNext();
              }}
              className={cn(activeStyles, "right-0 transition", {
                [inactiveStyles]: slideConfig.isEnd,
                "h-14 rounded-l-lg bg-white px-2 opacity-100":
                  !slideConfig.isEnd,
              })}
              aria-label="next image"
            >
              <ChevronRight className="h-4 w-4 text-black" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                swiper?.slidePrev();
              }}
              className={cn(activeStyles, "left-0 transition", {
                [inactiveStyles]: slideConfig.isBeginning,
                "h-14 rounded-r-lg bg-white px-2 opacity-100":
                  !slideConfig.isBeginning,
              })}
              aria-label="previous image"
            >
              <ChevronLeft className="h-4 w-4 text-black" />
            </button>
          </div>
          {/* Swiper */}
          <Swiper
            pagination={{
              renderBullet: (_, className) => {
                return `<span class="rounded-full transition ${className}"></span>`;
              },
            }}
            onSwiper={(swiper) => setSwiper(swiper)}
            className="main-slider h-full w-full"
            spaceBetween={50}
            modules={[Pagination]}
            slidesPerView={1}
          >
            {sliderContent?.map((content, i) => (
              <SwiperSlide key={i} className="relative w-full lg:h-full">
                <Image
                  src={content?.image.url}
                  fill
                  sizes="(100vw - 2rem) 100vh"
                  alt={content?.image.alt}
                  loading="eager"
                  className="-z-10 h-full w-full object-cover object-center"
                />
                {/* Slider Content */}
                <div className="h-full bg-gradient-to-r from-black/40 backdrop-invert backdrop-opacity-10">
                  <div className="flex h-full max-w-md flex-col justify-center space-y-2 p-7 px-10 text-white lg:max-w-xl lg:space-y-5">
                    <p className="capitalize">{content.topTxt}</p>
                    <h1 className="text-2xl font-bold capitalize leading-9 md:text-3xl md:leading-loose lg:text-5xl lg:leading-[4rem]">
                      {content.h1}
                    </h1>
                    <p className="text-sm capitalize text-gray-300">
                      {content.p}
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="text-xl text-gray-300">
                        <s>{content.price}</s>
                      </h3>
                      <h2 className="text-3xl font-semibold">
                        {content.discountedPrice}
                      </h2>
                    </div>
                    {/* CTA */}
                    <Link href={content.href}>
                      <Button>Buy Now</Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

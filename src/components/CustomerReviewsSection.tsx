"use client";
import { Star, UserRound } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CustomerReviews = [
  {
    name: "Teresa Holland",
    designation: "Business Manager",
    rating: 5,
    comment:
      "Astropons intimitetskoordinator podiktigt. Egons nytons. Intrapomiheten krofyl. Lalanade bedade i vatreng e-krona.",
    imgUrl: "/images/avatar-03.jpg",
  },
  {
    name: "Jessica Lindstorm",
    designation: "Sales Manager",
    rating: 5,
    comment:
      "Astropons intimitetskoordinator podiktigt. Egons nytons. Intrapomiheten krofyl. Lalanade bedade i vatreng e-krona.",
    imgUrl: "/images/avatar-02.jpg",
  },
  {
    name: "Scarlett Edwards",
    designation: "Sales Manager",
    rating: 5,
    comment:
      "Astropons intimitetskoordinator podiktigt. Egons nytons. Intrapomiheten krofyl. Lalanade bedade i vatreng e-krona.",
    imgUrl: "/images/avatar-04.jpg",
  },
  {
    name: "Tina Macdonell",
    designation: "Sales Manager",
    rating: 5,
    comment:
      "Astropons intimitetskoordinator podiktigt. Egons nytons. Intrapomiheten krofyl. Lalanade bedade i vatreng e-krona.",
    imgUrl: "/images/avatar-01.jpg",
  },
];

export default function CustomerReviewsSection() {
  return (
    <section className="mb-10 space-y-10">
      <div className="flex flex-col items-center justify-center">
        <h3 className="mb-3 text-2xl font-semibold">What our customers say</h3>
        <p className="text-center text-sm text-zinc-500">
          Sagt väsade. Nun. Sms-anställning muna. Nihuktiga fande. El. Bett
          tegisk. Speplangen åde.
          <br /> Gigara megadesade gevis. Sulig klimatsmart. Besam gosening.
        </p>
      </div>

      {/* Reviews Slider */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          // @ts-ignore
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex items-center gap-5 sm:gap-20">
          {CustomerReviews.map((r, i) => (
            <CarouselItem
              key={r.name + i}
              className="basis-1/1 md:basis-1/2 lg:basis-1/3"
            >
              <CustomerReviewCard
                name={r.name}
                rating={r.rating}
                designation={r.designation}
                comment={r.comment}
                imgUrl={r.imgUrl}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export const CustomerReviewCard = ({
  name,
  designation,
  rating,
  comment,
  imgUrl,
}: {
  name: string;
  designation: string;
  rating: number;
  comment: string;
  imgUrl?: string;
}) => {
  return (
    <div className="flex w-full max-w-xs flex-col items-center justify-center gap-3 sm:max-w-md sm:flex-row sm:items-start">
      {/* Img */}
      {imgUrl ? (
        <Image
          src={imgUrl}
          height={100}
          width={100}
          alt="Avatar"
          className="size-20 min-w-fit rounded-full"
        />
      ) : (
        <UserRound
          className="h-20 min-w-fit rounded-full border"
          strokeWidth={1}
        />
      )}

      <div className="flex flex-col items-center sm:items-start">
        {/* Create stars loop for rating */}
        <div className="flex items-center">
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              size={13}
              strokeWidth={1}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        <div className="my-1 text-center sm:text-left">
          <h3 className="mb-0 text-base font-semibold">{name}</h3>
          <p className="text-xs text-zinc-400">{designation}</p>
        </div>

        <p className="line-clamp-3 text-wrap text-center text-sm text-zinc-500 sm:text-left">
          {comment}
        </p>
      </div>
    </div>
  );
};

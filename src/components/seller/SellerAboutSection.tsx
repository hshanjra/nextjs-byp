import { getSellerStoreInfo } from "@/actions/SellerStoreAction";
import {
  calculatePositiveFeedbackPercentage,
  cn,
  formatDate,
} from "@/lib/utils";
import { Calendar, Clock, StoreIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import SellerFeedbackSection from "./SellerFeedbackSection";

async function SellerAboutSection({ storeSlug }: { storeSlug: string }) {
  const store = await getSellerStoreInfo(storeSlug);

  if (!store) return;

  return (
    <section className="my-10 rounded-xl bg-zinc-100 p-5">
      <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
        <div className="flex flex-col items-center lg:flex-row lg:gap-5">
          {/* Store Logo */}
          {store?.businessLogoURL ? (
            <Image
              src={store?.businessLogoURL}
              alt="Profile"
              width={150}
              height={150}
              className="mr-3 mt-3 object-cover object-center mix-blend-multiply sm:mr-0 sm:mt-0"
            />
          ) : (
            <StoreIcon size={50} />
          )}

          <div className="flex flex-col">
            <Link
              href={`/seller/${store?.storeSlug}`}
              className="hover:underline"
            >
              <h3 className="mb-2 font-roboto text-3xl font-semibold">
                {store?.displayName}
              </h3>
            </Link>

            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {calculatePositiveFeedbackPercentage(store.averageSellerRating)}
                {"% "}
                positive feedback
              </span>
              {/* <span className="text-sm font-semibold">171K items sold</span> */}
            </div>
          </div>
        </div>
        {/* Store Buttons */}
        <div className="flex w-full flex-col gap-3 lg:w-auto">
          <Link
            href={`/seller/${store?.storeSlug}`}
            className={cn(
              buttonVariants({ variant: "success" }),
              "w-full rounded-full lg:w-44",
            )}
          >
            Visit Store
          </Link>
          <Link
            href={"#"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full rounded-full lg:w-44",
            )}
          >
            Contact Seller
          </Link>
        </div>
      </div>

      {/* Joined/Response time */}
      <div className="mt-5 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Calendar size={16} />
          <p className="text-sm">Joined {formatDate(store?.createdAt!)}</p>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} />
          <p className="text-sm">Usually responds within 24 hours</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-8">
        {/* Left side */}
        <div className="col-span-3">
          {/* About */}
          <p className="font-roboto text-[15px] font-medium capitalize">
            {store?.aboutSeller}
          </p>
        </div>
        {/* Right side */}
        <div className="col-span-5">
          {/* Seller Feedback */}
          <div className="my-5 flex items-center gap-1">
            <h3 className="font-roboto text-xl font-bold" id="sellerReviews">
              Seller Feedback
            </h3>
            <span className="text-muted-foreground">
              ({store?.sellerReviewsCount})
            </span>
          </div>

          {/* Feedback */}
          <SellerFeedbackSection store={store} />
        </div>
      </div>
    </section>
  );
}

export default SellerAboutSection;

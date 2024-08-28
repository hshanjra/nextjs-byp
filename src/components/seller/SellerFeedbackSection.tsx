"use client";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Feedback, Product } from "@/types/product";

function SellerFeedbackSection({ store }: { store: Product["merchant"] }) {
  const feedbacks: Feedback[] = store?.sellerReviews || [];

  return (
    <div className="flex flex-col gap-5">
      {feedbacks.map((feedback, i) => (
        <div key={i}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Badge
                variant={
                  feedback.merchantRating >= 2 ? "success" : "destructive"
                }
                className="mr-3 rounded-full px-2"
              >
                +
              </Badge>
              <h5 className="text-sm font-semibold">
                {feedback.user.firstName.charAt(0)}** **
                {feedback.user.lastName.charAt(0)}
              </h5>
              <span className="text-xs text-gray-400">
                {formatDate(feedback.createdAt)}
              </span>
            </div>
            <span className="text-xs text-gray-400">Verified purchase</span>
          </div>

          {/* Review */}
          <p className="my-5 font-roboto">{feedback.merchantComment}</p>
          <Separator />
        </div>
      ))}

      {/* See all button */}
      <Link
        href={`/seller/${store?.storeSlug}#feedback`}
        className={cn(
          buttonVariants({ variant: "success", size: "lg" }),
          "mx-auto my-10 rounded-full font-bold",
        )}
      >
        See all reviews
      </Link>
    </div>
  );
}

export default SellerFeedbackSection;

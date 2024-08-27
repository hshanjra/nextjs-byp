"use client";

import { GetProductReviews } from "@/actions/ProductsAction";
import { useQuery } from "@tanstack/react-query";
import { Loader2, User } from "lucide-react";
import ReviewStar from "./ReviewStar";
import { formatDate } from "@/lib/utils";

interface ReviewListProps {
  slug: string;
}
export const ReviewsList = ({ slug }: ReviewListProps) => {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: [slug],
    queryFn: async () => GetProductReviews(slug),
  });

  if (reviews?.reviewsCount === 0)
    return (
      <div className="my-10 text-center text-sm text-gray-500">
        No reviews available for this product.
      </div>
    );

  if (error || reviews?.error)
    return (
      <div className="my-10 text-center text-sm text-gray-500">
        Sorry, we are unable to load reviews at this time. Please refresh the
        page or try again later
      </div>
    );

  if (isLoading)
    return (
      <div className="my-10">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
      </div>
    );

  return (
    <div>
      {reviews?.reviews?.map((review: any) => <ReviewItem review={review} />)}
    </div>
  );
};
export const ReviewItem = ({ review }: { review: any }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-full bg-zinc-200 p-2">
        <User className="h-12 w-12" strokeWidth={0.5} />
      </div>
      <div className="flex flex-col gap-1">
        <ReviewStar rating={review?.productRating} height={20} />

        <div className="flex items-center gap-2">
          <h5 className="text-base font-semibold">{`${review?.user.firstName} ${review?.user.lastName}`}</h5>
          -
          <span className="text-xs font-normal text-gray-400">
            {formatDate(review?.createdAt)}
          </span>
        </div>

        <p className="text-base font-normal text-gray-700">
          {review?.productComment}
        </p>
      </div>
    </div>
  );
};

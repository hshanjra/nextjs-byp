"use client";
import { GetReviews } from "@/actions/ProductsAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Feedback } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

function SellerComments({ sellerId }: { sellerId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", sellerId],
    queryFn: async () => await GetReviews({ sellerId: sellerId }),
  });

  //   TODO: add infinite scroll

  if (isLoading) {
    return (
      <div className="mx-auto my-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || data?.error) {
    return (
      <div className="my-10 text-center text-sm text-gray-400">
        Unable to get reviews at the moment.
      </div>
    );
  }

  const reviews: Feedback[] = data?.reviews || [];

  return (
    <div className="flex flex-col gap-5">
      {reviews.map((review, i) => (
        <Comment key={i} review={review} />
      ))}

      {isLoading ? (
        <div className="mx-auto my-10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Button
          variant={"success"}
          size={"lg"}
          className="mx-auto my-10 rounded-full font-bold"
        >
          Load more reviews
        </Button>
      )}
    </div>
  );
}

export default SellerComments;

export const Comment = ({ review }: { review: Feedback }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Badge
            variant={review.merchantRating > 3 ? "success" : "destructive"}
            className="mr-3 rounded-full px-2"
          >
            {review.merchantRating > 3 ? "+" : "-"}
          </Badge>
          <h5>
            {review?.user.firstName.charAt(0)}**{" "}
            {review?.user.lastName.charAt(0)}**
          </h5>
          <span className="text-xs text-gray-400">
            {formatDate(review?.createdAt)}
          </span>
        </div>
        <span className="text-xs text-gray-400">Verified purchase</span>
      </div>

      {/* Review */}
      <p className="my-5">{review?.merchantComment}</p>

      <Separator className="my-2" />
    </div>
  );
};

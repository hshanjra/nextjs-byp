import { Product } from "@/types/product";
import Link from "next/link";
import ProductSlider from "./ProductSlider";
import { cn, formatPrice, trimString } from "@/lib/utils";
import ReviewStar from "../ReviewStar";
import { Package } from "lucide-react";
import AddToCartButton from "../Cart/AddToCartButton";
import { useStore } from "@/store/store";
import QtyButtons from "../Cart/QtyButtons";

export default function ProductHoverInfoCard({
  product: p,
}: {
  product: Product;
}) {
  return (
    // max-w-[400px] md:max-w-[170px] lg:max-w-[230px]
    <div className="group relative">
      <div className="space-y-2 rounded-t-xl bg-white p-2 lg:group-hover:border">
        <Link href={"/product/" + p.productSlug}>
          <ProductSlider images={p.productImages} />

          <h5 className="my-3 overflow-hidden text-clip text-[0.87rem] font-semibold leading-4 transition hover:text-red-600">
            {trimString(p.productTitle, 45)}
          </h5>
        </Link>
        {/* Review */}
        {p.reviewCount && p.reviewCount > 0 ? (
          <div className="flex flex-col gap-1 lg:inline-block">
            <ReviewStar
              rating={p?.averageRating || 4}
              height={20}
              fontsize={19}
            />
            <span className="text-xs font-semibold lg:ml-2">
              {p.reviewCount} Review(s)
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-1 lg:inline-block">
            <ReviewStar rating={0} height={20} fontsize={19} />
            {/* <span className="text-xs font-semibold lg:ml-2">
              No Reviews Yet
            </span> */}
          </div>
        )}

        {/* Price */}
        <div className="flex space-x-2">
          <span className="font-light text-gray-400">
            <s>{formatPrice(p.regularPrice)}</s>
          </span>
          <span className="text-xl font-semibold text-primary">
            {formatPrice(p.salePrice)}
          </span>
        </div>

        {/* Stock */}
        <div className="mt-3 flex items-center">
          <Package
            size={17}
            strokeWidth={1}
            className={cn({
              "text-successDark": p?.productStock > 0,
              "text-red-500": p?.productStock <= 0,
            })}
          />
          {p.productStock > 0 ? (
            <span className="ml-2 text-xs font-semibold text-successDark">
              In Stock
            </span>
          ) : (
            <span className="ml-2 text-xs font-semibold text-red-500">
              Out of Stock
            </span>
          )}
        </div>

        {/* Add to cart button for mobile */}

        <AddToCartButton
          className="!w-full bg-primary p-2 lg:hidden"
          size={25}
          strokeWidth={1.5}
          product={p}
          disabled={p.productStock <= 0}
          showQtyButtons={false}
        />

        {/* Hover Area */}
        <div className="absolute left-0 z-50 hidden w-full rounded-b-lg border bg-white p-2 shadow-2xl lg:group-hover:block">
          {/* Short description */}
          <div
            dangerouslySetInnerHTML={{ __html: p.shortDescription }}
            className="short-description my-3 px-3 !text-xs"
          />

          <AddToCartButton
            className="!w-full bg-primary"
            product={p}
            disabled={p.productStock <= 0}
            showQtyButtons={false}
          />
        </div>
      </div>
    </div>
  );
}

import { Product } from "@/types/product";
import Link from "next/link";
import { cn, formatPrice, trimString } from "@/lib/utils";
import ReviewStar from "../ReviewStar";
import { Package } from "lucide-react";
import ProductSlider from "./ProductSlider";
import AddToCartSmall from "../Cart/AddToCartSmall";
import { Badge } from "../ui/badge";

export default async function ProductCard({
  product: p,
}: {
  product: Product;
}) {
  if (!p) return;

  const discountPercent = Math.round(
    ((p.regularPrice - p.salePrice) / p.regularPrice) * 100,
  );

  return (
    <>
      <div className="relative w-full lg:px-1">
        <Link href={"/product/" + p.productSlug}>
          <ProductSlider images={p.productImages} />

          {/* Discount Badge */}
          {discountPercent > 3 && (
            <Badge className="absolute left-4 top-3 z-10 rounded-lg px-1.5">
              <p className="text-xs font-semibold">{discountPercent}%</p>
            </Badge>
          )}

          <h5 className="my-3 line-clamp-2 overflow-hidden text-wrap text-[0.87rem] font-semibold leading-4 transition hover:text-red-600">
            {p.productTitle}
          </h5>
        </Link>

        {/* Review */}
        {p.reviewCount && p.reviewCount > 0 ? (
          <div className="inline-block">
            <ReviewStar
              rating={p?.averageRating || 4}
              height={20}
              fontsize={19}
            />
            <span className="ml-2 text-xs font-medium">
              {p.reviewCount} Review(s)
            </span>
          </div>
        ) : null}

        <div className="flex">
          {/* Price */}
          <div className="flex flex-col">
            <span className="font-light text-gray-400">
              <s>{formatPrice(p.regularPrice)}</s>
            </span>
            <span className="text-xl font-semibold text-primary">
              {formatPrice(p.salePrice)}
            </span>
          </div>
          {/* Cart Icon Button */}

          <AddToCartSmall
            className="ml-auto"
            strokeWidth={1.2}
            size={30}
            product={p}
            disabled={p.productStock <= 0}
          />
        </div>
        {/* Stock */}
        <div className="mt-1 flex items-center">
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
      </div>
    </>
  );
}

import { IProduct } from "@/types/Product";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { formatPrice, trimString } from "@/lib/utils";
import ReviewStar from "../ReviewStar";
import AddToCartButton from "../AddToCartButton";
import { Package } from "lucide-react";
import ProductSlider from "./ProductSlider";

export default function ProductCard({ product: p }: { product: IProduct }) {
  if (p) {
    return (
      <>
        <div className="max-w-[230px] px-1">
          <Link href={"/product/" + p.productSlug}>
            {/* <Card className="h-[230px]"> */}
            {/* Images Slider */}
            <ProductSlider images={p.productImages} />
            {/* TODO:make slider */}
            {/* <Image
                src={p.productImages[0].url}
                alt={p.productTitle}
                width={200}
                height={200}
                className="w-full h-full"
              /> */}
            {/* </Card> */}
            <h5 className="text-[0.87rem] my-3 font-semibold transition hover:text-red-600 text-clip overflow-hidden leading-4">
              {trimString(p.productTitle, 45)}
            </h5>
          </Link>
          {/* Review */}
          <div className="inline">
            <ReviewStar rating={5} />
            <span className="text-xs font-semibold -ml-2">1 Review</span>
          </div>
          <div className="flex">
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-gray-400 font-light">
                <s>{formatPrice(p.regularPrice)}</s>
              </span>
              <span className="text-primary font-semibold text-xl">
                {formatPrice(p.salePrice)}
              </span>
            </div>
            {/* Cart Icon Button */}
            <AddToCartButton className="ml-auto" strokeWidth={2} />
          </div>
          {/* Stock */}
          <div className="flex items-center mt-3">
            <Package size={17} strokeWidth={1} className="text-successDark" />
            <span className="font-semibold text-xs ml-2 text-successDark">
              In Stock
            </span>
          </div>
        </div>
      </>
    );
  } else {
    return;
  }
}

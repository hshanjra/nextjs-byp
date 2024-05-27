import { IProduct } from "@/types/Product";
import Link from "next/link";
import ProductSlider from "./ProductSlider";
import { formatPrice, trimString } from "@/lib/utils";
import ReviewStar from "../ReviewStar";
import { Package } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductHoverInfoCard({
  product: p,
}: {
  product: IProduct;
}) {
  return (
    <div className="relative group max-w-[130px] md:max-w-[170px] lg:max-w-[230px]">
      <div className="p-2 space-y-2 group-hover:rounded-t-xl group-hover:border bg-white">
        <Link href={"/product/" + p.productSlug}>
          <ProductSlider images={p.productImages} />

          <h5 className="text-[0.87rem] my-3 font-semibold transition hover:text-red-600 text-clip overflow-hidden leading-4">
            {trimString(p.productTitle, 45)}
          </h5>
        </Link>
        {/* Review */}
        <div className="inline-block">
          <ReviewStar rating={5} height={20} fontsize={19} />
          <span className="text-xs font-semibold -ml-2">1 Review</span>
        </div>

        {/* Price */}
        <div className="flex space-x-2">
          <span className="text-gray-400 font-light">
            <s>{formatPrice(p.regularPrice)}</s>
          </span>
          <span className="text-primary font-semibold text-xl">
            {formatPrice(p.salePrice)}
          </span>
        </div>

        {/* Stock */}
        <div className="flex items-center mt-3">
          <Package size={17} strokeWidth={1} className="text-successDark" />
          <span className="font-semibold text-xs ml-2 text-successDark">
            In Stock
          </span>
        </div>

        {/* Hover Area */}
        <div className="absolute bg-white z-50 hidden group-hover:block rounded-b-lg shadow-2xl border left-0 p-2 w-full">
          {/* Short description */}
          <div className="text-xs my-3 px-3">
            {p.shortDescription}
            <ul className="space-y-1">
              <li className="list-disc">
                Best-in-class all-around performance
              </li>
              <li className="list-disc">
                Confident driving in all weather conditions
              </li>
              <li className="list-disc">Visual Alignment Indicators</li>
            </ul>
          </div>
          <Button className="w-full">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}

import { getProductBySlug } from "@/actions/ProductsAction";
import Breadcrumb from "@/components/Breadcrumb";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ImageCarousel from "@/components/Products/ImageCarousel";
import ReviewStar from "@/components/ReviewStar";
import { Separator } from "@/components/ui/separator";
import { cn, formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const { product, error } = await getProductBySlug(params.slug);

  if (!product || error) {
    // TODO: throw internal server error
    return;
  }

  return (
    <>
      <MaxWidthWrapper>
        {/* Breadcrumb */}
        <section className="my-4">
          <Breadcrumb />
        </section>
        <div className="mx-auto my-3 lg:space-x-7 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <div className="overflow-hidden">
            <ImageCarousel images={product.productImages} />
          </div>
          {/* Product Info */}
          <div>
            <h1 className="leading-[1.2] font-bold text-[calc(1.375rem+1.5vw)]">
              {product?.productTitle}
            </h1>

            <div className="flex items-center gap-1 lg:gap-2">
              {/* Review / SKU */}
              <div className="flex items-center">
                <ReviewStar rating={4} height={28} />
                <span className="font-semibold text-xs lg:text-sm -ml-2">
                  {1} customer review
                </span>
              </div>

              <Separator orientation="vertical" className="h-5" />
              <span className="uppercase text-muted-foreground text-[0.8125rem] font-medium">
                Part No: {product?.partNumber}
              </span>

              {/* Stock */}
              <div
                className={cn(
                  "flex items-center px-2 py-1 rounded-sm",
                  { "bg-green-200/35": product?.productStock > 0 },
                  { "bg-red-200/35": product?.productStock <= 0 }
                )}
              >
                <Package
                  size={17}
                  strokeWidth={1}
                  className={cn({
                    "text-successDark": product?.productStock > 0,
                    "text-red-500": product?.productStock <= 0,
                  })}
                />
                {product.productStock > 0 ? (
                  <span className="font-semibold text-xs ml-2 text-successDark">
                    In Stock
                  </span>
                ) : (
                  <span className="font-semibold text-xs ml-2 text-red-500">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
            {/* Price */}
            <div className="flex my-5 items-end gap-x-2">
              <h3 className="text-2xl text-gray-400">
                <s>{formatPrice(product?.regularPrice)}</s>
              </h3>
              <h3 className="text-primary text-3xl font-semibold">
                {formatPrice(product?.salePrice)}
              </h3>
            </div>
            {/* Short Description */}
            <div className="my-5">
              <h5 className="text-sm text-gray-400 font-normal">
                {product?.longDescription}
              </h5>
            </div>
            <Separator />
            {/* Qty / Add to cart */}
            <div className="hidden my-3 lg:block">
              {/* Counter */}
              <AddToCartButton strokeWidth={2} product={product} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      {/* Qty/Cart - Mobile */}
      <div className="lg:hidden p-4 fixed bottom-0 bg-white w-full z-30">
        {/* Counter */}
        <AddToCartButton strokeWidth={2} product={product} />
      </div>
    </>
  );
};

export default ProductDetailPage;

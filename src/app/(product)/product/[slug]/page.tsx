import { getProductBySlug } from "@/actions/ProductsAction";
import Breadcrumb from "@/components/Breadcrumb";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ReviewStar from "@/components/ReviewStar";
import { Separator } from "@/components/ui/separator";
import { useGetProductBySlug } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  // TODO: use react query here
  // const { data, isLoading, error } = useGetProductBySlug(params.slug);

  // if (isLoading)
  //   return (
  //     // return skeleton
  //     <div>Loading...</div>
  //   );

  // if (error) return <div>Error: {error.message}</div>;

  const product: Product = await getProductBySlug(params.slug);

  return (
    product && (
      <>
        <MaxWidthWrapper>
          {/* Breadcrumb */}
          <section className="my-5">
            <Breadcrumb />
          </section>
          <div className="mx-auto lg:space-x-5 max-w-2xl py-2 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
            {/* Product Images */}
            <div className="border rounded-lg m-auto overflow-hidden">
              <Image
                src={product!.productImages[0].url}
                alt={product!.productTitle}
                height={800}
                width={800}
                className="m-auto p-10"
              />
            </div>
            {/* Product Info */}
            <div>
              <h1 className="leading-tight font-bold">
                {product?.productTitle}
              </h1>

              <div className="flex items-center justify-between max-w-md">
                {/* Review / SKU */}
                <div className="flex items-center">
                  <ReviewStar rating={4} height={30} />
                  <span className="font-semibold text-sm">
                    {1} customer review
                  </span>
                  <Separator orientation="vertical" className="h-5 mx-2" />
                  <span className="uppercase text-muted-foreground text-[0.8125rem] font-medium">
                    Part No: {product?.partNumber}
                  </span>
                </div>
                <div className="flex items-center bg-green-200/35 px-2 py-1 rounded-sm">
                  {/* Stock */}
                  <Package
                    size={17}
                    strokeWidth={1}
                    className="text-successDark"
                  />
                  <span className="font-semibold text-xs ml-2 text-successDark">
                    In Stock
                  </span>
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
    )
  );
};

export default ProductDetailPage;

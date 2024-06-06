"use client";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ReviewStar from "@/components/ReviewStar";
import { Separator } from "@/components/ui/separator";
import { intApi } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}
const BREADCRUMBS = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  // TODO: add category
  {
    id: 2,
    name: "Products",
    href: "/products",
  },
];

const ProductDetailPage = ({ params }: ProductPageProps) => {
  const { slug } = params;
  const { data, isLoading, error } = useQuery({
    queryKey: ["Product", slug],
    queryFn: async () => (await intApi.get(`/products?slug=${slug}`)).data,
  });

  if (isLoading)
    return (
      // return skeleton
      <div>Loading...</div>
    );

  if (error) return <div>Error: {error.message}</div>;

  const product = data as Product;

  return (
    <>
      <MaxWidthWrapper>
        {/* Breadcrumb */}
        <div className="py-2">
          <ol className="flex items-center space-x-1">
            {BREADCRUMBS.map((b, i) => (
              <li key={b.href}>
                <div className="flex items-center text-sm">
                  <Link
                    href={b.href}
                    className="font-medium text-sm text-gray-300 hover:text-gray-900"
                  >
                    {b.name}
                  </Link>
                  {i !== BREADCRUMBS.length - 1 ? (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  ) : null}
                </div>
              </li>
            ))}
            <li>
              <div className="flex items-center text-sm">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span>{product?.productTitle}</span>
              </div>
            </li>
          </ol>
        </div>
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
            <h1 className="leading-tight font-bold">{product?.productTitle}</h1>

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
  );
};

export default ProductDetailPage;

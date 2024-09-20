import { getAllProducts, getProductBySlug } from "@/actions/ProductsAction";
import Breadcrumb from "@/components/Breadcrumb";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import CompatibleMessage from "@/components/CompatibleMessage";
import AddReviewForm from "@/components/Forms/AddReviewForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ImageCarousel from "@/components/Products/ImageCarousel";
import ProductReel from "@/components/Products/ProductReel";
import ReviewStar from "@/components/ReviewStar";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SITE_METADATA } from "@/constants";
import {
  calculatePositiveFeedbackPercentage,
  cn,
  formatPrice,
} from "@/lib/utils";
import {
  Check,
  DollarSignIcon,
  Flame,
  Headset,
  Heart,
  IterationCcw,
  Package,
  PhoneOutgoing,
  Store,
  StoreIcon,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";
import ScrollAwareContainer from "@/components/ScrollAwareContainer";
import { ReviewsList } from "@/components/Reviews";
import SellerAboutSection from "@/components/seller/SellerAboutSection";
import NotFound from "@/app/not-found";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const { product, error } = await getProductBySlug(params.slug);

  if (product === undefined) {
    return <Loading />;
  }

  if (error || product === null) {
    return <NotFound />;
  }

  const { products: relatedProducts, totalCount } = await getAllProducts({
    limit: 10,
    category: product.categoryId.categorySlug,
  });

  return (
    <>
      <MaxWidthWrapper>
        {/* Breadcrumb */}
        <section className="my-4">
          <Breadcrumb />
        </section>
        <div className="mx-auto my-3 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:space-x-7">
          <div>
            {/* Product Images */}
            <div className="overflow-hidden">
              <ImageCarousel images={product.productImages} />
            </div>

            {/* Compatibility Table */}
            <div className="hidden lg:block">
              <div className="mt-5 overflow-hidden rounded-xl border">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold">Year</TableCell>
                      <TableCell>2012, 2013, 2014, 2015, 2016</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-bold">Make</TableCell>
                      <TableCell>BMW</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">Model</TableCell>
                      <TableCell>x50, x80</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-bold">Sub Model</TableCell>
                      <TableCell>2012, 2013, 2014, 2015, 2016</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="my-2 from-gray-400 text-center text-sm">
                List of all compatible makes and models.
              </p>
            </div>
          </div>
          {/* Product Info */}
          <div>
            <h1 className="text-[calc(1.375rem+1.5vw)] font-bold leading-[1.2]">
              {product?.productTitle}
            </h1>

            <div className="flex items-center gap-1 lg:gap-4">
              {/* Review / SKU */}
              <Link href="#reviews">
                {/* Review */}
                {product.reviewCount && product.reviewCount > 0 ? (
                  <div className="flex items-center gap-x-1">
                    <ReviewStar
                      rating={product?.averageRating || 4}
                      height={28}
                    />
                    <span className="text-xs font-semibold lg:text-sm">
                      {product?.reviewCount}{" "}
                      {product?.reviewCount > 1 ? "Reviews" : "Review"}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-1">
                    <ReviewStar rating={0} height={28} />
                    <span className="text-xs font-semibold lg:text-sm">
                      No Reviews Yet
                    </span>
                  </div>
                )}
              </Link>

              <Separator orientation="vertical" className="h-5" />
              <span className="text-[0.8125rem] font-medium uppercase text-muted-foreground">
                Part No: {product?.partNumber}
              </span>

              {/* Stock */}
              <div
                className={cn(
                  "flex items-center rounded-md px-2 py-1",
                  { "bg-green-200/35": product?.productStock > 0 },
                  { "bg-red-200/35": product?.productStock <= 0 },
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

            {/* Low stock alert for mobile */}
            {/* FIXME: fit this */}
            {/* <div className="mt-5 w-48">
              {product.productStock <= 5 && product.productStock !== 0 && (
                <div className="flex items-center justify-between gap-2 rounded-2xl bg-zinc-100 px-3 py-2 lg:hidden">
                  <Flame
                    strokeWidth={1}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  <div className="flex flex-col">
                    <p className="text-[10px] text-gray-400">
                      This item is low in stock.
                    </p>
                    <p className="text-xs font-semibold text-primary">
                      item(s) left: {product.productStock}
                    </p>
                  </div>
                </div>
              )}
            </div> */}

            {/* Price */}
            <div className="my-5 flex items-end gap-x-2">
              <h3 className="text-2xl text-gray-400">
                <s>{formatPrice(product?.regularPrice)}</s>
              </h3>
              <h3 className="text-3xl font-semibold text-primary">
                {formatPrice(product?.salePrice)}
              </h3>
            </div>
            {/* Short Description */}
            <div className="short-description my-5">
              <div
                dangerouslySetInnerHTML={{ __html: product?.shortDescription }}
              />
            </div>

            <Separator className="mt-10" />
            {/* Qty / Add to cart */}
            {product.productStock > 0 && (
              <div className="my-3 hidden items-center space-x-2 lg:flex">
                {/* Counter */}
                <AddToCartButton strokeWidth={2} product={product} />

                {/* Low stock alert */}
                {product.productStock <= 5 && product.productStock !== 0 && (
                  <div className="flex h-[2.875rem] items-center justify-between gap-2 rounded-2xl bg-zinc-100 px-3">
                    <Flame
                      strokeWidth={1}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <div className="flex flex-col">
                      <p className="text-[10px] text-gray-400">
                        This item is low in stock.
                      </p>
                      <p className="text-xs font-semibold text-primary">
                        item(s) left: {product.productStock}
                      </p>
                    </div>
                  </div>
                )}

                {/* Compatibility Message */}
                {/* <CompatibleMessage isCompatible={true} /> */}
              </div>
            )}

            {/* Add to favorites */}
            <div className="my-5 flex items-center justify-between">
              <p className="text-xs">
                Did you like this product? Add to favorites now and follow the
                product.
              </p>
              <span className="cursor-pointer rounded-xl border bg-gray-100 p-2 transition duration-200 hover:bg-red-100 hover:text-primary">
                <Heart size={20} strokeWidth={1.2} />
              </span>
            </div>

            {/* Contact Seller Goes */}
            <div className="flex w-full flex-col items-start space-y-4 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-400 sm:flex-row sm:space-x-6 sm:space-y-0">
              <div className="flex w-full justify-center sm:w-auto sm:justify-start">
                {/* Business Logo */}
                {product?.merchant?.businessLogoURL ? (
                  <Image
                    src={product?.merchant?.businessLogoURL}
                    alt="Profile"
                    width={70}
                    height={70}
                    className="mr-3 mt-3 rounded-full border object-cover object-center mix-blend-multiply sm:mr-0 sm:mt-0"
                  />
                ) : (
                  <StoreIcon size={50} />
                )}
              </div>
              <div className="flex w-full flex-col items-start">
                <p className="mx-auto mb-2 flex items-center gap-1 font-semibold text-black lg:mx-0">
                  {product.merchant?.displayName}
                  <Link
                    href="#sellerReviews"
                    className="text-sm font-normal italic text-gray-500"
                  >
                    ({product?.merchantReviewCount}{" "}
                    {product?.merchantReviewCount! > 1 ? "reviews" : "review"})
                  </Link>
                </p>
                <div className="mb-2 flex items-center gap-1 text-gray-500">
                  <p className="flex items-center gap-1 text-sm font-bold">
                    <ThumbsUp size={18} />
                    {calculatePositiveFeedbackPercentage(
                      product?.merchantAverageRating!,
                    )}
                    {"% "}
                    Positive
                  </p>
                  <Separator orientation="vertical" className="h-5" />
                  <Link
                    href={`/seller/${product?.merchant?.storeSlug}`}
                    className="flex items-center gap-1 text-sm font-bold hover:text-red-500"
                  >
                    <Store size={18} />
                    Visit Seller Store
                  </Link>
                  <Separator orientation="vertical" className="h-5" />
                  <Link
                    href="/"
                    className="flex items-center gap-1 text-sm font-bold hover:text-red-500"
                  >
                    <PhoneOutgoing size={18} />
                    Contact Seller
                  </Link>
                </div>
              </div>
            </div>

            {/* Marketing Icons  */}
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-7">
              <div className="flex items-center gap-x-2">
                <span className="rounded-full border p-2">
                  <DollarSignIcon />
                </span>
                <p className="flex flex-col text-sm font-semibold">
                  Low prices
                  <span className="text-xs font-normal text-gray-500">
                    Price match guarantee
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="rounded-full border p-2">
                  <Check />
                </span>
                <p className="flex flex-col text-sm font-semibold">
                  Guaranteed Fitment.
                  <span className="text-xs font-normal text-gray-500">
                    Always the correct part
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="rounded-full border p-2">
                  <Headset />
                </span>
                <p className="flex flex-col text-sm font-semibold">
                  In-House Experts.
                  <span className="text-xs font-normal text-gray-500">
                    We know our products
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="rounded-full border p-2">
                  <IterationCcw />
                </span>
                <p className="flex flex-col text-sm font-semibold">
                  Easy Returns.
                  <span className="text-xs font-normal text-gray-500">
                    Quick & Hassle Free
                  </span>
                </p>
              </div>
            </div>

            <Separator className="mt-10" />

            {/* Category / Product Id */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex flex-col items-start lg:flex-row lg:items-center">
                <span className="mr-1 text-sm font-light text-gray-400">
                  Category:
                </span>
                <ul className="flex list-none items-center gap-x-[2px] text-sm">
                  <li>
                    <Link
                      href={`/categories/${product.categoryId.categorySlug}`}
                      className="hover:text-red-500"
                    >
                      {product.categoryId.categoryName}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-start lg:flex-row lg:items-center">
                <span className="mr-1 text-sm font-light text-gray-400">
                  Product ID:
                </span>
                <p className="text-sm">{product.productId}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Description/Reviews Tabs */}
        <section className="my-10">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="justify-start bg-transparent lg:mb-2">
              <TabsTrigger
                value="description"
                className="bg-transparent p-0 text-sm font-medium text-gray-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none lg:pr-1 lg:text-lg"
              >
                Description
              </TabsTrigger>

              <Separator
                orientation="vertical"
                className="mx-1 h-4 bg-gray-300"
              />

              <TabsTrigger
                value="additional-info"
                className="bg-transparent px-1 text-sm font-medium text-gray-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none lg:text-lg"
              >
                Additional Info
              </TabsTrigger>

              <Separator
                orientation="vertical"
                className="mx-1 h-4 bg-gray-300"
              />
              <TabsTrigger
                value="reviews"
                id="reviews"
                className="bg-transparent px-1 text-sm font-medium text-gray-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none lg:text-lg"
              >
                Reviews
                <p className="ml-1 text-sm">({product?.reviewCount || 0})</p>
              </TabsTrigger>
              <Separator
                orientation="vertical"
                className="mx-1 h-4 bg-gray-300"
              />
              <TabsTrigger
                value="qna"
                className="bg-transparent p-0 text-sm font-medium text-gray-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none lg:pl-1 lg:text-lg"
              >
                Q&A
              </TabsTrigger>
            </TabsList>
            <Separator className="h-[0.5px]" />

            <TabsContent
              value="description"
              className="my-2 font-light text-gray-700"
            >
              <h3 className="my-3 text-2xl font-semibold text-black">
                Item Description from the Seller
              </h3>{" "}
              <div
                dangerouslySetInnerHTML={{ __html: product?.longDescription }}
                className="long-description"
              />
            </TabsContent>
            <TabsContent value="additional-info">
              <div className="mt-5 max-w-lg overflow-hidden rounded-xl border">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold">Year</TableCell>
                      <TableCell>2012, 2013, 2014, 2015, 2016</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-bold">Make</TableCell>
                      <TableCell>BMW</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">Model</TableCell>
                      <TableCell>x50, x80</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-bold">Sub Model</TableCell>
                      <TableCell>2012, 2013, 2014, 2015, 2016</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="my-2 from-gray-400 text-center text-sm">
                List of all compatible makes and models.
              </p>
            </TabsContent>
            <TabsContent value="reviews">
              <div>
                {product?.reviewCount && product?.reviewCount > 0 ? (
                  <h3 className="my-3 text-xl font-semibold text-black">
                    {product?.reviewCount || 0}{" "}
                    {product?.reviewCount > 1 ? "Reviews" : "Review"} for{" "}
                    {product.productTitle}
                  </h3>
                ) : null}
                <ReviewsList slug={product.productSlug} />
              </div>

              <AddReviewForm />
            </TabsContent>

            <TabsContent value="qna">
              <h3 className="my-3 text-2xl font-semibold text-black">
                Questions and Answers
              </h3>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related products */}
        {relatedProducts && (
          <section>
            <h3 className="text-xl font-bold">Related Products</h3>
            <Separator className="my-5" />
            <ProductReel products={relatedProducts} />
          </section>
        )}

        {/* Store Information */}
        <SellerAboutSection storeSlug={product?.merchant?.storeSlug!} />
      </MaxWidthWrapper>
      {/* Qty/Cart - Mobile */}
      {product && product.productStock > 0 && (
        <ScrollAwareContainer className="fixed bottom-0 z-50 w-full bg-white p-4 lg:hidden">
          <AddToCartButton strokeWidth={2} product={product} />
        </ScrollAwareContainer>
      )}
    </>
  );
};

export default ProductDetailPage;

// FIXME: fix this to set metadata and reduce load time of page (It returning white space on the page while loading)
export async function generateMetadata({ params }: ProductPageProps) {
  const { product } = await getProductBySlug(params.slug);

  if (product === null) {
    return;
  }

  return {
    title: `${product.metaTitle || product.productTitle} | ${SITE_METADATA.name}`,
    description: product.metaDescription || product.longDescription,
    openGraph: {
      title: `Buy ${product.productTitle} at ${SITE_METADATA.name}`,
      description: product.longDescription,
      type: "website",
      url: `${SITE_METADATA.url}/product/${params.slug}`,
      // siteName: SITE_METADATA.name,
      images: product.productImages.map((image) => image.url),
    },
  };
}

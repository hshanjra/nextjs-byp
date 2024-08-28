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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SITE_METADATA } from "@/constants";
import {
  calculatePositiveFeedbackPercentage,
  cn,
  formatDate,
  formatPrice,
} from "@/lib/utils";
import {
  Calendar,
  Check,
  Clock,
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
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollAwareContainer from "@/components/ScrollAwareContainer";
import { ReviewsList } from "@/components/Reviews";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { product, error } = await getProductBySlug(params.slug);
  if (!product || error) return;

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

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const { product, error } = await getProductBySlug(params.slug);

  if (!product || error) {
    return <Loading />;
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
            <div className="my-5">
              <h5 className="text-sm font-normal text-gray-400">
                {product?.longDescription}
              </h5>
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
                      product?.averageRating!,
                    )}{" "}
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
                <ul className="flex items-center gap-x-[2px] text-sm">
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
              </h3>
              {product.longDescription}
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
        <section className="my-10 rounded-xl bg-zinc-100 p-5">
          <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
            <div className="flex flex-col items-center lg:flex-row lg:gap-5">
              {/* Store Logo */}
              {product?.merchant?.businessLogoURL ? (
                <Image
                  src={product?.merchant?.businessLogoURL}
                  alt="Profile"
                  width={150}
                  height={150}
                  className="mr-3 mt-3 object-cover object-center mix-blend-multiply sm:mr-0 sm:mt-0"
                />
              ) : (
                <StoreIcon size={50} />
              )}

              <div className="flex flex-col">
                <Link
                  href={`/seller/${product?.merchant?.storeSlug}`}
                  className="hover:underline"
                >
                  <h3 className="mb-2 font-roboto text-3xl font-semibold">
                    {product?.merchant?.displayName}
                  </h3>
                </Link>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    95.2% positive feedback
                  </span>
                  <span className="text-sm font-semibold">171K items sold</span>
                </div>
              </div>
            </div>
            {/* Store Buttons */}
            <div className="flex w-full flex-col gap-3 lg:w-auto">
              <Link
                href={`/seller/${product?.merchant?.storeSlug}`}
                className={cn(
                  buttonVariants({ variant: "success" }),
                  "w-full rounded-full lg:w-44",
                )}
              >
                Visit Store
              </Link>
              <Link
                href={"#"}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full rounded-full lg:w-44",
                )}
              >
                Contact Seller
              </Link>
            </div>
          </div>

          {/* Joined/Response time */}
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Calendar size={16} />
              <p className="text-sm">
                Joined {formatDate(product?.merchant?.createdAt!)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} />
              <p className="text-sm">Usually responds within 24 hours</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-8">
            {/* Left side */}
            <div className="col-span-3">
              {/* About */}
              <p className="font-roboto text-[15px] font-medium capitalize">
                {product?.merchant?.aboutSeller}
              </p>
            </div>
            {/* Right side */}
            <div className="col-span-5">
              {/* Seller Feedback */}
              <div className="my-5 flex items-center gap-1">
                <h3
                  className="font-roboto text-xl font-bold"
                  id="sellerReviews"
                >
                  Seller Feedback
                </h3>
                <span className="text-muted-foreground">(6)</span>
              </div>

              {/* Feedback */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Badge
                        variant={"success"}
                        className="mr-3 rounded-full px-2"
                      >
                        +
                      </Badge>
                      <h5>s***s</h5>
                      <span className="text-xs text-gray-400">Past month</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      Verified purchase
                    </span>
                  </div>

                  {/* Review */}
                  <p className="my-5 font-roboto">
                    This is my second time ordering from this seller and they
                    are the best. Best for shipping on time, best for
                    communication and best for packaging the item secure. I got
                    to say I'm super happy with it. Thank you soo much, I
                    appreciate it.
                  </p>
                </div>
                <Separator />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Badge
                        variant={"success"}
                        className="mr-3 rounded-full px-2"
                      >
                        +
                      </Badge>
                      <h5>d***y</h5>
                      <span className="text-xs text-gray-400">Past month</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      Verified purchase
                    </span>
                  </div>

                  {/* Review */}
                  <p className="my-5 font-roboto">
                    This seller is AWESOME! GREAT communication, excellent
                    price, very fast turnaround! item exactly as described! I
                    highly recommended this seller!
                  </p>
                </div>
                <Separator />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Badge
                        variant={"success"}
                        className="mr-3 rounded-full px-2"
                      >
                        +
                      </Badge>
                      <h5>n***a</h5>
                      <span className="text-xs text-gray-400">Past month</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      Verified purchase
                    </span>
                  </div>

                  {/* Review */}
                  <p className="my-5 font-roboto">
                    The new seat belt webbing is exactly as described and the
                    service was exceptional. I ordered it January 27th and
                    mailed my old seat belt assy. to them on January 28 th .
                    They re webbed it and I had it back on February 6th ! and
                    its as good as new . I messaged them when I first saw the
                    add and their response was immediate .Its nice to see a
                    company now days with this kind of service . I would
                    recommend them to every one !
                  </p>
                </div>
                <Separator />

                {/* See all button */}
                <Link
                  href={`/seller/${product?.merchant?.storeSlug}#feedback`}
                  className={cn(
                    buttonVariants({ variant: "success", size: "lg" }),
                    "mx-auto my-10 rounded-full font-bold",
                  )}
                >
                  See all reviews
                </Link>
              </div>
            </div>
          </div>
        </section>
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

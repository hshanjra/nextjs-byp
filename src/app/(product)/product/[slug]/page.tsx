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
import { cn, formatPrice } from "@/lib/utils";
import {
  Check,
  DollarSignIcon,
  Headset,
  Heart,
  IterationCcw,
  Package,
  PhoneOutgoing,
  Store,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";

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
          <section>
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
          </section>
          {/* Product Info */}
          <div>
            <h1 className="text-[calc(1.375rem+1.5vw)] font-bold leading-[1.2]">
              {product?.productTitle}
            </h1>

            <div className="flex items-center gap-1 lg:gap-4">
              {/* Review / SKU */}
              <div className="flex items-center gap-x-1">
                <ReviewStar rating={4} height={28} />
                <span className="text-xs font-semibold lg:text-sm">
                  {1} review
                </span>
              </div>

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
            <Separator />
            {/* Qty / Add to cart */}
            {product.productStock > 0 && (
              <div className="my-3 hidden items-center space-x-3 lg:flex">
                {/* Counter */}
                <AddToCartButton strokeWidth={2} product={product} />
                {/* Compatibility Message */}
                <CompatibleMessage isCompatible={true} />
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
                <Image
                  src="/images/logo.webp"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="mr-3 mt-3 rounded-full object-cover"
                />
              </div>
              <div className="flex w-full flex-col items-start">
                <p className="mx-auto mb-2 flex items-center gap-1 font-semibold text-black lg:mx-0">
                  Nates Tools and More
                  <Link
                    href={"#reviews"}
                    className="text-sm font-normal italic text-gray-500"
                  >
                    (2299 reviews)
                  </Link>
                </p>
                <div className="mx-auto mb-2 flex items-center gap-3 text-gray-500 lg:mx-0 lg:gap-1">
                  <p className="flex items-center gap-1 text-sm font-bold">
                    <ThumbsUp size={18} />
                    99.7% Positive
                  </p>
                  <Separator orientation="vertical" className="h-5" />
                  <Link
                    href="/"
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
              <TabsTrigger
                value="additional-info"
                className="bg-transparent px-1 text-sm font-medium text-gray-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none lg:text-lg"
              >
                Additional Info
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="bg-transparent px-1 text-sm font-medium text-gray-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none lg:text-lg"
              >
                Reviews(5)
              </TabsTrigger>
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
              <h3 className="my-3 text-lg font-semibold text-zinc-500">
                Item description from the seller
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
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Inventore, nobis!
                </p>
              </div>

              <AddReviewForm />
            </TabsContent>

            <TabsContent value="qna">
              <p>QnA</p>
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
      </MaxWidthWrapper>
      {/* Qty/Cart - Mobile */}
      {product && product.productStock > 0 && (
        <div className="fixed bottom-0 z-50 w-full bg-white p-4 lg:hidden">
          {/* Counter */}
          <AddToCartButton strokeWidth={2} product={product} />
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;

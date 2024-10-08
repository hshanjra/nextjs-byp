import { getSellerStoreInfo } from "@/actions/SellerStoreAction";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SITE_METADATA } from "@/constants";
import { calculatePositiveFeedbackPercentage, formatDate } from "@/lib/utils";
import { MessageSquareText, Share, StoreIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SellerFilters from "./_components/SellerFilters";
import { getAllProducts } from "@/actions/ProductsAction";
import EmptyState from "@/components/Products/EmptyState";
import ProductHoverInfoCard from "@/components/Products/ProductHoverInfoCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SellerComments from "./_components/SellerComments";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const store = await getSellerStoreInfo(params.slug);
  if (!store) return;

  return {
    title: `${store.displayName} | ${SITE_METADATA.name}`,
    description: store.aboutSeller,
    openGraph: {
      title: `View ${store.displayName} at ${SITE_METADATA.name}`,
      description: store.aboutSeller,
      type: "website",
      url: `${SITE_METADATA.url}/store/${params.slug}`,

      images: store.businessLogoURL,
    },
  };
}

export default async function SellerStorePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | Array<string> | number | undefined };
}) {
  const store = await getSellerStoreInfo(params.slug);

  if (!store) throw notFound();

  const minPrice = Number(searchParams?.minPrice);
  const maxPrice = Number(searchParams?.maxPrice);
  const q = searchParams?.q as string;
  const sort = searchParams?.sort as string;
  const limit = (searchParams?.perPage as number) || 16;
  const brand = searchParams?.brand as Array<string>;
  const status = searchParams?.status as Array<string>;
  const condition = searchParams?.condition as Array<string>;
  const featured = searchParams?.featured === "true" || undefined;

  const query = {
    q,
    sort,
    limit,
    minPrice,
    maxPrice,
    brand,
    status,
    condition,
    featured,
    seller: store._id,
  };
  const { products, totalCount, error } = await getAllProducts(query);

  return (
    <MaxWidthWrapper className="my-5 font-roboto">
      {/* Store Header */}
      <section className="flex flex-col items-center gap-6 bg-zinc-100 p-7 lg:flex-row">
        {/* Business Logo */}
        {store?.businessLogoURL ? (
          <Image
            src={store?.businessLogoURL}
            alt={`${store.displayName} logo`}
            width={100}
            height={100}
            className="bg-opacity-0 object-cover object-center mix-blend-multiply"
          />
        ) : (
          <StoreIcon size={100} />
        )}

        <div className="flex w-full flex-col justify-between space-y-3">
          <h1 className="text-center text-3xl font-semibold lg:text-left">
            {store.displayName}
          </h1>
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="flex items-center gap-3">
              <p className="text-sm">
                <b>
                  {calculatePositiveFeedbackPercentage(
                    store.averageSellerRating,
                  )}
                  %
                </b>{" "}
                positive feedback
              </p>
              <p className="text-sm">
                <b>171K</b> items sold
              </p>
              <p className="text-sm">
                <b>4.7K</b> followers
              </p>
            </div>

            <div className="mt-5 flex items-center gap-5 lg:m-0">
              <div className="flex items-start gap-1">
                <Share size={16} />
                <p className="text-sm">Share</p>
              </div>
              <div className="flex items-end gap-1">
                <MessageSquareText size={16} />
                <p className="text-sm">Contact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20 mt-5 grid grid-cols-1">
        <Tabs defaultValue="products">
          <TabsList className="justify-start bg-transparent">
            <TabsTrigger
              value="products"
              className="rounded-none bg-transparent font-semibold data-[state=active]:border-b-[3px] data-[state=active]:border-orange-600"
            >
              Products
            </TabsTrigger>

            <Separator orientation="vertical" className="mx-3 h-5" />
            <TabsTrigger
              value="about"
              className="rounded-none bg-transparent font-semibold data-[state=active]:border-b-[3px] data-[state=active]:border-orange-600"
            >
              About
            </TabsTrigger>
            <Separator orientation="vertical" className="mx-3 h-5" />
            <TabsTrigger
              value="feedback"
              id="feedback"
              className="rounded-none bg-transparent font-semibold data-[state=active]:border-b-[3px] data-[state=active]:border-orange-600"
            >
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <section className="grid grid-cols-1 gap-5 lg:grid-cols-8">
              <div className="col-span-2 hidden sm:block lg:block">
                <h3 className="mb-5 mt-5 text-xl font-semibold">Filters</h3>
                <SellerFilters />
              </div>
              <div className="col-span-8 lg:col-span-6">
                {products && products.length > 0 ? (
                  <div className="my-2 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {products?.map((product: any) => (
                      <ProductHoverInfoCard
                        product={product}
                        key={product.productId}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </div>
            </section>
          </TabsContent>
          <TabsContent value="about">
            <div className="my-5 bg-zinc-100 p-5">
              <h3 className="mb-5 mt-5 text-xl font-semibold">About Us</h3>
              <p className="text-sm font-medium capitalize tracking-wide text-gray-700">
                {store.aboutSeller}
              </p>
            </div>
            <div className="mx-5 flex flex-col items-start gap-1">
              <p className="text-sm font-semibold text-gray-400">
                Location:
                <span className="ml-2 text-zinc-900">
                  Florida, United States
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-400">
                Member Since:
                <span className="ml-2 text-zinc-900">
                  {formatDate(store.createdAt)}
                </span>
              </p>

              <div className="mt-10 w-full">
                <h3 className="text-xl font-semibold">Top Rated Seller</h3>
                <p className="mt-3">
                  {store.displayName} is one of buyurparts's most reputable
                  sellers. Consistently delivers outstanding customer service{" "}
                  <Link href={"/"} className="text-primary">
                    Learn more
                  </Link>
                </p>

                <h3 className="mt-10 text-2xl font-semibold">Store Policies</h3>

                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="returns">
                    <AccordionTrigger className="font-semibold">
                      Returns
                    </AccordionTrigger>
                    <AccordionContent className="mt-5">
                      {store.returnPolicyTerms ? (
                        store.returnPolicyTerms
                      ) : (
                        <p className="text-center">
                          Seller didn't have any return policy.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping">
                    <AccordionTrigger className="font-semibold">
                      Shipping
                    </AccordionTrigger>
                    <AccordionContent className="mt-5">
                      {store.shippingPolicyTerms ? (
                        store.shippingPolicyTerms
                      ) : (
                        <p className="text-center">
                          Seller didn't have any shipping policy.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 lg:flex-row lg:gap-5">
                  <h3 className="text-2xl font-semibold">
                    Still have questions?
                  </h3>
                  <Button
                    asChild
                    className="rounded-full"
                    variant={"dark"}
                    size={"lg"}
                  >
                    <Link href={"#"}>Contact Seller</Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <section className="mt-5">
              <div className="mb-5 flex items-center gap-1">
                <h3 className="text-2xl font-medium">Seller Feedback</h3>
                <span className="text-muted-foreground">
                  ({store?.sellerReviewsCount})
                </span>
              </div>

              {/* Feedback */}
              <SellerComments sellerId={store._id} />
            </section>
          </TabsContent>
        </Tabs>
      </section>

      {/* Go to top */}

      <ScrollToTopButton />
    </MaxWidthWrapper>
  );
}

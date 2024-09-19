import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCategories } from "@/actions/CategoryAction";
import FeaturedProductTabContent from "./FeaturedProductTabContent";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export default async function FeaturedProducts() {
  // const {
  //   data: products,
  //   error,
  //   isPending,
  // } = useGetAllProducts({ limit: 10, filter: "featured" });

  // if (error) {
  //   return <div>Unable to get products. {error.message}</div>;
  // }

  const { categories, error: catErr } = await getAllCategories();

  return (
    <section className="mt-10">
      {/* For Lg Screens */}
      <Tabs defaultValue={categories[1]?.categorySlug}>
        <div className="flex items-center">
          <h3 className="mr-5 text-xl font-medium">Featured Products</h3>

          <div className="hidden lg:block">
            <TabsList className="flex justify-start space-x-5 rounded-none bg-transparent">
              {categories?.slice(0, 5).map((cat) => (
                <TabsTrigger
                  key={cat._id}
                  className="my-auto rounded-none bg-transparent text-base data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
                  value={cat.categorySlug}
                >
                  {cat.categoryName}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <Link
            href="/products?featured=true"
            className="ml-auto flex items-center text-sm font-medium hover:text-red-500"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Separator />
        {/* {isPending && <div>Loading...</div>} */}
        {categories.slice(0, 5).map((cat, idx) => (
          <TabsContent key={cat._id + idx} value={cat.categorySlug}>
            {/* Product Reel */}
            <Suspense
              fallback={
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex w-56 flex-col">
                      <Skeleton className="aspect-square h-56 w-56 rounded-xl" />
                      <Skeleton className="mt-3 h-4 w-56" />
                      <Skeleton className="ml-auto mt-3 h-4 w-20" />
                    </div>
                  ))}
                </div>
              }
            >
              <FeaturedProductTabContent categorySlug={cat.categorySlug} />
            </Suspense>
          </TabsContent>
        ))}
      </Tabs>
      {/* For small screens */}
    </section>
  );
}

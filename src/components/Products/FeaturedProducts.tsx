import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductReel from "./ProductReel";
import { useGetAllProducts } from "@/hooks/useProducts";
import { getAllProducts } from "@/actions/ProductsAction";
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
      <Tabs defaultValue="air-bags">
        <div className="flex items-center">
          <h3 className="text-xl font-medium mr-5">Featured Products</h3>

          <div className="hidden lg:block">
            <TabsList className="flex space-x-5 justify-start  rounded-none m-0 py-2 bg-transparent">
              {categories?.slice(0, 5).map((cat) => (
                <TabsTrigger
                  key={cat._id}
                  className="my-auto rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 bg-transparent"
                  value={cat.categorySlug}
                >
                  {cat.categoryName}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <Link
            href="/products?featured=true"
            className="flex items-center ml-auto text-sm hover:text-red-500 font-medium"
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
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex flex-col w-56">
                      <Skeleton className="h-56 w-56 aspect-square rounded-xl" />
                      <Skeleton className="h-4 w-56 mt-3" />
                      <Skeleton className="ml-auto h-4 w-20 mt-3" />
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

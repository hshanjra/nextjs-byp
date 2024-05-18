"use client";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/actions";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductReel from "./ProductReel";

export const FeaturedProducts = () => {
  // FIXME: fix query
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products {error.message}</div>;

  return (
    <section className="my-5">
      {/* For Lg Screens */}
      <Tabs defaultValue="safety" className="hidden lg:block">
        <div className="flex items-center">
          <h3 className="text-xl font-medium mr-5">Featured Products</h3>
          <Separator orientation="vertical" className="text-muted-foreground" />

          <TabsList className="flex space-x-5 justify-start  rounded-none py-0 my-0">
            <TabsTrigger
              className="rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
              value="safety"
            >
              Auto Safety & Security
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
              value="interior"
            >
              Interior Accessories
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
              value="motor-oil"
            >
              Motor Oils
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
              value="tires-wheels"
            >
              Tires & Wheels
            </TabsTrigger>
          </TabsList>

          <Link
            href="#"
            className="flex items-center ml-auto text-sm hover:text-red-500 font-medium"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Separator />
        <TabsContent value="account"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
      {/* For small screens */}
      {/* Product Reel */}
      <div>
        <h1>Products</h1>
        <ul>
          {data.map((product: any) => (
            <li key={product._id}>{product.productTitle}</li>
          ))}
        </ul>
      </div>

      {/* <ProductReel products={products} /> */}
    </section>
  );
};
export default FeaturedProducts;

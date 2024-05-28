"use client";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { intApi } from "@/lib/api";
import ProductHoverInfoCard from "./ProductHoverInfoCard";
import { IProduct } from "@/types/Product";

export default function LatestDealsSection() {
  const {
    data: products,
    error,
    isPending,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await intApi.get(`/products?filter=deals`)).data,
    staleTime: 5 * 60 * 10,
  });

  if (error) {
    return <div>Unable to get products. {error.message}</div>;
  }
  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <h3 className="text-primary text-lg font-semibold">
          Latest Deals of this Week
        </h3>
        <Link
          href="#"
          className="flex items-center ml-auto text-sm hover:text-red-500 font-medium"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Separator className="bg-primary my-3" />
      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {isPending && <div>Loading...</div>}

        {products &&
          products
            .slice(0, 5)
            .map((product: IProduct) => (
              <ProductHoverInfoCard product={product} key={product.productId} />
            ))}
      </div>
    </section>
  );
}

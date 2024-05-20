"use client";
import { getProducts } from "@/actions/products-action";
import { IProduct } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Separator } from "../ui/separator";

export default function ProductReel() {
  const { data, error, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (error) {
    return <div>Unable to get products.</div>;
  }
  if (isPending) {
    return <div>Loading...</div>;
  }

  const products = JSON.parse(data as string) as IProduct[];

  return (
    <section className="py-2">
      <div className="flex space-x-5">
        {products?.map((p) => (
          <ProductCard product={p} key={p.productId} />
        ))}
      </div>
      <Separator />
      {/* slider indicators */}
    </section>
  );
}

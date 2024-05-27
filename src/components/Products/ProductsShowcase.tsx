"use client";
import { useQuery } from "@tanstack/react-query";
import Banner from "../Banner";
import { intApi } from "@/lib/api";
import ProductHoverInfoCard from "./ProductHoverInfoCard";
import { IProduct } from "@/types/Product";
import Link from "next/link";

export default function ProductsShowcase() {
  const {
    data: products,
    error,
    isPending,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await intApi.get(`/products?limit=8`)).data,
    staleTime: 5 * 60 * 10,
  });

  if (error) {
    return <div>Unable to get products. {error.message}</div>;
  }
  return (
    <section className="flex items-center my-5">
      <div className="h-full text-white w-full max-w-[350px]">
        <Banner
          imgUrl="/images/banner-04.jpg"
          href="#"
          className="rounded-l-lg lg:h-[752px]"
        >
          <div className="p-7 space-y-5">
            <h5 className="text-7xl text-center">-35%</h5>
            <p className="text-sm font-semibold">Only this week</p>
            <h3 className="text-xl">Tools & Equipment</h3>
            <p className="text-xs text-muted-foreground mb-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos iusto incidunt accusamus tempore suscipit a dicta nam
              enim mollitia minima!
            </p>
            <Link href="#" className="text-sm">
              Shop Now &rarr;
            </Link>
          </div>
        </Banner>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-[2px] rounded-lg rounded-l-none">
        {isPending && <div>Loading...</div>}

        {products &&
          products.map((product: IProduct) => (
            <ProductHoverInfoCard product={product} key={product.productId} />
          ))}
      </div>
    </section>
  );
}

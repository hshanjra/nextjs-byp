import Link from "next/link";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProductHoverInfoCard from "./ProductHoverInfoCard";
import { Product } from "@/types/product";
import { getAllProducts } from "@/actions/ProductsAction";

export default async function LatestDealsSection() {
  // const {
  //   data: products,
  //   error,
  //   isPending,
  // } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => await getAllProducts({ limit: 40 }),
  //   staleTime: 5 * 60 * 10,
  // });

  const { products, error, totalCount } = await getAllProducts({
    limit: 5,
    sort: "price-asc",
    status: "inStock",
  });

  if (!products) {
    return <div>Unable to get products. </div>;
  }
  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <h3 className="text-lg font-semibold text-primary">
          Latest Deals of this Week
        </h3>
        <Link
          href="/products?sort=price-asc"
          className="ml-auto flex items-center text-sm font-medium hover:text-red-500"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Separator className="my-3 bg-primary" />
      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {/* {isPending && <div>Loading...</div>} */}

        {products &&
          products.map((product: Product) => (
            <ProductHoverInfoCard product={product} key={product.productId} />
          ))}
      </div>
    </section>
  );
}

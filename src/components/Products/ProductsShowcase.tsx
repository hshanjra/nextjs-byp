import { useQuery } from "@tanstack/react-query";
import Banner from "../Banner";
import { intApi } from "@/lib/api";
import ProductHoverInfoCard from "./ProductHoverInfoCard";
import { Product } from "@/types/product";
import Link from "next/link";
import { getAllProducts } from "@/actions/ProductsAction";

export default async function ProductsShowcase() {
  // const {
  //   data: products,
  //   error,
  //   isPending,
  // } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => (await intApi.get(`/products?limit=8`)).data,
  //   staleTime: 5 * 60 * 10,
  // });

  const { products } = await getAllProducts({ limit: 10, featured: false });

  if (!products) {
    return <div>Unable to get products.</div>;
  }
  return (
    <section className="flex flex-col lg:flex-row items-center my-5 space-y-10 lg:space-y-0">
      <div className="h-full text-white w-full lg:max-w-[350px]">
        <Banner
          imgUrl="/images/banner-04.jpg"
          className="rounded-lg lg:rounded-r-none lg:h-[752px]"
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-[2px] rounded-lg lg:rounded-l-none w-full">
        {products.map((product: Product) => (
          <ProductHoverInfoCard product={product} key={product.productId} />
        ))}
      </div>
    </section>
  );
}

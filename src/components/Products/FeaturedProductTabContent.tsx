import { getAllProducts } from "@/actions/ProductsAction";
import ProductReel from "./ProductReel";
import { CircleX } from "lucide-react";
import { Separator } from "../ui/separator";

export default async function FeaturedProductTabContent({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const { products, error, totalCount } = await getAllProducts({
    category: categorySlug,
    limit: 10,
    featured: true,
  });

  if (!products || error || products.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-2 py-32">
          <CircleX strokeWidth={1} className="text-red-500" />
          <p className="text-red-500">
            No featured products found for this category.
          </p>
        </div>
        <Separator />
      </>
    );
  }

  return products && <ProductReel products={products} />;
}

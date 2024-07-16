import { getAllProducts } from "@/actions/ProductsAction";
import ProductHoverInfoCard from "@/components/Products/ProductHoverInfoCard";
import { Product } from "@/types/product";

export default async function FeaturedProductsPage() {
  // TODO: modify this to fetch only featured products
  const products: Product[] = await getAllProducts({ limit: 20 });

  return (
    products && (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-2">
        {products.map((product: Product) => (
          <ProductHoverInfoCard product={product} key={product.productId} />
        ))}
      </div>
    )
  );
}
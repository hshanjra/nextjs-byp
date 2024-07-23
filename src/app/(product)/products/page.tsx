import { getAllProducts } from "@/actions/ProductsAction";
import MobileSidebarFilters from "@/components/Filters/MobileSidebarFilters";
import ProductsHeaderFilter from "@/components/Filters/ProductsHeaderFilter";
import EmptyState from "@/components/Products/EmptyState";
import ProductHoverInfoCard from "@/components/Products/ProductHoverInfoCard";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/product";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | Array<string> | number | undefined };
}) {
  const minPrice = searchParams?.minPrice as string;
  const maxPrice = searchParams?.maxPrice as string;
  const q = searchParams?.q as string;
  const sort = searchParams?.sort as string;
  const limit = (searchParams?.perPage as number) || 16;
  const brand = searchParams?.brand as Array<string>;
  const status = searchParams?.status as Array<string>;
  const condition = searchParams?.condition as Array<string>;
  const featured = searchParams?.featured === "true" ?? true;

  const query = {
    q,
    sort,
    limit,
    minPrice,
    maxPrice,
    brand,
    status,
    condition,
    featured,
  };
  const { products, totalCount, error } = await getAllProducts(query);

  if (!products) return <EmptyState />;

  return (
    <>
      {/* Filters */}
      <div className="hidden lg:block md:block">
        <div className="bg-gray-100/70 p-5 flex items-center justify-between rounded-lg">
          <div>
            <p className="text-sm font-light">
              {totalCount <= limit
                ? `Showing all ${totalCount} results`
                : `Showing 1-${limit} of ${totalCount} results`}
            </p>
          </div>
          <ProductsHeaderFilter />
        </div>
      </div>
      {/* Mobile Filters */}
      <div className="block lg:hidden md:hidden">
        <div className="bg-gray-100 p-3 flex items-center justify-between rounded-lg">
          <MobileSidebarFilters />
          <div className="flex items-center gap-x-2">
            <Label htmlFor="sort">Sort:</Label>
            <select
              name="sort"
              id="sort"
              className="bg-transparent text-sm max-w-[140px] outline-none"
            >
              <option value="popular">Sort by popularity</option>
              <option value="avgRating">Sort by average rating</option>
              <option value="latest">Sort by latest</option>
              <option value="low-to-high">Sort by price: low to high</option>
              <option value="high-to-low">Sort by price: high to low</option>
            </select>
          </div>
        </div>
      </div>
      {products && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-2">
          {products?.map((product: Product) => (
            <ProductHoverInfoCard product={product} key={product.productId} />
          ))}
        </div>
      )}
    </>
  );
}

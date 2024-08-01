import { getSingleCategory } from "@/actions/CategoryAction";
import { getAllProducts } from "@/actions/ProductsAction";
import MobileSidebarFilters from "@/components/Filters/MobileSidebarFilters";
import ProductsHeaderFilter from "@/components/Filters/ProductsHeaderFilter";
import EmptyState from "@/components/Products/EmptyState";
import ProductHoverInfoCard from "@/components/Products/ProductHoverInfoCard";
import { SITE_METADATA } from "@/constants";
import { Product } from "@/types/product";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | Array<string> | number | undefined };
}

export async function generateMetadata({ params }: PageProps) {
  const { category, error } = await getSingleCategory(params.slug);
  if (!category || error) return;

  return {
    title: `${category.categoryName} | ${SITE_METADATA.name}`,
    description: category.categoryDescription,
    openGraph: {
      title: category.categoryName,
      description: category.categoryDescription,
      type: "website",
      url: `${SITE_METADATA.url}/categories/${params.slug}`,
      siteName: SITE_METADATA.name,
      images: category.categoryThumbnail,
    },
  };
}

export default async function page({ params, searchParams }: PageProps) {
  const { category, error: categoryError } = await getSingleCategory(
    params.slug
  );

  if (!category || categoryError) return <EmptyState />;

  const minPrice = Number(searchParams?.minPrice);
  const maxPrice = Number(searchParams?.maxPrice);
  const q = searchParams?.q as string;
  const sort = searchParams?.sort as string;
  const limit = (searchParams?.perPage as number) || 16;
  const brand = searchParams?.brand as Array<string>;
  const status = searchParams?.status as Array<string>;
  const condition = searchParams?.condition as Array<string>;
  const featured = searchParams?.featured === "true" || undefined;

  const query = {
    category: params.slug,
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

  const { products, error, totalCount } = await getAllProducts(query);
  if (!products || error) return <EmptyState />;

  return (
    <>
      {/* Heading */}
      <h1 className="hidden">{category.categoryName}</h1>
      {/* Filters */}
      <div className="hidden lg:block md:block mb-7">
        <div className="bg-gray-200/75 p-5 flex items-center justify-between rounded-lg">
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
      <div className="block lg:hidden md:hidden mb-7">
        <div className="bg-gray-200/75 p-3 flex items-center justify-between rounded-lg">
          <MobileSidebarFilters />
          <div className="flex items-center gap-x-2">
            <ProductsHeaderFilter />
          </div>
        </div>
      </div>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-2">
          {products?.map((product: Product) => (
            <ProductHoverInfoCard product={product} key={product.productId} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}

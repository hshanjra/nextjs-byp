"use client";
import { getAllProducts } from "@/actions/ProductsAction";
import MobileSidebarFilters from "@/components/Filters/MobileSidebarFilters";
import ProductsHeaderFilter from "@/components/Filters/ProductsHeaderFilter";
import PartsFinder from "@/components/Header/PartsFinder";
import EmptyState from "@/components/Products/EmptyState";
import ProductHoverInfoCard from "@/components/Products/ProductHoverInfoCard";
import { useStore } from "@/store/store";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function FindPartsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | Array<string> | number | undefined };
}) {
  const minPrice = Number(searchParams?.minPrice) || 0;
  const maxPrice = Number(searchParams?.maxPrice) || 0;
  const q = searchParams?.q as string;
  const sort = searchParams?.sort as string;
  const limit = (searchParams?.perPage as number) || 16;
  const brand = searchParams?.brand as Array<string>;
  const status = searchParams?.status as Array<string>;
  const condition = searchParams?.condition as Array<string>;
  const featured = searchParams?.featured === "true" || undefined;

  const { make, model, year, subModel } = useStore();

  // Check if vehicle is exists in store
  const isVehicleExists = make && model && year && subModel;

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
    make,
    model,
    year,
    subModel,
  };

  const { data, isPending } = useQuery({
    queryKey: ["products", query],
    queryFn: async () => await getAllProducts(query),
    retry: 2,
  });

  const products = data?.products || [];
  const totalCount = data?.totalCount || 0;

  if (isPending) return <Loader />;

  if (!data?.products || data?.error) return <EmptyState />;

  if (!isVehicleExists)
    return (
      <div className="rounded-xl border p-5 text-center">
        <h2 className="text-sm font-medium text-gray-500">
          {" "}
          Please select a vehicle first to get compatible parts.
        </h2>
        <PartsFinder
          trigger={
            <p className="mt-3 text-primary underline outline-none">
              Click to select
            </p>
          }
        />
      </div>
    );

  return (
    <>
      {/* Filters */}
      <div className="mb-7 hidden md:block lg:block">
        <div className="flex items-center justify-between rounded-lg bg-gray-200/75 p-5">
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
      <div className="mb-7 block md:hidden lg:hidden">
        <div className="flex items-center justify-between rounded-lg bg-gray-200/75 p-3">
          <MobileSidebarFilters />
          <div className="flex items-center gap-x-2">
            <ProductsHeaderFilter />
          </div>
        </div>
      </div>
      {products && products.length > 0 ? (
        <div className="my-2 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
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

const Loader = () => {
  return (
    <div className="mx-auto mt-10">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h3 className="text-xl font-semibold">Loading...</h3>
      </div>
    </div>
  );
};

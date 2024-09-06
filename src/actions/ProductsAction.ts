"use server";
import { extApi } from "@/lib/api";
import { ProductFilterValidator } from "@/lib/validators/product-filter-validator";
import { Product } from "@/types/product";

type queryParams = {
  q?: string;
  sort?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string[];
  status?: string[] | string;
  condition?: string[];
  make?: string;
  featured?: boolean;
  model?: string;
  subModel?: string;
  year?: number;
  category?: string;
  seller?: string; // seller id to get specific seller products
};

interface ProductsResponse {
  totalCount: number;
  products: Product[];
  error: string;
}

export const getAllProducts = async (
  params?: queryParams,
): Promise<ProductsResponse> => {
  // products?limit=90&condition=new,used&brand=bmw,kia&year=2014

  const minPrice = params?.minPrice || 0;
  const maxPrice = params?.maxPrice || Infinity;
  const sort = (params?.sort as string) || "none";
  const limit = Number(params?.limit) || 50;

  const brand = params?.brand || "";
  const status = params?.status || "";
  const condition = params?.condition || "";
  const featured = params?.featured ? true : false;
  const category = params?.category || "";
  const seller = params?.seller || "";

  try {
    const validatedData = ProductFilterValidator.parse({
      sort,
      limit,
      minPrice,
      maxPrice,
      brand,
      status,
      condition,
      featured,
      q: params?.q || "",
      make: params?.make || "",
      model: params?.model || "",
      subModel: params?.subModel || "",
      year: params?.year || 0,
      category,
      seller,
    });

    const queryString = new URLSearchParams(validatedData as any).toString();

    const { data } = await extApi.get<ProductsResponse>(
      `/products?${queryString}`,
    );

    return {
      products: data.products,
      totalCount: data.totalCount,
      error: "",
    };
  } catch (error) {
    // TODO: return sentry error
    console.error(error);
    return { products: [], totalCount: 0, error: "Unable to get products" };
  }
};

export const getProductBySlug = async (
  slug: string,
): Promise<{ product: Product | null; error: string | null }> => {
  try {
    const { data } = await extApi.get<Product | null>(`/products/${slug}`);
    return { product: data, error: null };
  } catch (error) {
    console.error(error);
    return { product: null, error: "Unable to get product" };
  }
};

export const GetReviews = async ({
  slug,
  sellerId,
  limit,
  offset,
}: {
  slug?: string;
  sellerId?: string;
  limit?: number;
  offset?: number;
}) => {
  const fixedLimit = limit || 10;
  const fixedOffset = offset || 0;
  const safeSellerId = sellerId || "";
  const safeSlug = slug || "";

  try {
    const { data } = await extApi.get(
      `/reviews?productSlug=${safeSlug}&sellerId=${safeSellerId}&limit=${fixedLimit}&page=${fixedOffset}`,
    );
    return {
      reviews: data.reviews,
      reviewsCount: data.totalReviewsCount,
      error: "",
    };
  } catch (error) {
    console.error(`Unable to get reviews for product ${slug}`, error);
    // TODO: return sentry error
    return { reviews: [], reviewsCount: 0, error: "Unable to get products" };
  }
};

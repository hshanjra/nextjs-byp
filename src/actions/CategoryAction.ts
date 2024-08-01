"use server";

import { extApi } from "@/lib/api";
import { Category } from "@/types/category";

interface CategoryResponse {
  category: Category | null;
  error: string;
}
interface CategoriesResponse {
  categories: Category[];
  error: string;
}

export async function getAllCategories(): Promise<CategoriesResponse> {
  try {
    const { data } = await extApi.get("/category");
    return { categories: data, error: "" };
  } catch (error) {
    console.error(error);

    return { categories: [], error: "Unable to get categories" };
  }
}

export async function getSingleCategory(
  slug: string
): Promise<CategoryResponse> {
  try {
    const { data } = await extApi.get(`/category/${slug}`);
    return { category: data, error: "" };
  } catch (error) {
    console.error(error);

    return {
      category: null,
      error: "Unable to get categories",
    };
  }
}

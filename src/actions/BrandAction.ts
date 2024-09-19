"use server";

import { extApi } from "@/lib/api";

export const getAllBrands = async () => {
  try {
    const { data } = await extApi.get("/products/brands");
    return data;
  } catch (error) {
    console.log(error);
    // TODO: return sentry error
    return { reviews: [], reviewsCount: 0, error: "Unable to get products" };
  }
};

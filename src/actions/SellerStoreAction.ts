"use server";

import { extApi } from "@/lib/api";
import { Product } from "@/types/product";

export async function getSellerStoreInfo(
  slug: string,
): Promise<Product["merchant"] | undefined> {
  try {
    const { data } = await extApi.get<Product["merchant"]>(
      `/seller/store/${slug}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

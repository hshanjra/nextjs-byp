"use server";
import { extApi } from "@/lib/api";
import { Product } from "@/types/product";

type params = {
  limit?: number;
};

export const getAllProducts = async ({ limit }: params) => {
  try {
    const { data } = await extApi.get(`/products?limit=${limit}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await extApi.get(`/products/${slug}`);
    return data;
  } catch (error) {
    return error;
  }
};

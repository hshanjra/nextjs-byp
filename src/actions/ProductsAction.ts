"use server";
import { extApi } from "@/lib/api";

type params = {
  limit?: number;
  filter?: string;
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

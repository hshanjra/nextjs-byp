"use server";
import api from "@/lib/api";
import { IProduct } from "@/types/Product";

// Get All Products
export const getProducts = async () => {
  try {
    const { data } = await api.get("/products");
    return JSON.stringify(data);
  } catch (err) {
    throw err;
  }
};

export const getSingleProduct = async (slug: string) => {
  try {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  } catch (err) {
    throw err;
  }
};

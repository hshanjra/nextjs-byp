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
export const fetchProduct = async (slug: string) => {
  // const res = await fetch(`${process.env.API_BASE_URL}/products/${slug}`);
  // return res.json();
  const { data } = await api.get(`/products/${slug}`);
  return JSON.stringify(data);
};

export const getSingleProduct = async (slug: string) => {
  try {
    const { data } = await api.get(`/products/${slug}`);
    return data;
  } catch (err) {
    throw err;
  }
};

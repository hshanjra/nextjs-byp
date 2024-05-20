"use server";
import api from "@/lib/api";

// Get All Products
export const getProducts = async () => {
  try {
    const { data } = await api.get("/products");
    return JSON.stringify(data);
  } catch (err) {
    throw err;
  }
};

"use server";
import api from "@/lib/api";
import axios from "axios";

// Get All Products
export const fetchProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/v1/products");
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

"use server";
import api from "@/lib/api";

// Get All Products
export const getProducts = async () => {
  try {
    const { data } = await api.get("/products");
    return JSON.stringify(data);
    // const data = {
    //   _id: "dalsnfkl nas",
    //   productTitle: " rjksdbfkjadbfjdbafjd",
    // };
    // return data;
  } catch (err) {
    throw err;
  }
};

"use server";

import { ORDER_STATUS } from "@/enums";
import { extApi } from "@/lib/api";
import { Order } from "@/types/order";

interface OrderResponse {
  orders: Order[];
  error: string;
}

export const getAllOrders = async ({
  status,
}: {
  status?: ORDER_STATUS;
}): Promise<OrderResponse> => {
  try {
    const { data } = await extApi.get<Order[]>(`/orders?status=${status}`);

    return { orders: data, error: "" };
  } catch (error) {
    console.error(`Error fetching orders: ${error}`);

    return { orders: [], error: "Unable to get orders" };
  }
};

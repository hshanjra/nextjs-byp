"use server";

import { ORDER_STATUS } from "@/enums";
import { extApi } from "@/lib/api";
import { Order } from "@/types/order";
import { cookies } from "next/headers";

interface OrderResponse {
  orders: Order[];
  error: string;
}

export const getAllOrders = async ({
  status,
}: {
  status?: ORDER_STATUS;
}): Promise<OrderResponse> => {
  const token = cookies().get("accessToken")?.value;
  if (!token) return { error: "Unauthorized", orders: [] };

  try {
    const { data } = await extApi.get<Order[]>(`/orders?status=${status}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { orders: data, error: "" };
  } catch (error) {
    console.error(`Error fetching orders: ${error}`);

    return { orders: [], error: "Unable to get orders" };
  }
};

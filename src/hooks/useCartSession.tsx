import { addOrUpdateItem, getCart } from "@/actions/CartAction";
import { useQuery } from "@tanstack/react-query";

export const useUpdateCartItem = (id: string, qty: number) => {
  return useQuery({
    queryKey: ["add-cart-item"],
    queryFn: () => addOrUpdateItem(id, qty),
  });
};

"use client";
import { Ellipsis, Minus, Plus } from "lucide-react";
import { useGetCart } from "@/hooks/useCartSession";
import { useEffect, useState } from "react";
import { addOrUpdateItem, removeItem } from "@/actions/CartAction";
import { Cart } from "@/types/cartProduct";

type props = {
  productId: string;
  maxQty: number;
  cart: Cart;
};

export default function QtyButtons({ productId, maxQty, cart }: props) {
  const [quantity, setQuantity] = useState(cart?.items[productId].qty);
  const [isDecLoading, setDecIsLoading] = useState(false);
  const [isIncLoading, setIncIsLoading] = useState(false);

  const handleIncQty = async () => {
    setIncIsLoading(true);
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await addOrUpdateItem(productId, newQuantity);
    setIncIsLoading(false);
  };
  const handleDecQty = async () => {
    setDecIsLoading(true);
    if (quantity === 1) {
      await removeItem(productId);
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await addOrUpdateItem(productId, newQuantity);
    }
    setDecIsLoading(false);
  };

  return (
    <>
      <div className="flex gap-2 items-center border border-zinc-400 rounded-xl justify-between max-w-24">
        <button onClick={handleDecQty} className="p-1 h-8 w-full">
          {isDecLoading ? (
            <Ellipsis className="animate-pulse" size={20} strokeWidth={1} />
          ) : (
            <Minus size={20} strokeWidth={1} />
          )}
        </button>
        <p className="text-sm font-semibold">{quantity}</p>

        <button
          onClick={handleIncQty}
          disabled={quantity === maxQty}
          className="p-1 h-8 w-full"
        >
          {isIncLoading ? (
            <Ellipsis className="animate-pulse" size={20} strokeWidth={1} />
          ) : (
            <Plus size={20} strokeWidth={1} />
          )}
        </button>
      </div>
    </>
  );
}

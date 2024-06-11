"use client";
import { Ellipsis, Minus, Plus } from "lucide-react";
import { useGetCart } from "@/hooks/useCartSession";
import { useEffect, useState } from "react";
import { addOrUpdateItem, removeItem } from "@/actions/CartAction";

type props = {
  productId: string;
  maxQty: number;
};

export default function QtyButtons({ productId, maxQty }: props) {
  const { data: cart, error } = useGetCart();
  const [quantity, setQuantity] = useState(0);
  const [isDecLoading, setDecIsLoading] = useState(false);
  const [isIncLoading, setIncIsLoading] = useState(false);

  useEffect(() => {
    if (cart?.items) {
      const cartItem = cart.items[productId];
      if (cartItem) {
        setQuantity(cartItem.qty);
      } else {
        setQuantity(0);
      }
    }
  }, [cart, productId]);

  const handleIncQty = async () => {
    setIncIsLoading(true);
    const newQuantity = quantity + 1;
    await addOrUpdateItem(productId, newQuantity);
    setQuantity(newQuantity);
    setIncIsLoading(false);
  };
  const handleDecQty = async () => {
    setDecIsLoading(true);
    if (quantity === 1) {
      removeItem(productId);
    } else {
      const newQuantity = quantity - 1;
      await addOrUpdateItem(productId, newQuantity);
      setQuantity(newQuantity);
    }
    setDecIsLoading(false);
  };

  return (
    <>
      <div className="flex gap-2 items-center border rounded-xl justify-between max-w-24">
        <button onClick={handleDecQty} className="p-1">
          {isDecLoading ? (
            <Ellipsis className="animate-pulse" />
          ) : (
            <Minus size={20} strokeWidth={1} />
          )}
        </button>
        <p className="text-sm font-semibold">{quantity}</p>

        <button onClick={handleIncQty} disabled={quantity === maxQty}>
          {isIncLoading ? (
            <Ellipsis className="animate-pulse" />
          ) : (
            <Plus size={20} strokeWidth={1} />
          )}
        </button>
      </div>
    </>
  );
}

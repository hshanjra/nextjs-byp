"use client";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { addOrUpdateItem, getCart } from "@/actions/CartAction";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export default function AddToCartSmall({
  className,
  size = 23,
  strokeWidth = 1,
  product,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  variant?: "standard" | "mini";
  product: Product;
}) {
  const { data: cart, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cart?.items) {
      const cartItem = cart.items[product.productId];
      if (cartItem) {
        setQuantity(cartItem.qty);
      } else {
        setQuantity(0);
      }
    }
  }, [cart, product.productId]);

  const handleAddToCart = async () => {
    setIsLoading(true);
    const newQuantity = quantity + 1;
    await addOrUpdateItem(product.productId, newQuantity);
    setQuantity(newQuantity);
    toast.success(`Product added in cart!`, {
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
    setIsLoading(false);
  };

  return (
    <>
      <Button
        className={cn("px-2 cursor-pointer rounded-lg", className)}
        disabled={isLoading}
        onClick={handleAddToCart}
      >
        {isLoading ? (
          <LoaderCircle
            className="animate-spin text-white"
            size={size}
            strokeWidth={strokeWidth}
          />
        ) : (
          <ShoppingCart
            size={size}
            strokeWidth={strokeWidth}
            className="text-white"
          />
        )}
      </Button>
    </>
  );
}

"use client";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { addOrUpdateItem } from "@/actions/CartAction";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useGetCart } from "@/hooks/useCartSession";

export default function AddToCartSmall({
  className,
  size = 23,
  strokeWidth = 1,
  product,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  product: Product;
}) {
  const { data: cart, error } = useGetCart();

  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await addOrUpdateItem(product.productId);
    toast.success(`"${product.productTitle}" has been added to your cart!`, {
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

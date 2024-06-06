"use client";
import { Plus, ShoppingCart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/store";
import { Product } from "@/types/product";
import QtyButtons from "./QtyButtons";

export default function AddToCartButton({
  className,
  size = 23,
  strokeWidth = 1,
  variant = "standard",
  product,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  variant?: "standard" | "mini";
  product: Product;
}) {
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);

  return variant === "standard" ? (
    <>
      {cartProducts.find((item) => item.productId === product.productId) ? (
        <QtyButtons productId={product.productId} />
      ) : (
        <div
          className={cn(
            "flex px-4 py-3 items-center bg-success hover:bg-successDark cursor-pointer lg:w-[150px] rounded-xl space-x-2",
            className
          )}
          onClick={() => addProduct(product)}
        >
          <Plus
            size={size}
            strokeWidth={strokeWidth}
            className="text-white cursor-pointer"
          />
          <Label className="text-white cursor-pointer font-bold">
            Add to cart
          </Label>
        </div>
      )}
    </>
  ) : (
    <>
      <div className={className} onClick={() => addProduct(product)}>
        <ShoppingCart
          size={size}
          strokeWidth={strokeWidth}
          className="bg-gray-100 p-2 cursor-pointer rounded-lg hover:text-white hover:bg-red-500"
        />
      </div>
    </>
  );
}

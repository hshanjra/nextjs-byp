"use client";
import { Ellipsis, Flame, Minus, Plus, ShoppingCart } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { addOrUpdateItem } from "@/actions/CartAction";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function AddToCartButton({
  className,
  size = 18,
  strokeWidth = 2,
  product,
  disabled,
  showQtyButtons = true,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  product: Product;
  disabled?: boolean;
  showQtyButtons?: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qty, setQty] = useState<number>(1);

  const handleAddToCart = async () => {
    setIsLoading(true);

    if (qty > product.productStock) {
      toast.error(
        `You cannot add that amount of "${product.productTitle}" to the cart because there is not enough stock.`,
      );
      setIsLoading(false);
      return;
    }

    await addOrUpdateItem(product.productId, qty);
    toast.success(`"${product.productTitle}" has been added to your cart!`, {
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
    setIsLoading(false);
  };

  const handleDecQty = () => {
    if (qty - 1 < 1) return;
    setQty(qty - 1);
  };

  const handleIncQty = () => {
    if (qty + 1 > product.productStock) return;
    setQty(qty + 1);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Qty buttons */}
      {showQtyButtons && (
        <div className="flex h-[2.875rem] w-full max-w-28 items-center justify-between gap-2 rounded-2xl border">
          <button
            onClick={handleDecQty}
            disabled={isLoading}
            className="flex h-8 w-full items-center p-1"
          >
            <Minus
              size={18}
              strokeWidth={1.5}
              className={isLoading ? "text-gray-400" : ""}
            />
          </button>

          <input
            type="text"
            name="qty"
            value={qty}
            size={4}
            min={1}
            max={product.productStock || 1}
            step={1}
            inputMode="numeric"
            autoComplete="off"
            onChange={(e) => setQty(Number(e.target.value) || 1)}
            className="h-full w-full border-none text-center text-sm font-semibold outline-none"
          />

          <button
            onClick={handleIncQty}
            disabled={isLoading}
            className="flex h-8 w-full items-center p-1"
          >
            <Plus
              size={18}
              strokeWidth={1.5}
              className={isLoading ? "text-gray-400" : ""}
            />
          </button>
        </div>
      )}

      {/* Add to cart button */}
      <Button
        className={cn(
          "flex h-[2.875rem] w-full cursor-pointer items-center space-x-2 rounded-2xl bg-success px-5 hover:bg-successDark lg:w-[150px]",
          className,
          isLoading &&
            "cursor-not-allowed hover:opacity-60 disabled:opacity-60",
        )}
        disabled={isLoading || disabled}
        onClick={handleAddToCart}
      >
        {isLoading ? (
          <Ellipsis className="animate-pulse" />
        ) : (
          <ShoppingCart
            size={size}
            strokeWidth={strokeWidth}
            className="cursor-pointer text-white"
          />
        )}

        <Label className="cursor-pointer text-[.9rem] font-semibold text-white">
          Add to cart
        </Label>
      </Button>
    </div>
  );
}

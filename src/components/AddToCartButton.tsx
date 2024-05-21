import { ShoppingCart } from "lucide-react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

export default function AddToCartButton({
  className,
  size = 23,
  strokeWidth = 1,
  variant = "standard",
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  variant?: "standard" | "mini";
}) {
  return variant === "standard" ? (
    <>
      <div
        className={cn(
          "flex px-4 py-3 items-center bg-success hover:bg-successDark cursor-pointer lg:w-[150px] rounded-xl space-x-2",
          className
        )}
      >
        <ShoppingCart
          size={size}
          strokeWidth={strokeWidth}
          className="text-white cursor-pointer"
        />
        <Label className="text-white cursor-pointer font-bold">
          Add to cart
        </Label>
      </div>
    </>
  ) : (
    <>
      <div className={className}>
        <ShoppingCart
          size={size}
          strokeWidth={strokeWidth}
          className="bg-gray-100 p-2 cursor-pointer rounded-lg hover:text-white hover:bg-red-500"
        />
      </div>
    </>
  );
}

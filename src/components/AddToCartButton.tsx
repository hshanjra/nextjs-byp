import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({
  className,
  size = 40,
  strokeWidth = 1,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
}) {
  return (
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

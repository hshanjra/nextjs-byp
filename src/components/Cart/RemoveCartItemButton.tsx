"use client";

import { removeItem } from "@/actions/CartAction";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

export default function RemoveCartItemButton({
  className,
  productId,
}: {
  className?: string;
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveItem = async () => {
    setIsLoading(true);
    await removeItem(productId);
    setIsLoading(false);
  };
  return (
    <button
      className={cn(
        `absolute top-0 -left-2 cursor-pointer bg-red-600 ${
          isLoading && "bg-red-700"
        } rounded-full  text-white`,
        className
      )}
      onClick={handleRemoveItem}
      disabled={isLoading}
    >
      <X className={cn(isLoading && "text-gray-300")} size={20} />
    </button>
  );
}

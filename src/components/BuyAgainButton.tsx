"use client";
import { addOrUpdateItem } from "@/actions/CartAction";
import { Button } from "./ui/button";
import { Loader2, Repeat } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

function BuyAgainButton({
  product,
  disabled,
}: {
  product: any;
  disabled?: boolean;
}) {
  const [buyAgainLoading, setBuyAgainLoading] = useState<boolean>(false);

  const handleBuyAgain = async (product: any) => {
    setBuyAgainLoading(true);
    await addOrUpdateItem(product.productId);
    toast.success(`"${product.productTitle}" has been added to your cart!`, {
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
    setBuyAgainLoading(false);
  };
  return (
    <Button
      variant={"outline"}
      className="flex items-center gap-2 rounded-full"
      onClick={() => handleBuyAgain(product)}
      disabled={buyAgainLoading || disabled}
    >
      {buyAgainLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <Repeat className="h-4 w-4" />
          Buy it again
        </>
      )}
    </Button>
  );
}

export default BuyAgainButton;

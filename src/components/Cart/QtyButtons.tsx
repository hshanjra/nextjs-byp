"use client";

import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

type props = {
  productId: string;
};

export default function QtyButtons({ productId }: props) {
  const { getProductById, decQty, incQty } = useStore(
    useShallow((state) => ({
      getProductById: state.getProdductById,
      decQty: state.decQty,
      incQty: state.incQty,
    }))
  );

  const p = getProductById(productId);

  return (
    <>
      {p && (
        <div className="flex gap-2 items-center border rounded-xl justify-between max-w-24">
          <button onClick={() => decQty(p.productId)} className="">
            <Minus size={20} strokeWidth={1} />
          </button>
          <p className="text-sm font-semibold">{p.qty}</p>
          <button onClick={() => incQty(p.productId)} className="p-1">
            <Plus size={20} strokeWidth={1} />
          </button>
        </div>
      )}
    </>
  );
}

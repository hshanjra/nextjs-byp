import Link from "next/link";
import CartIcon from "../icons/Cart";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { formatPrice, trimString } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import { useStore } from "@/store/store";
import Image from "next/image";
import QtyButtons from "../Cart/QtyButtons";
import { Product } from "@/types/product";

const Cart = () => {
  const cartProducts = useStore((state) => state.products);

  const itemsCount = cartProducts.length;
  const total = useStore((state) => state.totalAmt);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-x-3 cursor-pointer">
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-red-600 text-white px-[5px] py-[0.1px] rounded-full text-xs">
              {itemsCount > 9 ? "9+" : itemsCount}
            </span>
            <ShoppingCart className="h-[24px] w-[24px]" />
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs">{itemsCount} item(s)</span>
            <span>$0.00</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart ({itemsCount})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full p-0 m-0">
          {itemsCount > 0 ? (
            <>
              {/* FIXME: align gap between items */}
              <div className="flex flex-col pr-6 mt-5">
                {cartProducts.map((product: Product) => (
                  <div key={product.productId}>
                    <div className="flex items-center space-x-2">
                      {/* Image */}
                      <Image
                        src={product.productImages[0].url}
                        alt={product.productTitle}
                        height={100}
                        width={100}
                        className="border border-gray-400 rounded-lg overflow-hidden"
                      />
                      <div className="flex flex-col">
                        {/* title */}
                        <h3 className="text-sm font-semibold leading-tight">
                          {trimString(product.productTitle, 40)}
                        </h3>
                        <p className="text-xs">{product.productBrand}</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        {/* price */}
                        <h3 className="font-semibold">
                          {formatPrice(product.salePrice)}
                        </h3>
                        {/* Qty Buttons */}
                        <QtyButtons productId={product.productId} />
                      </div>
                    </div>
                    <Separator className="my-1 lg:my-2" />
                  </div>
                ))}

                <Separator />
              </div>

              <div className="space-y-4 pr-6">
                <div className="space-y-1.5 text-sm">
                  <div className="flex">
                    <span className="flex-1">Taxes</span>
                    <span>$0.00 USD</span>
                  </div>
                  <Separator />
                  <div className="flex">
                    <span className="flex-1">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <div className="flex">
                    <span className="flex-1">Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <SheetFooter>
                  <SheetTrigger asChild>
                    <Link
                      href="/cart"
                      className={buttonVariants({
                        variant: "dark",
                        className: "w-full mb-2",
                      })}
                    >
                      View Cart
                    </Link>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <Link
                      href="#"
                      className={buttonVariants({ className: "w-full mb-5" })}
                    >
                      Proceed to checkout
                    </Link>
                  </SheetTrigger>
                </SheetFooter>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  className="realtive mb-4 h-60 w-60 text-muted-foreground"
                  aria-hidden="true"
                >
                  <CartIcon className="mx-auto h-24 w-24 text-gray-400 !pointer-events-auto" />
                  <p className="text-xl text-center text-gray-400 font-semibold">
                    Your cart is empty.
                  </p>
                  <SheetTrigger asChild>
                    <Link
                      href="/products"
                      className={buttonVariants({
                        size: "sm",
                        variant: "link",
                        className: "text-sm text-muted-foreground",
                      })}
                    >
                      Add items to your cart to checkout
                    </Link>
                  </SheetTrigger>
                </div>
              </div>
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
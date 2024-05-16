import Link from "next/link";
import CartIcon from "../icons/Cart";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { formatPrice } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

const Cart = () => {
  const itemsCount = 1;
  const total = 100;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center gap-x-3 cursor-pointer">
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-red-600 text-white px-[5px] py-[0.1px] rounded-full text-xs">
              0
            </span>
            <CartIcon className="h-[24px] w-[24px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs">0 items</span>
            <span>$0.00</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart (0)</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full p-0 m-0">
          {itemsCount > 0 ? (
            <>
              {/* FIXME: align gap between items */}
              <div className="flex w-full flex-col pr-6">
                {/* TODO:Cart logic */}
                cart items
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

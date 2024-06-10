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
import Image from "next/image";
import QtyButtons from "./QtyButtons";
import { getCart } from "@/actions/CartAction";

export default async function CartSidebar() {
  // const cartProducts = useStore((state) => state.products);

  const cart = await getCart();

  const itemsCount = cart?.totalQty ? cart.totalQty : 0;
  // const total = useStore((state) => state.totalAmt);

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
            <span>{cart ? formatPrice(cart.totalAmount) : formatPrice(0)}</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart ({itemsCount})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full p-0 m-0">
          {cart ? (
            <>
              {/* FIXME: align gap between items */}
              <div className="flex flex-col pr-6 mt-5">
                {Object.entries(cart.items).map(([key, item]) => (
                  <div key={key}>
                    <div className="flex items-center space-x-2">
                      {/* Image */}
                      <Image
                        src={item.product.productImages[0].url}
                        alt={item.product.productTitle}
                        height={100}
                        width={100}
                        className="border border-gray-400 rounded-lg overflow-hidden"
                      />
                      <div className="flex flex-col">
                        {/* title */}
                        <h3 className="text-sm font-semibold leading-tight">
                          {trimString(item.product.productTitle, 40)}
                        </h3>
                        <p className="text-xs">{item.product.productBrand}</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        {/* price */}
                        <h3 className="font-semibold">
                          {formatPrice(item.product.salePrice * item.qty)}
                        </h3>
                        {/* Qty Buttons */}
                        <QtyButtons
                          productId={item.product.productId}
                          qty={10}
                        />
                      </div>
                    </div>
                    <Separator className="my-1 lg:my-2 " />
                  </div>
                ))}

                {/* <Separator /> */}
              </div>

              <div className="space-y-4 pr-6">
                <div className="space-y-1.5 text-sm">
                  <div className="flex">
                    <span className="flex-1">Taxes</span>
                    <span>{formatPrice(cart?.tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex">
                    <span className="flex-1">Shipping</span>
                    <span>
                      {cart.totalShippingPrice
                        ? formatPrice(cart.totalShippingPrice)
                        : "Calculated at checkout"}
                    </span>
                  </div>

                  <div className="flex">
                    <span className="flex-1">Total</span>
                    <span>{formatPrice(cart.totalAmount)} USD</span>
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
}

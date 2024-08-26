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

import { cn, formatPrice, trimString } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { CircleX, ShoppingCart } from "lucide-react";
import Image from "next/image";
import QtyButtons from "./QtyButtons";
import { getCart } from "@/actions/CartAction";
import CheckoutButton from "./CheckoutButton";
import RemoveCartItemButton from "./RemoveCartItemButton";

export default async function CartSidebar() {
  const cart = await getCart();

  const itemsCount = cart?.totalQty ? cart.totalQty : 0;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex cursor-pointer items-center gap-x-3 font-krub">
          <div className="relative">
            <span className="absolute -right-2 -top-2 rounded-full bg-primary px-[5px] py-[0.1px] text-xs text-white">
              {itemsCount > 9 ? "9+" : itemsCount}
            </span>
            <ShoppingCart className="h-[24px] w-[24px]" />
          </div>
          <div className="hidden flex-col -space-y-1 lg:flex">
            <span className="text-[0.6875rem] text-gray-500">
              {itemsCount} item(s)
            </span>
            <span className="text-[1rem] font-bold">
              {cart
                ? formatPrice(cart.subTotal, { notation: "compact" })
                : formatPrice(0)}
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="m-0 w-full p-0 md:w-[400px] lg:w-[450px]">
        <SheetHeader className="rounded-b-2xl px-5 py-3 shadow-custom">
          <SheetTitle>Cart ({itemsCount})</SheetTitle>
        </SheetHeader>

        {itemsCount > 0 ? (
          <section className="absolute flex h-full w-full flex-col px-1">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="mb-5 mt-3 px-3">
                {cart &&
                  Object.entries(cart.items).map(([key, item], i) => (
                    <div key={key}>
                      <div className="flex items-center justify-between gap-2">
                        {/* Image */}
                        <div className="relative h-20 w-20">
                          <Image
                            src={item.product.productImages[0].url}
                            alt={item.product.productTitle}
                            height={100}
                            width={100}
                            className="aspect-square h-full w-full overflow-hidden rounded-lg border"
                          />

                          <RemoveCartItemButton
                            productId={item.product.productId}
                          />
                        </div>
                        <div className="mr-auto flex max-w-[150px] flex-col gap-2 md:max-w-[270px] lg:max-w-[170px]">
                          {/* title */}
                          <h3 className="text-wrap p-0 text-sm font-semibold leading-tight">
                            <SheetTrigger asChild className="w-auto">
                              <Link
                                href={`/product/${item.product.productSlug}`}
                                className="w-fit hover:underline"
                                title={item.product.productTitle}
                              >
                                {trimString(item.product.productTitle, 53)}
                              </Link>
                            </SheetTrigger>
                          </h3>
                          <p
                            className="text-xs"
                            title={item.product.productBrand}
                          >
                            {item.product.productBrand}
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          {/* price */}
                          <h3 className="font-semibold">
                            {formatPrice(item.product.salePrice * item.qty)}
                          </h3>
                          {/* Qty Buttons */}
                          <QtyButtons
                            productId={item.product.productId}
                            maxQty={item.product.productStock}
                            cart={cart}
                          />
                        </div>
                      </div>
                      <Separator
                        className={cn("my-2 lg:my-2", {
                          hidden: i === itemsCount - 1,
                        })}
                      />
                    </div>
                  ))}
              </div>
            </ScrollArea>

            <div className="relative mb-10 w-full space-y-2 rounded-t-2xl border border-zinc-200 bg-zinc-200/60 px-3 pb-12 shadow-2xl">
              <div className="space-y-1.5 pt-3 text-sm">
                <div className="flex">
                  <span className="flex-1">Taxes</span>
                  <span>
                    {cart && cart.tax > 0
                      ? formatPrice(cart?.tax)
                      : "Calculated at checkout"}
                  </span>
                </div>
                <Separator />
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>
                    {cart && cart.totalShippingPrice > 0
                      ? formatPrice(cart.totalShippingPrice)
                      : "Calculated at checkout"}
                  </span>
                </div>

                <Separator />

                <div className="flex font-bold">
                  <span className="flex-1">Sub Total</span>
                  <span>{cart && formatPrice(cart.subTotal)} USD</span>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col-reverse justify-between gap-3 lg:flex-row">
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      variant: "dark",
                      className: "mb-2 w-full",
                    })}
                  >
                    View Cart
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <CheckoutButton />
                </SheetTrigger>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1 px-3">
            <div
              className="relative mb-4 h-60 w-60 text-muted-foreground"
              aria-hidden="true"
            >
              <CartIcon className="!pointer-events-auto mx-auto h-24 w-24 text-gray-400" />
              <p className="text-center text-xl font-semibold text-gray-400">
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
        )}
      </SheetContent>
    </Sheet>
  );
}

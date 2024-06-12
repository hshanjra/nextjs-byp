"use client";

import { type Cart } from "@/types/cartProduct";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { CircleX, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CouponCodeForm from "./CouponCodeForm";
import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import QtyButtons from "./QtyButtons";
import { Separator } from "../ui/separator";
import RemoveCartItemButton from "./RemoveCartItemButton";

export default function Cart({ cart }: { cart: Cart | undefined }) {
  const itemsCount = cart?.totalQty ? cart.totalQty : 0;

  if (itemsCount === 0) {
    return (
      <section className="flex h-full my-24 lg:my-32 flex-col items-center justify-center space-y-1">
        <div
          className="realtive mb-4 space-y-2 text-muted-foreground"
          aria-hidden="true"
        >
          <ShoppingCart
            className="mx-auto text-gray-400 !pointer-events-auto"
            size={150}
          />
          <p className="text-xl text-center text-gray-400 font-semibold">
            Your cart is currently empty.
          </p>
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
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row h-full items-start my-14 justify-between space-x-5 space-y-5">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] lg:w-[100px]"></TableHead>
              <TableHead className="w-[350px] lg:w-[300px]">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="hidden lg:flex items-center">
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart &&
              Object.entries(cart.items).map(([key, item]) => (
                <TableRow key={key}>
                  <TableCell>
                    <div className="relative">
                      <RemoveCartItemButton
                        productId={item.product.productId}
                      />
                      <Image
                        src={item.product.productImages[0].url}
                        alt={item.product.productTitle}
                        height={70}
                        width={70}
                        className="border rounded-lg"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <h3 className="text-sm leading-tight">
                      <Link
                        href={`/product/${item.product.productSlug}`}
                        className="hover:underline"
                      >
                        {item.product.productTitle}
                      </Link>
                    </h3>
                  </TableCell>
                  <TableCell>
                    <h3 className="font-semibold">
                      {formatPrice(item.product.salePrice)}
                    </h3>
                  </TableCell>
                  <TableCell>
                    <QtyButtons
                      productId={item.product.productId}
                      maxQty={item.product.productStock}
                      cart={cart}
                    />
                  </TableCell>
                  <TableCell>
                    <h3 className="font-semibold">
                      {formatPrice(item.product.salePrice * item.qty)}
                    </h3>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <div className="my-5">
                  <CouponCodeForm />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="w-full lg:w-[420px]">
        <Card className="w-full p-2">
          <CardHeader className="p-2">
            <CardTitle className="text-[15px] font-bold uppercase">
              Cart Totals
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex justify-between items-center text-sm space-y-1.5">
            {/* Add Subtotal and other calculations here */}
            <h3>Subtotal</h3>
            <h3>{cart && formatPrice(cart?.subTotal)}</h3>
          </CardContent>
          <Separator />
          <CardContent>
            <div className="flex justify-between items-start text-sm">
              <h3>Shipping</h3>
              <div className="flex flex-col text-right">
                <h3>{cart && formatPrice(cart?.totalShippingPrice)}</h3>
                <h3>
                  Shipping to: <b>{cart?.stateCode}</b>
                </h3>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardContent className="flex justify-between">
            <h3>Total</h3>
            <h3 className="font-bold">
              {cart && formatPrice(cart?.totalAmount)}
            </h3>
          </CardContent>
          <Separator />
          <CardContent>
            <Link href="/checkout" className={cn(buttonVariants(), "w-full")}>
              Proceed to checkout
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

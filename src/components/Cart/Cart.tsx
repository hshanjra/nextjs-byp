import { type Cart } from "@/types/cartProduct";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ShoppingCart } from "lucide-react";
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
import CouponCodeForm from "../Forms/CouponCodeForm";
import Image from "next/image";
import { cn, formatPrice, trimString } from "@/lib/utils";
import QtyButtons from "./QtyButtons";
import { Separator } from "../ui/separator";
import RemoveCartItemButton from "./RemoveCartItemButton";
import CheckoutButton from "./CheckoutButton";

export default function Cart({ cart }: { cart: Cart | undefined | null }) {
  const itemsCount = cart?.totalQty ? cart.totalQty : 0;

  if (!cart || itemsCount === 0) {
    return (
      <section className="my-24 flex h-full flex-col items-center justify-center space-y-1 lg:my-32">
        <div
          className="relative mb-4 space-y-2 text-muted-foreground"
          aria-hidden="true"
        >
          <ShoppingCart
            className="!pointer-events-auto mx-auto text-gray-400"
            size={150}
          />
          <p className="text-center text-xl font-semibold text-gray-400">
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
    <section className="my-14 flex h-full flex-col items-start justify-between space-y-5 lg:flex-row lg:space-x-5">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] px-0 font-semibold text-zinc-400 lg:w-[100px]"></TableHead>
              <TableHead className="w-[350px] px-0 font-semibold text-zinc-400 lg:w-[300px]">
                Product
              </TableHead>
              <TableHead className="hidden items-center font-semibold text-zinc-400 md:flex lg:flex">
                Price
              </TableHead>
              <TableHead className="font-semibold text-zinc-400">
                Quantity
              </TableHead>
              <TableHead className="hidden items-center font-semibold text-zinc-400 md:flex lg:flex">
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart &&
              Object.entries(cart.items).map(([key, item]) => (
                <TableRow key={key}>
                  <TableCell className="p-3 md:p-4 lg:p-4">
                    <div className="z-25 relative">
                      <RemoveCartItemButton
                        productId={item.product.productId}
                      />
                      <div className="max-w-[4.375rem] rounded-lg border">
                        <Image
                          src={item.product.productImages[0].url}
                          alt={item.product.productTitle}
                          height={300}
                          width={300}
                          className="max-w-full rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-0 md:p-4 lg:p-4">
                    <h3 className="text-xs leading-relaxed md:text-sm lg:text-sm">
                      <Link
                        href={`/product/${item.product.productSlug}`}
                        className="hover:underline"
                      >
                        {trimString(item.product.productTitle, 60)}
                      </Link>
                    </h3>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:table-cell">
                    <h3 className="font-semibold">
                      {formatPrice(item.product.salePrice)}
                    </h3>
                  </TableCell>
                  <TableCell className="p-0 px-1 md:p-4 lg:p-4">
                    <QtyButtons
                      productId={item.product.productId}
                      maxQty={item.product.productStock}
                      cart={cart}
                    />
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:table-cell">
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
                <div className="my-5 lg:max-w-sm">
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
              Order Summary
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex items-center justify-between space-y-1.5 text-sm">
            {/* Add Subtotal and other calculations here */}
            <h3>Item(s) Subtotal</h3>
            <h3>{cart && formatPrice(cart?.subTotal)}</h3>
          </CardContent>
          <Separator />
          <CardContent>
            <div className="flex items-start justify-between text-sm">
              <h3>Shipping</h3>
              <div className="flex flex-col text-right">
                <h3>{cart && formatPrice(cart?.totalShippingPrice)}</h3>
                <h3>
                  Shipping to: <b>{cart?.stateCode}</b>
                </h3>
              </div>
              {/* <p>Taxes and Shipping calculated at checkout</p> */}
            </div>
          </CardContent>
          <Separator />
          <CardContent className="flex justify-between">
            <h3>Subtotal</h3>
            <h3 className="font-bold">
              {cart && formatPrice(cart?.totalAmount)}*
            </h3>
          </CardContent>
          <Separator />
          <CardContent>
            <CheckoutButton />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

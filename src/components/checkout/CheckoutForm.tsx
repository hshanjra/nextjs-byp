"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/actions/CheckoutAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutOrderSchema } from "@/types/checkoutSchema";
import CheckoutHeader from "./CheckoutHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Separator } from "../ui/separator";
import { Cart } from "@/types/cartProduct";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatPrice } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function CheckoutForm({
  sessionId,
  cart,
}: {
  sessionId: string;
  cart: Cart;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const addressForm = useForm({
    resolver: zodResolver(checkoutOrderSchema),
    defaultValues: {
      sessionId,
      billingAddress: {
        firstName: "",
        lastName: "",
        companyName: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      shippingAddress: {
        firstName: "",
        lastName: "",
        companyName: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
  });

  const onSubmit = (data: any) => {
    execute(data);
    // await handleSubmitFrm(data);
  };

  const { execute } = useAction(createOrder, {
    onSuccess: (data) => {
      toast.success(data.success);
    },
  });

  const handleSubmitFrm = async (e: any) => {
    // addressForm.handleSubmit(onSubmit(e));
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-placed`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // execute(data);
      toast.success("Payment Success 🎉");
    } else {
      toast.error("Unexpected Error");
    }

    setIsProcessing(false);
  };

  return (
    <>
      <CheckoutHeader />

      <section className="border-t-4 border-red-500 p-5 bg-white">
        <Link
          href="/cart"
          className="flex items-center gap-x-1 font-bold uppercase tracking-tight text-sm hover:underline mb-5 text-primary"
        >
          <ArrowLeft size={20} />
          Back to cart
        </Link>
        <Separator className="my-3" />
        <div className="">
          <Form {...addressForm}>
            {/* FIXME: fix the address form */}
            <form
              onSubmit={addressForm.handleSubmit(onSubmit)}
              className="flex flex-col lg:flex-row items-start justify-between"
            >
              <div className="w-full space-y-2">
                <h3 className="font-semibold text-lg mt-2">Billing Details</h3>

                <div className="max-w-2xl">
                  <div className="flex items-center space-x-5">
                    <FormField
                      control={addressForm.control}
                      name="billingAddress.firstName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              autoComplete="firstName"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="billingAddress.lastName"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              {...field}
                              autoComplete="lastName"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={addressForm.control}
                    name="billingAddress.companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ABC Corp"
                            {...field}
                            autoComplete="CompanyName"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addressForm.control}
                    name="billingAddress.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123-456-789-0"
                            {...field}
                            autoComplete="phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addressForm.control}
                    name="billingAddress.streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1 Park Avenue"
                            {...field}
                            autoComplete="streetAddress"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-x-5">
                    <FormField
                      control={addressForm.control}
                      name="billingAddress.city"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>City:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="New Orleans"
                              {...field}
                              autoComplete="city"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="billingAddress.zipCode"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>ZIP Code:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="15989"
                              {...field}
                              autoComplete="zipCode"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={addressForm.control}
                      name="billingAddress.state"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>State:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Louisiana"
                              {...field}
                              autoComplete="state"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="max-w-xl">
                <h3 className="font-semibold text-lg mt-2">Order Summary</h3>
                {cart && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead></TableHead>
                        <TableHead>Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(cart.items).map(([key, item]) => (
                        <TableRow key={key}>
                          <TableCell>
                            <Image
                              src={item.product.productImages[0].url}
                              alt={item.product.productTitle}
                              height={70}
                              width={70}
                              className="border rounded-lg"
                            />
                          </TableCell>
                          <TableCell>
                            <h3 className="text-xs leading-tight">
                              {item.product.productTitle} x <b>{item.qty}</b>
                            </h3>
                            <span>{/* Seller Name */}</span>
                          </TableCell>
                          <TableCell>
                            <h3 className="font-semibold">
                              {formatPrice(item.product.salePrice * item.qty)}
                            </h3>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <Separator className="border-dotted border" />
                <Table>
                  <TableBody>
                    <TableRow className="flex justify-between">
                      <TableCell>Subtotal:</TableCell>
                      <TableCell>
                        <b>{formatPrice(cart.subTotal)}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between">
                      <TableCell>Shipping:</TableCell>
                      <TableCell>
                        <b>{formatPrice(cart.totalShippingPrice)}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between">
                      <TableCell>Tax:</TableCell>
                      <TableCell>
                        <b>{formatPrice(cart.tax)}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between">
                      <TableCell>
                        <b>Total:</b>
                      </TableCell>
                      <TableCell>
                        <b>{formatPrice(cart.totalAmount)}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <Separator />

                <div className="flex gap-x-5">
                  <PaymentElement className="w-[380px]" />
                </div>

                <Button
                  disabled={isProcessing || !stripe || !elements}
                  type="submit"
                  className="my-5 w-full"
                  onClick={handleSubmitFrm}
                >
                  <span id="button-text">
                    {isProcessing ? "Processing..." : "COMPLETE PURCHASE"}
                  </span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}

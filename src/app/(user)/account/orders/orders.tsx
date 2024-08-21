"use client";
import { addOrUpdateItem } from "@/actions/CartAction";
import { getAllOrders } from "@/actions/OrderAction";
import BuyAgainButton from "@/components/BuyAgainButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { ORDER_STATUS } from "@/enums";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Repeat, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Orders({ status }: { status?: ORDER_STATUS }) {
  const { data, isLoading } = useQuery({
    queryKey: [status ? status : "orders"],
    queryFn: async () => await getAllOrders({ status }),
  });

  const orders = data?.orders || [];

  const getStatusMessage = (item: any) => {
    switch (item.status) {
      case ORDER_STATUS.ORDER_DELIVERED:
        return `Delivered on ${formatDate(item.deliveredAt)}`;
      case ORDER_STATUS.ORDER_SHIPPED:
        return "Shipped";
      case ORDER_STATUS.ORDER_PLACED:
        return "Order placed";
      case ORDER_STATUS.ORDER_FAILED:
        return "Order failed";
      case ORDER_STATUS.ORDER_CANCELLED:
        return "Cancelled";
      case ORDER_STATUS.ORDER_COMPLETED:
        return "Order completed";
      case ORDER_STATUS.ORDER_PARTIALLY_DELIVERED:
        return "Partially delivered";
      case ORDER_STATUS.ORDER_PROCESSING:
        return "Order processing";
      case ORDER_STATUS.ORDER_PENDING:
      default:
        return "Not yet shipped";
    }
  };

  const buttonDisabled = (status: string, buttonName: string): boolean => {
    switch (buttonName) {
      case "productReview":
        if (status !== ORDER_STATUS.ORDER_DELIVERED) return true;
        break;

      case "sellerFeedback":
        if (status !== ORDER_STATUS.ORDER_DELIVERED) return true;
        break;

      case "trackOrder":
        if (status !== ORDER_STATUS.ORDER_SHIPPED) return true;
        break;

      default:
        return false;
    }
    return false;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h3 className="text-xl font-semibold">Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <section className="my-5">
      {/* Order */}
      {orders.length > 0 ? (
        orders.map((order, i) => (
          <section
            key={order.orderId}
            className="my-5 overflow-hidden rounded-lg border"
          >
            {/* Order Overview */}
            <div className="flex flex-col items-center justify-between gap-2 bg-zinc-200/70 p-5 lg:flex-row">
              <div className="flex items-center gap-16">
                <div className="flex flex-col text-sm uppercase">
                  <span className="text-xs">Order placed</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex flex-col text-sm uppercase">
                  <span className="text-xs">Total</span>
                  <span>{formatPrice(order.totalPrice)}</span>
                </div>
                <div className="flex flex-col text-sm uppercase">
                  <span className="text-xs">Ship to</span>
                  <span>{`${order.billingAddress.lastName} ${order.billingAddress.firstName} `}</span>
                </div>
              </div>

              <div className="flex items-center gap-16">
                <div className="flex flex-row items-center gap-2 text-sm uppercase lg:flex-col lg:items-end lg:gap-0">
                  <span className="text-xs">Order # {order.orderId}</span>
                  <div className="flex items-center gap-2">
                    <Button variant={"link"} className="px-0">
                      View Details
                    </Button>
                    <Button variant={"link"} className="px-0">
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ordered Products */}
            {order.orderItems.map((item, i) => (
              <div key={item.product.productId}>
                <div className="flex flex-col justify-between gap-5 p-5 lg:flex-row">
                  <div>
                    <h3
                      className={cn(
                        "max-w-fit rounded-full bg-zinc-500 px-2 py-1 text-sm text-white",
                        {
                          "bg-successDark text-white":
                            item.status === ORDER_STATUS.ORDER_DELIVERED ||
                            item.status === ORDER_STATUS.ORDER_COMPLETED ||
                            item.status === ORDER_STATUS.ORDER_SHIPPED,

                          "bg-red-500 text-white":
                            item.status === ORDER_STATUS.ORDER_FAILED ||
                            item.status === ORDER_STATUS.ORDER_CANCELLED,
                        },
                      )}
                    >
                      {getStatusMessage(item)}
                    </h3>

                    <div className="mt-5 flex flex-col items-center gap-2 lg:flex-row">
                      <Image
                        src={item.product.productImages[0].url}
                        alt="user"
                        width={150}
                        height={150}
                        className="aspect-square h-1/2 w-1/2 lg:h-48 lg:w-48"
                      />
                      {/* Title / Description */}
                      <div className="flex flex-col gap-2">
                        <h5 className="text-center text-2xl font-semibold uppercase lg:text-left">
                          {item.product.productTitle}
                        </h5>
                        <p className="text-center text-sm text-gray-600 lg:text-left">
                          Return window closed on 12 March 2024
                        </p>

                        <div className="flex items-center justify-center gap-3 lg:mr-auto">
                          <div className="flex items-center">
                            {item.product.partNumber && (
                              <p className="text-sm uppercase leading-8 text-gray-500">
                                Part#: {item.product.partNumber}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center">
                            <p className="text-sm leading-8 text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-center gap-5 lg:mr-auto">
                          <BuyAgainButton product={item.product} />
                          <Link
                            className={cn(
                              buttonVariants({ variant: "outline" }),
                              "rounded-full",
                            )}
                            href={`/product/${item.product.productSlug}`}
                          >
                            View product
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-y-3 lg:mt-10">
                    <Button
                      className="rounded-full"
                      disabled={buttonDisabled(item.status, "productReview")}
                    >
                      Write a product review
                    </Button>
                    <Button
                      variant={"outline"}
                      className="rounded-full"
                      disabled={buttonDisabled(item.status, "sellerFeedback")}
                    >
                      Leave seller feedback
                    </Button>

                    <Button
                      variant={"warning"}
                      className="rounded-full"
                      disabled={buttonDisabled(item.status, "trackOrder")}
                    >
                      Track Order
                    </Button>
                  </div>
                </div>
                <hr
                  className={cn("mx-5", {
                    "hidden overflow-hidden": i === order.orderItems.length - 1,
                  })}
                />
              </div>
            ))}
          </section>
        ))
      ) : (
        <div className="my-10 flex flex-col items-center justify-center gap-2">
          <p className="text-gray-500">We didn&apos;t find any orders.</p>

          <Link href={"/account/orders"} className="hover:text-red-500">
            View all orders
          </Link>
        </div>
      )}
    </section>
  );
}

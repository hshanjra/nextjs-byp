import Breadcrumb from "@/components/Breadcrumb";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/lib/utils";
import {
  CalendarDays,
  Download,
  LocateFixedIcon,
  Pencil,
  Plane,
  Repeat,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";

export default function OrdersPage() {
  return (
    <MaxWidthWrapper>
      {/* Breadcrumb*/}
      <section className="my-5">
        <Breadcrumb />
      </section>

      <section className="my-5">
        <h2 className="lead-10 mb-5 text-3xl font-extrabold text-black">
          Your Orders
        </h2>

        {/* Order Detail */}
        <Tabs defaultValue="all">
          <div className="justify-start">
            <TabsList className="inline items-start justify-start rounded-none bg-transparent md:inline lg:flex lg:space-x-2">
              <TabsTrigger
                className="rounded-none bg-transparent text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
                value="all"
              >
                Orders
              </TabsTrigger>

              <TabsTrigger
                className="rounded-none !bg-transparent text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
                value="pending"
              >
                Not Yet Shipped
              </TabsTrigger>

              <TabsTrigger
                className="rounded-none !bg-transparent text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-orange-600"
                value="cancelled"
              >
                Cancelled
              </TabsTrigger>
            </TabsList>

            <Separator />
          </div>

          <TabsContent value="all">
            {/* All Order Detail Goes */}
            <section className="my-5">
              <div className="flex items-center justify-between">
                <h2 className="lead-10 text-lg font-semibold text-black">
                  All Orders
                </h2>

                <div>
                  <Select>
                    <SelectTrigger className="w-[150px] lg:w-[200px]">
                      <SelectValue placeholder="past 3 months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="30-days">last 30 days</SelectItem>
                        <SelectItem value="3-months">past 3 months</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <section className="my-5 overflow-hidden rounded-lg border">
                  {/* Order Overview */}
                  <div className="flex flex-col items-center justify-between gap-2 bg-zinc-200/70 p-5 lg:flex-row">
                    <div className="flex items-center gap-16">
                      <div className="flex flex-col text-sm uppercase">
                        <span className="text-xs">Order placed</span>
                        <span>27 June 2024</span>
                      </div>
                      <div className="flex flex-col text-sm uppercase">
                        <span className="text-xs">Total</span>
                        <span>{formatPrice(1000)}</span>
                      </div>
                      <div className="flex flex-col text-sm uppercase">
                        <span className="text-xs">Ship to</span>
                        <span>John Doe</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-16">
                      <div className="flex flex-row items-center gap-2 text-sm uppercase lg:flex-col lg:items-end lg:gap-0">
                        <span className="text-xs">
                          Order # 412-0588267-9429906
                        </span>
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
                  {/* Order Summary */}
                  <div className="flex flex-col justify-between gap-5 p-5 lg:flex-row">
                    <div>
                      <h3 className="max-w-fit rounded-full bg-successDark px-2 py-1 text-sm text-white">
                        Delivered 29 June
                      </h3>

                      <div className="mt-5 flex items-center gap-2">
                        <Image
                          src="/images/deal-1.jpg"
                          alt="user"
                          width={150}
                          height={150}
                          className="aspect-square h-32 w-32"
                        />
                        {/* Title / Description */}
                        <div className="flex flex-col gap-2">
                          <h5 className="text-2xl font-semibold">
                            VISION® – 147 DAYTONA Hyper Silver
                          </h5>
                          <p className="text-sm text-gray-600">
                            Return window closed on 12 March 2024
                          </p>

                          {/* Actions */}
                          <div className="flex items-center gap-5">
                            <Button
                              variant={"outline"}
                              className="flex items-center gap-2 rounded-full"
                            >
                              <Repeat className="h-4 w-4" />
                              Buy it again
                            </Button>
                            <Button
                              variant={"outline"}
                              className="rounded-full"
                            >
                              View product
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-y-5 lg:mt-10">
                      <Button className="rounded-full">
                        Write a product review
                      </Button>
                      <Button variant={"outline"} className="rounded-full">
                        Leave seller feedback
                      </Button>
                    </div>
                  </div>
                </section>

                <div className="mt-7 rounded-lg border border-gray-300 pt-9">
                  {/* order detail section */}
                  <div className="flex items-center justify-between px-3 max-md:flex-col md:px-11">
                    <div className="data">
                      <p className="whitespace-nowrap text-lg font-medium leading-8 text-black">
                        Order ID :
                        <span className="text-lg font-semibold underline">
                          #10234987
                        </span>
                      </p>
                      <p className="mt-3 whitespace-nowrap text-lg font-medium leading-8 text-black">
                        Order Status :
                        <span className="text-lg font-semibold text-green-500">
                          Delivered
                        </span>
                      </p>
                      <p className="mt-3 whitespace-nowrap text-lg font-medium leading-8 text-black">
                        Order Payment :
                        <span className="text-lg font-semibold underline">
                          18th March 2021
                        </span>
                      </p>
                      <p className="mt-3 whitespace-nowrap text-lg font-medium leading-8 text-black">
                        Delivery Date :
                        <span className="text-lg font-semibold underline">
                          23rd March 2021
                        </span>
                      </p>
                    </div>
                    <div className="inline items-center gap-3 space-x-5 max-md:mt-5 md:grid md:space-x-0 lg:flex lg:space-x-0">
                      <button className="mb-4 rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 hover:shadow-gray-200 md:mb-0 lg:mb-0">
                        Show Invoice
                      </button>
                      <button className="rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 hover:shadow-gray-200">
                        Buy Now
                      </button>
                      <button className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-600 hover:shadow-red-400">
                        Delete
                      </button>
                    </div>
                  </div>

                  <Separator className="my-9" />

                  <div className="flex items-center gap-8 px-3 max-lg:flex-col md:px-11 lg:gap-24">
                    <div className="grid w-full grid-cols-4">
                      <div className="col-span-4 overflow-hidden rounded-md border sm:col-span-1">
                        <img
                          src="/images/deal-1.jpg"
                          alt=""
                          className="max-sm:mx-auto"
                        />
                      </div>
                      <div className="col-span-4 flex flex-col justify-center max-sm:mt-4 max-sm:items-center sm:col-span-3 sm:pl-8">
                        <h6 className="mb-3 whitespace-nowrap text-sm font-semibold leading-9 text-black md:text-xl lg:text-2xl">
                          VISION® – 147 DAYTONA Hyper Silver
                        </h6>
                        <p className="mb-4 whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                          In Stock
                        </p>
                        <div className="flex items-center gap-x-10 gap-y-3 max-sm:flex-col">
                          <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                            SKU: AG3KO9ED
                          </span>
                          <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                            Qty: 1
                          </span>
                          <p className="whitespace-nowrap text-xl font-semibold leading-8 text-black">
                            Price $80.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-around sm:pl-28 lg:pl-0">
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                          Status
                        </p>
                        <p className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-green-500">
                          Delivered
                        </p>
                      </div>
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                          Delivery Expected by
                        </p>
                        <p className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-black">
                          23rd March 2021
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-9" />

                  <div className="flex items-center gap-8 px-3 max-lg:flex-col md:px-11 lg:gap-24">
                    <div className="grid w-full grid-cols-4">
                      <div className="col-span-4 overflow-hidden rounded-md border sm:col-span-1">
                        <img
                          src="/images/deal-2.jpg"
                          alt=""
                          className="max-sm:mx-auto"
                        />
                      </div>

                      <div className="col-span-4 flex flex-col justify-center max-sm:mt-4 max-sm:items-center sm:col-span-3 sm:pl-8">
                        <h6 className="mb-3 whitespace-nowrap text-sm font-semibold leading-9 text-black md:text-xl lg:text-2xl">
                          RADAR DIMAX AS-8 215_55R17 94V
                        </h6>
                        <p className="mb-4 whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                          In Stock
                        </p>
                        <div className="flex items-center gap-x-10 gap-y-3 max-sm:flex-col">
                          <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                            SKU: AG3KO9ED
                          </span>
                          <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                            Qty: 1
                          </span>
                          <p className="whitespace-nowrap text-xl font-semibold leading-8 text-black">
                            Price $80.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-around sm:pl-28 lg:pl-0">
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                          Status
                        </p>
                        <p className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-red-500">
                          Cancelled
                        </p>
                      </div>
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                          Delivery Expected by
                        </p>
                        <p className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-black">
                          23rd March 2021
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-9" />

                  <div className="flex items-center justify-between px-3 max-sm:flex-col-reverse md:px-11">
                    <div className="flex items-center max-sm:flex-col-reverse">
                      <button className="group flex items-center gap-3 border-gray-300 py-10 pr-8 text-xl font-normal leading-8 text-gray-500 transition-all duration-500 hover:text-primary sm:border-r">
                        <X />
                        Show Similar Products
                        {/* cancel order */}
                      </button>
                      <p className="text-xl font-normal leading-8 text-gray-500 sm:pl-8">
                        Payment Is Succesfull
                      </p>
                    </div>
                    <p className="text-xl font-medium leading-8 text-black max-sm:py-4">
                      <span className="text-gray-500">Total Price: </span>
                      &nbsp;$200.00
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* All Order Detail End  */}
          </TabsContent>

          <TabsContent value="pending">
            <section>
              <h2 className="lead-10 my-9 text-3xl font-extrabold text-black">
                Pending Order List
              </h2>

              <div className="rounded-md border p-4">
                <div className="items-center justify-between pt-8 md:flex lg:flex">
                  <p className="mb-4 whitespace-nowrap text-base font-medium leading-8 text-gray-500 md:mb-0 lg:mb-0">
                    Order ID :
                    <span className="ml-3 text-lg font-semibold text-black">
                      #10234987
                    </span>
                  </p>

                  <div className="flex items-center gap-3">
                    <button className="flex items-center rounded-md border bg-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-500">
                      <LocateFixedIcon className="mr-1 h-4 w-4" />
                      Track Order
                    </button>
                    <button className="rounded-md px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-500 hover:border hover:text-primary">
                      Show Invoice
                    </button>
                  </div>
                </div>

                <div>
                  <p className="whitespace-nowrap text-base font-medium leading-8 text-gray-500">
                    Order Date :
                    <span className="ml-3 text-lg font-semibold text-black">
                      Feb 16, 2023
                    </span>
                  </p>
                  <p className="mb-4 flex whitespace-nowrap text-base font-medium leading-8 text-gray-500 md:mb-0 lg:mb-0">
                    Estimated Delivery :
                    <span className="ml-3 flex items-center text-lg font-semibold text-green-500">
                      <Plane className="mr-1 h-4 w-4" />
                      May 16, 2023
                    </span>
                  </p>
                </div>
                <Separator className="my-5" />

                <div className="flex items-center gap-8 px-3 max-lg:flex-col md:px-11 lg:gap-24">
                  <div className="grid w-full grid-cols-4">
                    <div className="col-span-4 overflow-hidden rounded-md border sm:col-span-1">
                      <img
                        src="/images/deal-1.jpg"
                        alt=""
                        className="max-sm:mx-auto"
                      />
                    </div>
                    <div className="col-span-4 flex flex-col justify-center max-sm:mt-4 max-sm:items-center sm:col-span-3 sm:pl-8">
                      <h6 className="mb-3 whitespace-nowrap text-sm font-semibold leading-9 text-black md:text-xl lg:text-2xl">
                        VISION® – 147 DAYTONA Hyper Silver
                      </h6>
                      <p className="mb-4 whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                        In Stock
                      </p>

                      <div className="flex items-center gap-x-10 gap-y-3 max-sm:flex-col">
                        <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                          SKU: AG3KO9ED
                        </span>
                        <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                          Qty: 1
                        </span>
                        <p className="whitespace-nowrap text-xl font-semibold leading-8 text-black">
                          Price $80.00
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-around sm:pl-28 lg:pl-0">
                    <div className="flex flex-col items-start justify-center max-sm:items-center">
                      <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                        Payment
                      </p>
                      <p className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-green-500">
                        Online
                      </p>
                    </div>

                    <div className="flex flex-col items-start justify-center max-sm:items-center">
                      <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                        Action
                      </p>
                      <p className="flex gap-4 whitespace-nowrap text-left text-lg font-semibold leading-8 text-black">
                        <Pencil className="mr-1 h-4 w-4 hover:text-primary" />
                        <Trash2 className="mr-1 h-4 w-4 hover:text-primary" />
                        <Download className="mr-1 h-4 w-4 hover:text-primary" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Delivered Order List End */}
          <TabsContent value="cancelled">
            <section className="py-5">
              <h2 className="lead-10 text-3xl font-extrabold text-black">
                Cancel Order
              </h2>
              <div className="mx-auto w-full max-w-7xl md:px-8 lg:px-4">
                <div className="mt-7 rounded-lg border border-gray-300 pt-9">
                  {/* order detail section */}
                  <div className="flex items-center justify-between px-3 max-md:flex-col md:px-11">
                    <div className="data">
                      <p className="whitespace-nowrap text-lg font-medium leading-8 text-black">
                        Order ID :
                        <span className="text-lg font-semibold underline">
                          #10234987
                        </span>
                      </p>
                      <p className="mt-3 whitespace-nowrap text-lg font-medium leading-8 text-black">
                        Order Status :
                        <span className="ml-2 text-lg font-semibold text-primary">
                          Cancel
                        </span>
                      </p>
                      <p className="mt-3 whitespace-nowrap text-lg font-medium leading-8 text-black">
                        Order Payment :
                        <span className="text-lg font-semibold underline">
                          Refund
                        </span>
                      </p>
                      {/* <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                        Delivery Date :
                        <span className="underline text-lg font-semibold">
                          23rd March 2021
                        </span>
                      </p> */}
                    </div>
                    <div className="inline items-center gap-3 space-x-5 max-md:mt-5 md:grid md:space-x-0 lg:flex lg:space-x-0">
                      {/* <button className="rounded-full px-7 py-3 lg:mb-0 md:mb-0 mb-4 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                        Show Invoice
                      </button> */}
                      <button className="rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 hover:shadow-gray-200">
                        Buy Now
                      </button>
                      <button className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-red-600 hover:shadow-red-400">
                        Delete
                      </button>
                    </div>
                  </div>

                  <Separator className="my-9" />

                  <div className="flex items-center gap-8 px-3 max-lg:flex-col md:px-11 lg:gap-24">
                    <div className="grid w-full grid-cols-4">
                      <div className="col-span-4 overflow-hidden rounded-md border sm:col-span-1">
                        <img
                          src="/images/deal-1.jpg"
                          alt=""
                          className="max-sm:mx-auto"
                        />
                      </div>
                      <div className="col-span-4 flex flex-col justify-center max-sm:mt-4 max-sm:items-center sm:col-span-3 sm:pl-8">
                        <h6 className="mb-3 whitespace-nowrap text-sm font-semibold leading-9 text-black md:text-xl lg:text-2xl">
                          VISION® – 147 DAYTONA Hyper Silver
                        </h6>
                        <p className="mb-4 whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                          In Stock
                        </p>
                        <div className="flex items-center gap-x-10 gap-y-3 max-sm:flex-col">
                          <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                            SKU: AG3KO9ED
                          </span>
                          <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                            Qty: 1
                          </span>
                          <p className="whitespace-nowrap text-xl font-semibold leading-8 text-black">
                            Price $80.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-around sm:pl-28 lg:pl-0">
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                          Status
                        </p>
                        <p className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-primary">
                          Cancelled
                        </p>
                      </div>
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                          Cancle Date
                        </p>
                        <h2 className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-black">
                          March 24, 2023
                        </h2>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-9" />

                  <div className="flex items-center gap-8 px-3 max-lg:flex-col md:px-11 lg:gap-24">
                    <div className="grid w-full grid-cols-4">
                      <div className="col-span-4 overflow-hidden rounded-md border sm:col-span-1">
                        <img
                          src="/images/deal-2.jpg"
                          alt=""
                          className="max-sm:mx-auto"
                        />
                      </div>

                      <div className="col-span-4 flex flex-col justify-center max-sm:mt-4 max-sm:items-center sm:col-span-3 sm:pl-8">
                        <h6 className="mb-3 whitespace-nowrap text-sm font-semibold leading-9 text-black md:text-xl lg:text-2xl">
                          RADAR DIMAX AS-8 215_55R17 94V
                        </h6>
                        <p className="mb-4 whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                          In Stock
                        </p>
                        <div className="flex items-center gap-x-10 gap-y-3 max-sm:flex-col">
                          <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                            SKU: AG3KO9ED
                          </span>
                          <span className="whitespace-nowrap text-lg font-normal leading-8 text-gray-500">
                            Qty: 1
                          </span>
                          <p className="whitespace-nowrap text-xl font-semibold leading-8 text-black">
                            Price $80.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-around sm:pl-28 lg:pl-0">
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                          Status
                        </p>
                        <p className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-red-500">
                          Cancelled
                        </p>
                      </div>
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <p className="mb-2 whitespace-nowrap text-left text-lg font-normal leading-8 text-gray-500">
                          Delivery Expected by
                        </p>
                        <p className="whitespace-nowrap text-left text-lg font-semibold leading-8 text-black">
                          23rd March 2021
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-9" />

                  <div className="flex items-center justify-between px-3 max-sm:flex-col-reverse md:px-11">
                    <div className="flex items-center max-sm:flex-col-reverse">
                      <button className="group flex items-center gap-3 border-gray-300 py-10 pr-8 text-xl font-normal leading-8 text-gray-500 transition-all duration-500 hover:text-primary sm:border-r">
                        <X />
                        Show Similar Products
                        {/* cancel order */}
                      </button>
                      <p className="text-xl font-normal leading-8 text-gray-500 sm:pl-8">
                        Total Amount
                      </p>
                    </div>
                    <p className="text-xl font-medium leading-8 text-black max-sm:py-4">
                      <span className="text-gray-500">Total Price: </span>
                      &nbsp;$200.00
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </MaxWidthWrapper>
  );
}

import Breadcrumb from "@/components/Breadcrumb";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
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
import {
  Download,
  Loader2,
  LocateFixedIcon,
  Pencil,
  Plane,
  Repeat,
  Trash2,
  X,
} from "lucide-react";
import Orders from "./orders";
import { ORDER_STATUS } from "@/enums";

export default function OrdersPage() {
  const currentYear = new Date().getFullYear();

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

          <TabsContent value="all" aria-selected="false">
            {/* Title & Filter */}
            <div className="my-5 flex items-center justify-between">
              <h2 className="lead-10 text-lg font-semibold capitalize text-black">
                All Orders
              </h2>

              <div>
                <Select defaultValue="3-months">
                  <SelectTrigger className="w-[150px] lg:w-[200px]">
                    <SelectValue placeholder="Past 3 months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="30-days">Last 30 days</SelectItem>
                      <SelectItem value="3-months">Past 3 months</SelectItem>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <SelectItem value={`${currentYear - i}`}>
                          {currentYear - i}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Orders />
          </TabsContent>

          <TabsContent value="pending">
            {/* Title & Filter */}
            <div className="my-5 flex items-center justify-between">
              <h2 className="lead-10 text-lg font-semibold capitalize text-black">
                Not Yet Shipped Orders
              </h2>

              <div>
                <Select defaultValue="3-months">
                  <SelectTrigger className="w-[150px] lg:w-[200px]">
                    <SelectValue placeholder="Past 3 months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="30-days">Last 30 days</SelectItem>
                      <SelectItem value="3-months">Past 3 months</SelectItem>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <SelectItem value={`${currentYear - i}`}>
                          {currentYear - i}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Orders status={ORDER_STATUS.ORDER_PENDING} />
            {/* <section>
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
            </section> */}
          </TabsContent>

          {/* Delivered Order List End */}
          <TabsContent value="cancelled">
            <div className="my-5 flex items-center justify-between">
              <h2 className="lead-10 text-lg font-semibold capitalize text-black">
                Cancelled Orders
              </h2>

              <div>
                <Select defaultValue="3-months">
                  <SelectTrigger className="w-[150px] lg:w-[200px]">
                    <SelectValue placeholder="Past 3 months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="30-days">Last 30 days</SelectItem>
                      <SelectItem value="3-months">Past 3 months</SelectItem>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <SelectItem value={`${currentYear - i}`}>
                          {currentYear - i}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Orders status={ORDER_STATUS.ORDER_CANCELLED} />
          </TabsContent>
        </Tabs>
      </section>
    </MaxWidthWrapper>
  );
}

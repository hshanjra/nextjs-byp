import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const CUS_MENU = [
  {
    name: "Help Center",
    link: "/help-center",
  },
  {
    name: "Shipping & Delivery",
    link: "/shipping-delivery",
  },
  {
    name: "Returns & Refunds",
    link: "/returns-refunds",
  },
  {
    name: "My Orders",
    link: "/orders",
  },
  {
    name: "Buy Gift Cards",
    link: "/buy-gift-cards",
  },
  {
    name: "FAQs",
    link: "/faqs",
  },
];
const STORE_MENU = [
  {
    name: "About Buyurparts",
    link: "/about",
  },
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    name: "Terms & Conditions",
    link: "/terms-and-conditions",
  },
  {
    name: "Cookie Policy",
    link: "/cookie-policy",
  },
  {
    name: "Sell on Buyurparts",
    link: "/sell",
  },
];

export function Footer() {
  return (
    <footer className="lg:mt-10 sm:my-25 lg:my-auto">
      <MaxWidthWrapper className="lg:pb-auto py-10">
        <div className="grid lg:grid-cols-6 lg:gap-x-2">
          <div className="lg:border-r border-gray-100/30 col-span-2 text-center lg:text-left space-y-4">
            <Link href="/">
              <Image
                className="invert grayscale mx-auto lg:mx-0"
                src="/images/logo.webp"
                alt="logo"
                height={140}
                width={140}
              />
            </Link>
            <h3 className="mb-3 mt-7 font-bold text-base">
              Your Trusted Source for Quality Auto Parts
            </h3>
            <p className="text-[0.875rem] text-muted-foreground">
              BuyUrParts is your premier destination for high-quality auto parts
              and accessories. We offer a vast selection of components for all
              vehicle makes and models, ensuring you find exactly what you need
              to keep your car running smoothly.
            </p>
            <Link
              href="mailto:info@buyurparts.com"
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "mx-0 px-0"
              )}
            >
              info@buyurparts.com
            </Link>
          </div>
          <div className="lg:col-span-2 ml-10">
            <h3 className="mb-3 font-bold text-base">Need Help?</h3>
            <h2 className="text-2xl font-bold">(+1) 1234 5678 90</h2>

            <div className="my-3 flex flex-col text-muted-foreground">
              <span>Monday &#x2010; Friday: 9:00-20:00</span>
              <span>Saturady: 11:00 &#x2010; 15:00</span>
            </div>
            <Link
              href="mailto:support@buyurparts.com"
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "mx-0 px-0"
              )}
            >
              support@buyurparts.com
            </Link>
          </div>

          <div>
            <h3 className="mb-3 font-bold text-base">Customer Service</h3>

            <ol className="text-base">
              {CUS_MENU.map((item) => (
                <li className="my-2 text-gray-300" key={item.link}>
                  <Link href={item.link} className="text-sm hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-base">Store Information</h3>
            <ol className="text-base">
              {STORE_MENU.map((item) => (
                <li className="my-2 text-gray-300" key={item.link}>
                  <Link href={item.link} className="text-sm hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row border-y py-3 my-3 border-gray-100/30 items-center lg:justify-center">
          <span className="text-sm font-bold">
            -5% for all order in this week Shop now
          </span>
          <Separator
            orientation="vertical"
            className="hidden h-5 lg:block opacity-40 mx-5"
          />
          <span className="text-sm font-bold">
            Free delivery for all orders over $200
          </span>
        </div>
        {/* Copyright / Card Brands */}
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center space-y-5">
          <div>
            <span className="text-xs mx-auto">
              Copyright {new Date().getFullYear()} &copy;{" "}
              <Link href="/" className="hover:underline ">
                Buyurparts.com
              </Link>
              . All rights reserved.
            </span>
          </div>
          <div>
            <Image
              src="/images/credit-cards.png"
              alt="credit cards"
              height={32}
              width={364}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
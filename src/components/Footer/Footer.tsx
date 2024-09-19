import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Logo from "../Logo";
import Newsletter from "../Newsletter";
import { Wrapper } from "./Wrapper";
import { SITE_METADATA } from "@/constants";

const CUS_MENU = [
  {
    name: "Help Center",
    link: "/help-center",
  },
  {
    name: "Shipping & Delivery",
    link: "/terms-and-conditions#shippingDelivery",
  },
  {
    name: "Returns & Refunds",
    link: "/terms-and-conditions#returnRefunds",
  },
  {
    name: "My Orders",
    link: "/account/orders",
  },
  {
    name: "Buy Gift Cards",
    link: "/buy-gift-cards",
  },
  {
    name: "FAQs",
    link: "/help-center#faqs",
  },
];

const STORE_MENU = [
  {
    name: "About Buyurparts",
    link: "/about-us",
  },
  {
    name: "Privacy Policy",
    link: "/terms-and-conditions#privacyPolicy",
  },
  {
    name: "Terms & Conditions",
    link: "/terms-and-conditions",
  },
  {
    name: "Cookie Policy",
    link: "/terms-and-conditions#cookiePolicy",
  },
  {
    name: "Sell on Buyurparts",
    link: "/sell",
  },
];

export function Footer() {
  return (
    <Wrapper>
      <Newsletter />
      <footer>
        <MaxWidthWrapper className="lg:pb-auto my-25 py-10 lg:my-auto lg:mt-10">
          {/* Desktop Footer */}
          <div className="hidden grid-cols-6 gap-x-2 lg:grid">
            <div className="col-span-2 mr-2 space-y-4 border-r border-gray-100/30 text-left">
              <Logo className="mx-auto lg:mx-0" variant="light" />
              <h3 className="mb-3 mt-7 text-base font-bold">
                Your Trusted Source for Quality Auto Parts
              </h3>
              <p className="text-[0.875rem] text-muted-foreground">
                BuyUrParts is your premier destination for high-quality auto
                parts and accessories. We offer a vast selection of components
                for all vehicle makes and models, ensuring you find exactly what
                you need to keep your car running smoothly.
              </p>
              <Link
                href={`mailto:${SITE_METADATA.email}`}
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "mx-0 px-0",
                )}
              >
                {SITE_METADATA.email}
              </Link>
            </div>
            <div className="col-span-2 ml-10">
              <h3 className="mb-3 text-base font-bold">Need Help?</h3>
              <h2 className="text-2xl font-bold">{SITE_METADATA.phone}</h2>

              <div className="my-3 flex flex-col text-muted-foreground">
                <span>Monday &#x2010; Friday: 9:00-20:00</span>
                <span>Saturday: 11:00 &#x2010; 15:00</span>
              </div>
              <Link
                href={`mailto:${SITE_METADATA.supportEmail}`}
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "mx-0 px-0",
                )}
              >
                {SITE_METADATA.supportEmail}
              </Link>
            </div>

            <div>
              <h3 className="mb-3 text-base font-bold">Customer Service</h3>

              <ol className="list-none text-base">
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
              <h3 className="mb-3 text-base font-bold">Store Information</h3>
              <ol className="list-none text-base">
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

          {/* Mobile Footer */}
          <div className="lg:hidden">
            <div className="space-y-1 text-center">
              <h3 className="text-base font-bold">Need Help?</h3>
              <h2 className="text-2xl font-bold">{SITE_METADATA.phone}</h2>

              <div className="my-1 flex flex-col text-muted-foreground">
                <span>Monday &#x2010; Friday: 9:00-20:00</span>
                <span>Saturday: 11:00 &#x2010; 15:00</span>
              </div>
              <Link
                href={`mailto:${SITE_METADATA.supportEmail}`}
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "mx-0 px-0",
                )}
              >
                {SITE_METADATA.supportEmail}
              </Link>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="menu-1">
                  <AccordionTrigger>Customer Service</AccordionTrigger>
                  <AccordionContent>
                    <ol className="text-base">
                      {CUS_MENU.map((item) => (
                        <li className="text-gray-300" key={item.link}>
                          <Link
                            href={item.link}
                            className="text-sm hover:underline"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="menu-2">
                  <AccordionTrigger>Store Information</AccordionTrigger>
                  <AccordionContent>
                    <ol className="text-base">
                      {STORE_MENU.map((item) => (
                        <li className="text-gray-300" key={item.link}>
                          <Link
                            href={item.link}
                            className="text-sm hover:underline"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div className="my-3 flex flex-col items-center justify-center border-y border-gray-100/30 py-3 lg:flex-row">
            <span className="text-sm font-bold">
              -5% for all order in this week Shop now
            </span>
            <Separator
              orientation="vertical"
              className="mx-5 hidden h-5 opacity-40 lg:block"
            />
            <span className="text-sm font-bold">
              Free delivery for all orders over $200
            </span>
          </div>
          {/* Copyright / Card Brands */}
          <div className="flex flex-col-reverse items-center space-y-5 lg:flex-row lg:justify-between">
            <div>
              <span className="mx-auto text-xs">
                Copyright {new Date().getFullYear()} &copy;{" "}
                <Link href="/" className="hover:underline">
                  {SITE_METADATA.name}
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
                priority={true}
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    </Wrapper>
  );
}

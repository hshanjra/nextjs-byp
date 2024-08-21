import AccountHeader from "@/components/AccountHeader";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  BookUser,
  CarFront,
  CreditCard,
  Headset,
  Package,
  UserRound,
} from "lucide-react";
import Link from "next/link";

const ACCOUNT_LIST = [
  {
    icon: <Package size={50} strokeWidth={0.5} />,
    name: "Your Orders",
    href: "/account/orders",
    desc: "Track/Return your orders",
  },
  {
    icon: <BookUser size={50} strokeWidth={0.5} />,
    name: "Addresses",
    href: "/account/addresses",
    desc: "Edit addresses for orders",
  },
  {
    icon: <UserRound size={50} strokeWidth={0.5} />,
    name: "Account Details",
    href: "/account/profile",
    desc: "Edit name, password and more.",
  },
  {
    icon: <CreditCard size={50} strokeWidth={0.5} />,
    name: "Payment Methods",
    href: "/account/payment-methods",
    desc: "Add/edit payment methods",
  },
  {
    icon: <CarFront size={50} strokeWidth={0.5} />,
    name: "Vehicles",
    href: "/account/vehicles",
    desc: "Manage your saved vehicles.",
  },
  {
    icon: <Headset size={50} strokeWidth={0.5} />,
    name: "Contact Us",
    href: "/contact-us",
    desc: "",
  },
];

export default function AccountPage() {
  return (
    <MaxWidthWrapper>
      <section className="my-5 lg:m-10">
        <AccountHeader />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {ACCOUNT_LIST.map((list) => (
            <div
              key={list.href}
              className="rounded-lg border hover:bg-gray-100"
            >
              <Link
                href={list.href}
                className="flex flex-col items-center space-x-3 px-3 py-5 lg:flex-row lg:py-7"
              >
                {/* Icon */}
                {list.icon}
                <div className="flex flex-col">
                  <h5 className="text-center font-medium lg:text-left">
                    {list.name}
                  </h5>
                  <p className="text-center text-sm text-gray-600 lg:text-left">
                    {list.desc}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Browsing history */}
      </section>
    </MaxWidthWrapper>
  );
}

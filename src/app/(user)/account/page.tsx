import CustomImage from "@/components/CustomImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  BookUser,
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
    href: "/account/orders",
    desc: "Edit addresses for orders",
  },
  {
    icon: <UserRound size={50} strokeWidth={0.5} />,
    name: "Account Details",
    href: "/account/orders",
    desc: "Edit name, password and more.",
  },
  {
    icon: <CreditCard size={50} strokeWidth={0.5} />,
    name: "Payment Methods",
    href: "/account/payment-methods",
    desc: "Add/edit payment methods",
  },
  {
    icon: <Headset size={50} strokeWidth={0.5} />,
    name: "Contact Us",
    href: "/contact",
    desc: "",
  },
];

export default function AccountPage() {
  return (
    <MaxWidthWrapper>
      <section className="my-5 lg:m-10">
        <h3 className="text-xl font-semibold my-5">Your Account</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {ACCOUNT_LIST.map((list) => (
            <div
              key={list.href}
              className="hover:bg-gray-100 rounded-lg border "
            >
              <Link
                href={list.href}
                className="flex flex-col lg:flex-row items-center px-3 py-5 lg:py-7 space-x-3"
              >
                {/* Icon */}
                {list.icon}
                <div className="flex flex-col">
                  <h5 className="font-medium text-center lg:text-left">
                    {list.name}
                  </h5>
                  <p className="text-sm text-gray-600">{list.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  );
}

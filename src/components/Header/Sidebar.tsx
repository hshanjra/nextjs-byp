import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import CategoryItems from "./CategoryList";
import { Menu } from "lucide-react";
import Logo from "../Logo";
import { SITE_METADATA } from "@/constants";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger aria-label="toggle menu">
        <Menu size={30} className="cursor-pointer" strokeWidth={1} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[350px] p-0">
        <ScrollArea className="h-screen p-5">
          {/* Logo */}

          <Logo className="mx-auto" />

          <div className="flex flex-col space-y-10">
            {/* Main Menu */}
            <div className="space-y-5">
              <h3 className="text-xs font-semibold text-gray-500 text-opacity-55">
                MAIN MENU
              </h3>
              <nav className="flex flex-col space-y-2 font-semibold">
                <SheetTrigger asChild>
                  <Link href="/">Home</Link>
                </SheetTrigger>
                <span className="border-b"></span>
                <SheetTrigger asChild>
                  <Link href="/products">Shop</Link>
                </SheetTrigger>
                <span className="border-b"> </span>
                <SheetTrigger asChild>
                  <Link href="/track-order">Order Tracking</Link>
                </SheetTrigger>
                <span className="border-b"> </span>
                <SheetTrigger asChild>
                  <Link href="/account">My Account</Link>
                </SheetTrigger>
                <span className="border-b"> </span>
                <SheetTrigger asChild>
                  <Link href="/blogs">Blogs</Link>
                </SheetTrigger>
                <span className="border-b"> </span>
                <SheetTrigger asChild>
                  <Link href="/about-us">About Us</Link>
                </SheetTrigger>
              </nav>
            </div>
            {/* Category Menu */}
            <div className="space-y-5">
              <h3 className="text-xs font-semibold text-gray-500 text-opacity-55">
                CATEGORY MENU
              </h3>
              {/* Category List */}

              <CategoryItems />
            </div>
            {/* Contact */}
            <div className="space-y-5">
              <h3 className="text-xs font-semibold text-gray-500 text-opacity-55">
                CONTACT DETAILS
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="font-semibold">{SITE_METADATA.phone}</div>
                <span className="text-xs">
                  You can call anytime from 9 am to 6 pm.
                </span>
                <div className="font-semibold">{SITE_METADATA.email}</div>
                <span className="text-xs">
                  The e-mail you sent will be returned as soon as possible.
                </span>
              </div>
            </div>
          </div>

          <SheetFooter className="mt-10">
            <span className="mx-auto text-xs">
              Copyright {new Date().getFullYear()} &copy;{" "}
              <Link href="/" className="hover:underline">
                {SITE_METADATA.name}
              </Link>
              . All rights reserved.
            </span>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
export default Sidebar;

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
              <h3 className="text-gray-500 text-opacity-55 text-xs font-semibold">
                MAIN MENU
              </h3>
              <nav className="flex flex-col font-semibold space-y-2">
                <Link href="#">Home</Link>
                <span className="border-b"> </span>
                <Link href="#">Shop</Link>
                <span className="border-b"> </span>
                <Link href="#">Tires & Wheels</Link>
                <span className="border-b"> </span>
                <Link href="#">Interior Accessories</Link>
                <span className="border-b"> </span>
                <Link href="#">Blog</Link>
                <span className="border-b"> </span>
                <Link href="#">Contact</Link>
              </nav>
            </div>
            {/* Category Menu */}
            <div className="space-y-5">
              <h3 className="text-gray-500 text-opacity-55 text-xs font-semibold">
                CATEGORY MENU
              </h3>
              {/* Category List */}

              <CategoryItems />
            </div>
            {/* Contact */}
            <div className="space-y-5">
              <h3 className="text-gray-500 text-opacity-55 text-xs font-semibold">
                CONTACT DETAILS
              </h3>
              <div className="flex flex-col space-y-2">
                <div className="font-semibold">555-555-5555</div>
                <span className="text-xs">
                  You can call anytime from 9 am to 6 pm.
                </span>
                <div className="font-semibold">info@buyurparts.com</div>
                <span className="text-xs">
                  The e-mail you sent will be returned as soon as possible.
                </span>
              </div>
            </div>
          </div>

          <SheetFooter className="mt-10">
            <span className="text-xs mx-auto">
              Copyright {new Date().getFullYear()} &copy;{" "}
              <Link href="/" className="hover:underline ">
                Buyurparts.com
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

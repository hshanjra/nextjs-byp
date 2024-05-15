import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "./ui/separator";
import Image from "next/image";
import MainNav from "./MainNav";
import Sidebar from "./Sidebar";
import PartsFinder from "./PartsFinder";

const Header = () => {
  return (
    <header>
      <div className="w-full bg-red-600 h-[7px]"></div>

      {/* Top Header */}
      <div className="hidden lg:block xl:block border-b">
        <MaxWidthWrapper className="py-2">
          <div className="flex justify-between items-center">
            <nav className="space-x-5 text-xs font-medium">
              <Link href="/">About Us</Link>
              <Link href="/">My Account</Link>
              <Link href="/">Order Tracking</Link>
              <Link href="/">Wishlist</Link>
            </nav>

            <div className="flex items-center text-sm">
              <span className="opacity-50 text-xs">
                Need Help? Call us:&nbsp;
              </span>
              <Link href="/" className="font-semibold">
                (+800)&nbsp;1234&nbsp;5678&nbsp;90
              </Link>
              <span className="opacity-50">&nbsp;or&nbsp;</span>
              <Link href="/" className="font-semibold">
                info@buyurparts.com
              </Link>
              <Separator orientation="vertical" />
              <div className="mx-5">
                <Select>
                  <SelectTrigger className="border-0 select-none outline-none h-auto hover:text-red-600 p-0">
                    <SelectValue placeholder="English" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="border-0 select-none outline-none h-auto hover:text-red-600 p-0">
                    <SelectValue placeholder="USD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* Main Header */}
      <div className="hidden lg:block xl:block shadow-sm">
        <MaxWidthWrapper className="py-2">
          <div className="flex items-center space-x-5">
            {/* Sidebar */}
            <Sidebar />
            {/* Logo */}
            <div>
              <Link href="/">
                <Image
                  src="/images/logo.webp"
                  alt="logo"
                  height={140}
                  width={140}
                />
              </Link>
            </div>
            {/* Parts Finder */}
            <PartsFinder />
          </div>

          <div className="">{/* Search Box */}</div>

          <div className="">
            {/* My Account */}
            {/* Wishlist */}
            {/* Cart */}
          </div>
        </MaxWidthWrapper>

        {/* Main Nav Menu*/}

        <MaxWidthWrapper>
          <MainNav />
        </MaxWidthWrapper>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden shadow-sm">
        <MaxWidthWrapper>
          <div>Mobile Header</div>
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default Header;

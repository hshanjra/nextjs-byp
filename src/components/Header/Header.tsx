import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import MainNav from "./MainNav";
import Sidebar from "./Sidebar";
import PartsFinder from "./PartsFinder";
import { Input } from "../ui/input";
import Cart from "./Cart";
import HeartIcon from "../icons/Heart";
import SearchIcon from "../icons/Search";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import AuthSidebar from "./AuthSidebar";
import MobileNav from "./MobileNav";
import Logo from "../Logo";

const Header = () => {
  return (
    <header className="relative">
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
        <MaxWidthWrapper className="py-5 flex space-x-5 items-center">
          <div className="flex items-center space-x-5">
            {/* Sidebar */}
            <Sidebar />
            {/* Logo */}
            <div>
              <Logo />
            </div>
            {/* Parts Finder */}
            <PartsFinder strokeWidth={1} size={30} />
          </div>

          <div className="flex-1">
            {/* Search Box */}
            <div className="relative">
              <Input
                className="w-full h-[3rem]"
                placeholder="Find Parts and Products"
              />
              <SearchIcon className="absolute right-2 top-3 bg-white cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center space-x-5">
            {/* My Account */}
            <div className="flex flex-col cursor-pointer group relative z-20">
              <div className="flex justify-between items-center space-x-2">
                <h6>My Account</h6>
                <ChevronDown className="h-4 w-4" />
              </div>
              <span className="text-xs">Hello, Sign In</span>
              <div className="absolute hidden top-10 right-0 group-hover:block">
                <Card className="shadow-md w-[290px] bg-white">
                  <CardContent className="py-2 space-y-3">
                    <span className="text-sm text-center">
                      Sign up now and enjoy discounted shopping!
                    </span>

                    {/* Sidebar Login/Register Form */}

                    <AuthSidebar />
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Wishlist */}
            <div className="relative cursor-pointer">
              <span className="absolute -top-2 -right-2 bg-red-600 text-white px-[5px] py-[0.1px] rounded-full text-xs">
                0
              </span>
              <HeartIcon />
            </div>
            {/* Cart */}
            <Cart />
          </div>
        </MaxWidthWrapper>

        {/* Main Nav Menu*/}
        <div className="shadow-sm">
          <MainNav />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden shadow-sm mx-1">
        <MaxWidthWrapper>
          <div className="flex items-center h-14 justify-between">
            {/* Sidebar */}
            <Sidebar />
            {/* Logo */}
            <Logo className="mx-auto" width={60} />
            {/* Cart */}
            <Cart />
          </div>
        </MaxWidthWrapper>

        {/* Mobile Nav */}
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;

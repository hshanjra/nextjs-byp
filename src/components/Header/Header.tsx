"use server";
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
import HeartIcon from "../icons/Heart";
import SearchIcon from "../icons/Search";
import MobileNav from "./MobileNav";
import Logo from "../Logo";
import ProfileDropdown from "./ProfileDropdown";
import { HeaderWrapper } from "./HeaderWrapper";
import CartSidebar from "../Cart/CartSidebar";
import SearchInputBox from "../SearchInputBox";
import { SITE_METADATA } from "@/constants";
import { Warehouse } from "lucide-react";

export default async function Header() {
  return (
    <HeaderWrapper>
      <header className="relative">
        <div className="h-[7px] w-full bg-primary"></div>

        {/* Top Header */}
        <div className="hidden border-b lg:block xl:block">
          <MaxWidthWrapper className="py-2">
            <div className="flex items-center justify-between">
              <nav className="space-x-5 text-xs font-medium">
                <Link href="/about-us">About Us</Link>
                <Link href="/account">My Account</Link>
                <Link href="/track-order">Order Tracking</Link>
                <Link href="/account/wishlist">Wishlist</Link>
              </nav>

              <div className="flex items-center text-sm">
                <span className="text-xs opacity-50">
                  Need Help? Call us:&nbsp;
                </span>
                <Link
                  href={`tel:${SITE_METADATA.phone}`}
                  className="font-semibold"
                >
                  {SITE_METADATA.phone}
                </Link>
                <span className="opacity-50">&nbsp;or&nbsp;</span>
                <Link
                  href={`mailto:${SITE_METADATA.email}`}
                  className="font-semibold"
                >
                  {SITE_METADATA.email}
                </Link>
                <Separator orientation="vertical" />
                <div className="mx-5">
                  <Select>
                    <SelectTrigger className="h-auto select-none border-0 p-0 outline-none hover:text-red-600">
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
                    <SelectTrigger className="h-auto select-none border-0 p-0 outline-none hover:text-red-600">
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
        <div className="hidden shadow-custom lg:block xl:block">
          <MaxWidthWrapper className="flex items-center space-x-5 py-5">
            <div className="flex items-center space-x-5">
              {/* Sidebar */}
              <Sidebar />
              {/* Logo */}
              <div>
                <Logo />
              </div>
              {/* Parts Finder */}
              <PartsFinder
                className="lg:rounded-lg lg:bg-gray-100 lg:p-2 lg:hover:bg-gray-200"
                trigger={
                  <Warehouse
                    strokeWidth={1}
                    className="cursor-pointer"
                    size={30}
                  />
                }
              />
            </div>

            <div className="flex-1">
              {/* Search Box */}
              {/* <div className="relative">
                <Input
                  className="w-full h-[3rem]"
                  placeholder="Find Parts and Products"
                />
                <SearchIcon className="absolute right-2 top-3 bg-white cursor-pointer" />
              </div> */}
              <SearchInputBox />
            </div>

            <div className="flex items-center space-x-5">
              {/* My Account */}
              <ProfileDropdown />
              {/* Wishlist */}
              <div className="relative cursor-pointer">
                <span className="absolute -right-2 -top-2 rounded-full bg-primary px-[5px] py-[0.1px] text-xs text-white">
                  0
                </span>
                <HeartIcon />
              </div>
              {/* Cart */}
              <CartSidebar />
            </div>
          </MaxWidthWrapper>

          {/* Main Nav Menu*/}
          <div className="shadow-sm">
            <MainNav />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="mx-1 shadow-sm lg:hidden">
          <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between">
              {/* Sidebar */}
              <Sidebar />
              {/* Logo */}
              <Logo className="mx-auto h-10" />
              {/* Cart */}
              <CartSidebar />
            </div>
          </MaxWidthWrapper>

          {/* Mobile Nav */}
          <MobileNav />
        </div>
      </header>
    </HeaderWrapper>
  );
}

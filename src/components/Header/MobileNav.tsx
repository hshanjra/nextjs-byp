"use client";
import { Heart, HomeIcon, List, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SearchInputBox from "../SearchInputBox";
import { Label } from "../ui/label";
import PartsFinder from "./PartsFinder";

export default function MobileNav() {
  const pathname = usePathname();

  // Exclude the menu from the product page
  if (pathname.startsWith("/product")) {
    return null;
  }

  return (
    /* Moble Main Navigation */

    <section className="fixed bottom-0 left-0 right-0 lg:hidden bg-white w-full py-4 px-5 z-40 border-t">
      <div className="flex items-center justify-between space-x-5">
        {/* Home */}
        <div className="flex flex-col uppercase">
          <Link href="/">
            <HomeIcon strokeWidth={2} size={20} className="mx-auto" />
            <span className="text-[.7rem]">Home</span>
          </Link>
        </div>
        {/* Search */}
        <div className="flex flex-col uppercase">
          <Dialog>
            <DialogTrigger>
              <div className="cursor-pointer">
                <Search strokeWidth={2} size={20} className="mx-auto" />
                <Label className="text-[.7rem] cursor-pointer">Search</Label>
              </div>
            </DialogTrigger>

            <DialogContent className="h-full justify-center items-center">
              <div className="space-y-2">
                <p className="text-center text-sm">
                  What are you looking for in Buyurpars?
                </p>
                <SearchInputBox />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* Wishlist */}
        <div className="flex flex-col uppercase">
          <Link href="/wishlist">
            <Heart strokeWidth={2} size={20} className="mx-auto" />
            <Label className="text-[.7rem] cursor-pointer">Wishlist</Label>
          </Link>
        </div>
        {/* Account */}
        <div className="flex flex-col uppercase">
          <Link href="/account">
            <UserRound strokeWidth={2} size={20} className="mx-auto" />
            <Label className="text-[.7rem] cursor-pointer">Account</Label>
          </Link>
        </div>
        {/* Parts Finder */}
        <div className="flex flex-col uppercase space-y-1">
          <PartsFinder strokeWidth={2} size={20} className="mx-auto" />
          <Label className="text-[.7rem] cursor-pointer">Parts Finder</Label>
        </div>
      </div>
    </section>
  );
}

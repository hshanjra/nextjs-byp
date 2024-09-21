import {
  Heart,
  HomeIcon,
  List,
  Search,
  UserRound,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SearchInputBox from "../SearchInputBox";
import { Label } from "../ui/label";
import PartsFinder from "./PartsFinder";
import ScrollAwareContainer from "../ScrollAwareContainer";

export default function MobileNav() {
  // const pathname = usePathname();

  // // Exclude the component from rendering only on the product detail page
  // if (pathname.startsWith("/product/") && pathname.split("/").length === 3) {
  //   return null;
  // }

  return (
    /* Mobile Main Navigation */
    <ScrollAwareContainer className="fixed bottom-0 left-0 right-0 z-40 w-full border-t bg-white px-5 py-4 lg:hidden">
      <div className="flex items-center justify-between space-x-5">
        {/* Home */}
        <div className="flex flex-col uppercase">
          <Link href="/">
            <HomeIcon strokeWidth={2} size={20} className="mx-auto" />
            <span className="text-[.7rem]">Home</span>
          </Link>
        </div>
        {/* Search */}
        <div className="flex flex-col">
          <Dialog>
            <DialogTrigger>
              <div className="cursor-pointer">
                <Search strokeWidth={2} size={20} className="mx-auto" />
                <Label className="cursor-pointer text-[.7rem] uppercase">
                  Search
                </Label>
              </div>
            </DialogTrigger>

            <DialogContent className="h-full items-center justify-center">
              <div className="space-y-2">
                <p className="text-center text-sm">
                  What are you looking for in Buyurparts?
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
            <Label className="cursor-pointer text-[.7rem]">Wishlist</Label>
          </Link>
        </div>
        {/* Account */}
        <div className="flex flex-col uppercase">
          <Link href="/account">
            <UserRound strokeWidth={2} size={20} className="mx-auto" />
            <Label className="cursor-pointer text-[.7rem]">Account</Label>
          </Link>
        </div>
        {/* Parts Finder */}
        <div className="flex flex-col">
          <PartsFinder
            className="mx-auto"
            trigger={
              <>
                <Warehouse strokeWidth={2} className="mx-auto" size={22} />
                <Label className="cursor-pointer text-[.7rem] uppercase lg:hidden">
                  Parts Finder
                </Label>
              </>
            }
          />
        </div>
      </div>
    </ScrollAwareContainer>
  );
}

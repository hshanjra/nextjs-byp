import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import CategoryItems from "../Header/CategoryList";
import Link from "next/link";
import { Separator } from "../ui/separator";
import PartsFinder from "./PartsFinder";
import { Label } from "../ui/label";
import Filters from "./Filters";
import { Suspense } from "react";

export default function MobileSidebarFilters() {
  return (
    <Sheet>
      <SheetTrigger aria-label="toggle menu">
        <div className="flex items-center gap-x-1">
          <Filter
            size={18}
            className="cursor-pointer"
            strokeWidth={1}
            id="filter"
          />
          <Label htmlFor="filter" className="cursor-pointer text-xs lg:text-sm">
            Filter
          </Label>
        </div>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full p-0 md:w-[400px] lg:w-[450px]"
      >
        <SheetHeader className="px-5 py-2">
          <SheetTitle className="my-5 text-left text-sm font-semibold">
            Filter Products
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <ScrollArea className="h-full px-5">
          {/* Parts Finder */}
          <PartsFinder />

          <div className="mb-24 mt-10 space-y-5">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

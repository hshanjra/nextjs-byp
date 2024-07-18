"use client";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Popular", value: "popular" },
  { name: "Latest", value: "latest" },
  { name: "Price : Low to High", value: "price-asc" },
  { name: "Price : High to Low", value: "price-desc" },
] as const;

export default function ProductsHeaderFilter() {
  const [filter, setFilter] = useState({
    sort: "none",
  });

  return (
    <div className="flex items-center gap-x-2">
      {/* <div className="flex items-center gap-x-2">
        <Label htmlFor="sort">Sort:</Label>
        <select
          name="sort"
          id="sort"
          className="bg-transparent text-sm max-w-[140px] outline-none"
        >
          <option value="popular">Sort by popularity</option>
          <option value="avgRating">Sort by average rating</option>
          <option value="latest">Sort by latest</option>
          <option value="low-to-high">Sort by price: low to high</option>
          <option value="high-to-low">Sort by price: high to low</option>
        </select>
      </div> */}
      {/* Sort Filter */}

      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Sort: {SORT_OPTIONS.find((o) => o.value === filter.sort)?.name}
          <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.name}
              className={cn("text-left w-full block px-4 py-2 text-sm", {
                "text-gray-900 bg-gray-100": option.value === filter.sort,
                "text-gray-500": option.value !== filter.sort,
              })}
              onClick={() => {
                setFilter((prev) => ({ ...prev, sort: option.value }));
              }}
            >
              {option.name}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6 border" />
      <div className="flex items-center gap-x-2">
        <Label htmlFor="sort">Show:</Label>
        <select
          name="sort"
          id="sort"
          className="bg-transparent text-sm max-w-[140px] outline-none"
        >
          <option value="16">16 items</option>
          <option value="32">32 items</option>
          <option value="48">48 items</option>
          <option value="64">64 items</option>
        </select>
      </div>

      <div className="flex items-center gap-x-3">
        <button className="bg-gray-200 rounded-md p-[5px] shadow-sm cursor-pointer">
          <LayoutGrid strokeWidth={1} size={20} />
        </button>
        <button className="bg-white rounded-md p-[5px] shadow-sm cursor-pointer">
          <List strokeWidth={1} size={20} />
        </button>
      </div>
    </div>
  );
}

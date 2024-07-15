import { LayoutGrid, List } from "lucide-react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function ProductsHeaderFilter() {
  return (
    <div className="bg-gray-100/70 p-5 flex items-center justify-between rounded-lg">
      <div>
        <p className="text-sm font-light">Showing 1–25 of 100 results</p>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <Label htmlFor="sort">Sort:</Label>
          <select
            name="sort"
            id="sort"
            className="bg-transparent text-sm max-w-[140px] outline-none"
          >
            <option value="popular" selected>
              Sort by popularity
            </option>
            <option value="avgRating">Sort by average rating</option>
            <option value="latest">Sort by latest</option>
            <option value="low-to-high">Sort by price: low to high</option>
            <option value="high-to-low">Sort by price: high to low</option>
          </select>
        </div>
        <Separator orientation="vertical" className="h-6 border" />
        <div className="flex items-center gap-x-2">
          <Label htmlFor="sort">Show:</Label>
          <select
            name="sort"
            id="sort"
            className="bg-transparent text-sm max-w-[140px] outline-none"
          >
            <option value="16" selected>
              16 items
            </option>
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
    </div>
  );
}

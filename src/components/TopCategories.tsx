import { ArrowRight } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import CustomImage from "./CustomImage";
import { getAllCategories } from "@/actions/CategoryAction";

export default async function TopCategories() {
  const { categories, error } = await getAllCategories();

  if (error) return;

  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <h3 className="text-lg font-semibold">Top Categories</h3>
        <Link
          href="#"
          className="ml-auto flex items-center text-sm font-medium hover:text-red-500"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Separator className="my-3" />
      {/* Categories */}
      <div className="grid grid-cols-2 rounded-lg border md:grid-cols-4 lg:grid-cols-6">
        {/* Category List */}
        {categories.slice(0, 6).map((cat) => (
          <div className="p-5 last:border-0 lg:border-r" key={cat._id}>
            <div className="group flex flex-col items-center transition-all">
              <Link
                href={`/categories/${cat.categorySlug}`}
                className="text-sm group-hover:text-primary"
              >
                <CustomImage
                  src={cat.categoryThumbnail}
                  height={200}
                  width={200}
                  alt={cat.categoryName}
                  className="w-full rounded-lg border duration-200 ease-out group-hover:opacity-80"
                />
                <h3 className="mt-2 text-center text-base font-semibold">
                  {cat.categoryName}
                </h3>
              </Link>
              {/* <span className="text-xs">{cat.} item(s)</span> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

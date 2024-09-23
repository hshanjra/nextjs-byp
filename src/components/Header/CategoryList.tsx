"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ChevronDown, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/actions/CategoryAction";

// interface Category {
//   _id: string;
//   categoryIcon: string;
//   categoryName: string;
//   parent: string;
//   categoryDescription: string;
//   categoryThumbnail: string;
//   categorySlug: string;
//   createdAt: Date;
//   subcategories?: Category[];
// }

interface Props {
  className?: string;
  direction?: string;
}

const CategoryItems: React.FC<Props> = ({
  className,
  direction = "bottom",
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    setIsEnabled(true);
  }, []);

  // Fetch all categories
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategories(),
    retryDelay: 3000, // 3 seconds
    enabled: isEnabled,
  });

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (link: string) => {
    if (expandedCategories.includes(link)) {
      setExpandedCategories(expandedCategories.filter((item) => item !== link));
    } else {
      setExpandedCategories([...expandedCategories, link]);
    }
  };

  const handleArrowClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: string,
  ) => {
    event.stopPropagation();
    toggleCategory(link);
  };

  if (isPending || data?.error) {
    return (
      <section className="flex h-[535px] flex-col items-center justify-center rounded-b-xl bg-white">
        <Loader2
          className="size-10 animate-spin text-primary duration-300"
          strokeWidth={1}
        />
      </section>
    );
  }

  const categories = data?.categories || [];

  return (
    <>
      {direction === "bottom" ? (
        <div className={cn("", className)}>
          <ul>
            {categories.map((item) => (
              <div key={item._id}>
                <div className="group flex items-center justify-between">
                  <Link href={`/categories/${item.categorySlug}`} passHref>
                    <li className="flex cursor-pointer justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.categoryIcon,
                          }}
                        ></div>
                        <h3 className="text-base font-semibold">
                          {item.categoryName}
                        </h3>
                      </div>
                    </li>
                  </Link>

                  {item.subcategories && item.subcategories.length > 0 && (
                    <ChevronDown
                      className="h-4 w-4 cursor-pointer opacity-50"
                      onClick={(e: any) =>
                        handleArrowClick(e, `/categories/${item.categorySlug}`)
                      }
                    />
                  )}
                </div>
                {item.subcategories &&
                  expandedCategories.includes(
                    `/categories/${item.categorySlug}`,
                  ) &&
                  item.subcategories.map((subcat) => (
                    <div key={subcat._id}>
                      <Link
                        href={`/categories/${subcat.categorySlug}`}
                        passHref
                      >
                        <li className="flex cursor-pointer justify-between py-2">
                          <span className="ml-8 text-sm hover:text-red-500">
                            {subcat.categoryName}
                          </span>
                        </li>
                      </Link>
                    </div>
                  ))}
                <Separator />
              </div>
            ))}
            <div className="flex cursor-pointer items-center space-x-2 py-2">
              <Sparkles strokeWidth={1} />
              <Link href="/products?sort=popular" passHref>
                <h3 className="text-base font-semibold">
                  Buyurparts Bestsellers
                </h3>
              </Link>
            </div>
            <Separator />
            <Link href="/products?sort=desc" passHref>
              <li className="flex w-full cursor-pointer items-center justify-between p-2">
                <div className="text-base font-semibold">New Arrivals</div>
                <div className="rounded-xl bg-sky-400 px-2 py-1 text-xs font-bold text-white">
                  NEW
                </div>
              </li>
            </Link>
          </ul>
        </div>
      ) : (
        <div className={cn("relative border", className)}>
          <ul>
            {categories.slice(0, 9).map((item) => (
              <div key={item._id} className="group">
                <div className="relative flex h-full w-full items-center justify-between px-3 py-2.5 hover:bg-red-300/10">
                  <Link href={`/categories/${item.categorySlug}`} passHref>
                    <li className="flex w-full cursor-pointer justify-between group-hover:text-red-500">
                      <div className="flex items-center space-x-2 py-[.15rem]">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.categoryIcon,
                          }}
                        ></div>
                        <span className="text-sm">{item.categoryName}</span>
                      </div>
                    </li>
                  </Link>
                  {item.subcategories && item.subcategories.length > 0 && (
                    <ChevronRight className="h-4 w-4 cursor-pointer opacity-50 group-hover:text-red-500" />
                  )}
                </div>
                {item.subcategories && item.subcategories.length > 0 && (
                  <div className="absolute left-full top-0 hidden h-full w-[300px] rounded-r-xl rounded-bl-lg border bg-white p-5 shadow-lg group-hover:block">
                    <ul className="flex flex-col space-y-1">
                      {item.subcategories.map((subcat) => (
                        <Link
                          key={subcat._id}
                          href={`/categories/${subcat.categorySlug}`}
                          passHref
                        >
                          <li className="cursor-pointer hover:text-red-500">
                            <span className="text-sm">
                              {subcat.categoryName}
                            </span>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
                <hr />
              </div>
            ))}

            <div className="flex cursor-pointer items-center space-x-2 px-3 py-2 hover:bg-red-300/10 hover:text-red-500">
              <Sparkles strokeWidth={1} />
              <Link href="/products?sort=popular" passHref>
                <h3 className="text-sm">Buyurparts Bestsellers</h3>
              </Link>
            </div>
            <Separator />
            <Link href="/products?sort=desc" passHref>
              <li className="flex w-full cursor-pointer items-center justify-between px-3 py-2.5 hover:bg-red-300/10 hover:text-red-500">
                <div className="text-sm">New Arrivals</div>
                <div className="rounded-xl bg-sky-400 px-2 py-1 text-xs font-bold text-white">
                  NEW
                </div>
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default CategoryItems;

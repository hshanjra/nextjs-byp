"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  CustomAccordionTrigger,
} from "../ui/accordion";
import { cn, createUrl } from "@/lib/utils";
import { PriceSlider } from "../ui/price-slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/actions/CategoryAction";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { getAllBrands } from "@/actions/BrandAction";

const DEFAULT_CUSTOM_PRICE: [number, number] = [0, 10000];

interface FilterOption<T> {
  value: T;
  label: string;
  count?: number;
}

interface PriceFilter {
  id: string;
  name: string;
  option: FilterOption<[number, number]>[];
}

interface ConditionFilter {
  id: string;
  name: string;
  option: FilterOption<string>[];
}

interface StatusFilter {
  id: string;
  name: string;
  option: FilterOption<string>[];
}

interface BrandFilter {
  id: string;
  name: string;
  option: string[];
}

interface FilterState {
  minPrice: number;
  maxPrice: number;
  brand: string[];
  status: string[];
  condition: string[];
}

const PRICE_FILTERS: PriceFilter = {
  id: "price",
  name: "Price",
  option: [
    { value: DEFAULT_CUSTOM_PRICE, label: "Any price" },
    { value: [0, 500], label: "Under $500" },
    { value: [0, 1000], label: "Under $1000" },
    { value: [0, 2000], label: "Under $2000" },
  ],
};

const CONDITION_FILTERS: ConditionFilter = {
  id: "condition",
  name: "Condition",
  option: [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
  ],
};

const STATUS_FILTERS: StatusFilter = {
  id: "status",
  name: "Status",
  option: [
    { value: "inStock", label: "In Stock" },
    { value: "onSale", label: "On Sale" },
  ],
};

export default function Filters() {
  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filter: FilterState = {
    minPrice: Number(query?.get("minPrice")) || DEFAULT_CUSTOM_PRICE[0],
    maxPrice: Number(query?.get("maxPrice")) || DEFAULT_CUSTOM_PRICE[1],
    brand: query?.get("brand")?.split(",") || [],
    status: query?.get("status")?.split(",") || [],
    condition: query?.get("condition")?.split(",") || [],
  };

  const [customPrice, setCustomPrice] = useState<[number, number]>([
    filter.minPrice,
    filter.maxPrice,
  ]);
  const [selectedPrice, setSelectedPrice] = useState<string>(
    PRICE_FILTERS.option.find(
      (option) =>
        option.value[0] === filter.minPrice &&
        option.value[1] === filter.maxPrice,
    )?.label || "Custom",
  );

  // Debounced updateQuery function
  const _updateQuery = (
    key: keyof FilterState,
    value: string | number | string[] | number[] | "",
  ) => {
    const params = new URLSearchParams(query.toString());
    if (value === "") {
      params.delete(key);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        params.delete(key);
      } else {
        params.set(key, value.join(","));
      }
    } else {
      params.set(key, value.toString());
    }
    router.push(createUrl(pathname, params), { scroll: false });
  };

  /**
   * Debounced updateQuery function.
   *
   * @param {keyof FilterState} key - The key of the filter to update.
   * @param {*} value - The value to update the filter with.
   * @return {void} This function does not return anything.
   */
  const debouncedUpdateQuery = debounce(_updateQuery, 400);
  const updateQuery = useCallback(debouncedUpdateQuery, [debouncedUpdateQuery]);

  useEffect(() => {
    const updateURL = () => {
      if (selectedPrice !== "Custom") {
        const option = PRICE_FILTERS.option.find(
          (option) => option.label === selectedPrice,
        );
        if (option) {
          updateQuery("minPrice", option.value[0]);
          if (selectedPrice === "Any price") {
            updateQuery("maxPrice", ""); // Remove maxPrice parameter
          } else {
            updateQuery("maxPrice", option.value[1]);
          }
        }
      } else {
        // For custom price, use the customPrice state
        updateQuery("minPrice", customPrice[0]);
        updateQuery("maxPrice", customPrice[1]);
      }
    };

    updateURL();
  }, [selectedPrice, customPrice, updateQuery]);

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    const currentValues = filter[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    updateQuery(category, newValues);
  };

  // const minPrice = Math.min(filter.minPrice, filter.maxPrice);
  // const maxPrice = Math.max(filter.minPrice, filter.maxPrice);

  const randNum = Math.floor(Math.random() * 100);

  // Fetch all categories
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategories(),
    retryDelay: 5000, // 5 seconds
  });

  // Fetch all brands
  const { data: brands, isPending: brandsLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getAllBrands(),
    retryDelay: 7000, // 7 seconds
  });

  const BRAND_FILTERS: BrandFilter = {
    id: "brand",
    name: "Brand",
    option: brands || [],
  };

  return (
    <section className="my-3">
      <Accordion
        type="multiple"
        defaultValue={["category", "brand", "price", "condition", "status"]}
      >
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Categories</span>
          </AccordionTrigger>
          <AccordionContent>
            {isPending && (
              <div className="flex flex-col gap-y-3">
                <Skeleton className="h-4" />
                <Skeleton className="ml-auto h-4 w-60" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
              </div>
            )}

            {data && (
              <Accordion type="multiple" className="space-y-1">
                {data.categories.map((category) => (
                  <AccordionItem
                    key={category._id}
                    value={category._id}
                    className="border-none"
                  >
                    {category.subcategories &&
                    category.subcategories.length > 0 ? (
                      <>
                        <CustomAccordionTrigger className="p-0">
                          <h3 className="m-0 text-base">
                            <Link href={`/categories/${category.categorySlug}`}>
                              {pathname.endsWith(
                                `/categories/${category.categorySlug}`,
                              ) ? (
                                <b>{category.categoryName}</b>
                              ) : (
                                <>{category.categoryName}</>
                              )}
                            </Link>
                          </h3>
                        </CustomAccordionTrigger>
                        <AccordionContent className="p-0">
                          <ul className="lg:ml-3">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory._id}
                                href={`/categories/${subcategory.categorySlug}`}
                                className="hover:text-zinc-500 hover:underline"
                              >
                                <li>
                                  {pathname.endsWith(
                                    `/categories/${subcategory.categorySlug}`,
                                  ) ? (
                                    <b> -{subcategory.categoryName}</b>
                                  ) : (
                                    <>-{subcategory.categoryName}</>
                                  )}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </AccordionContent>
                      </>
                    ) : (
                      <h3 className="m-0 text-base">
                        <Link
                          href={`/categories/${category.categorySlug}`}
                          className="hover:underline"
                        >
                          {pathname.endsWith(
                            `/categories/${category.categorySlug}`,
                          ) ? (
                            <b>{category.categoryName}</b>
                          ) : (
                            <>{category.categoryName}</>
                          )}
                        </Link>
                      </h3>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Price</span>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={selectedPrice}
              onValueChange={(value) => {
                setSelectedPrice(value);
                if (value === "Custom") {
                  updateQuery("minPrice", customPrice[0]);
                  updateQuery("maxPrice", customPrice[1]);
                } else {
                  const option = PRICE_FILTERS.option.find(
                    (option) => option.label === value,
                  );
                  if (option) {
                    updateQuery("minPrice", option.value[0]);
                    if (value === "Any price") {
                      updateQuery("maxPrice", ""); // Remove maxPrice parameter
                    } else {
                      updateQuery("maxPrice", option.value[1]);
                    }
                  }
                }
              }}
            >
              {PRICE_FILTERS.option.map((option, idx) => (
                <div
                  key={option.label + randNum}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={option.label}
                    id={`price-${idx + randNum}`}
                  />
                  <Label
                    htmlFor={`price-${idx + randNum}`}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Custom" id={`price-custom` + randNum} />
                <Label
                  htmlFor={`price-custom` + randNum}
                  className="cursor-pointer"
                >
                  Custom
                </Label>
              </div>
              {selectedPrice === "Custom" && (
                <>
                  <div className="flex justify-between">
                    <p className="font-medium">Price</p>
                    <div>
                      {customPrice[0]}$ - {customPrice[1]}$
                    </div>
                  </div>

                  <PriceSlider
                    className={cn({})}
                    onValueChange={(range) => {
                      const [newMin, newMax] = range;
                      setCustomPrice([newMin, newMax]);
                      updateQuery("minPrice", newMin);
                      updateQuery("maxPrice", newMax);
                    }}
                    min={DEFAULT_CUSTOM_PRICE[0]}
                    max={DEFAULT_CUSTOM_PRICE[1]}
                    step={1}
                    value={customPrice}
                  />
                </>
              )}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Condition Filter */}
        <AccordionItem value="condition">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Condition</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-start gap-2">
              {CONDITION_FILTERS.option.map((option, i) => (
                <div
                  className="flex items-center space-x-2"
                  key={option.label + randNum}
                >
                  <Checkbox
                    id={`condition-${i + randNum}`}
                    onCheckedChange={() =>
                      handleCheckboxChange("condition", option.value)
                    }
                    checked={filter.condition.includes(option.value)}
                  />
                  <Label
                    htmlFor={`condition-${i + randNum}`}
                    className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Status Filter */}
        <AccordionItem value="status">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Product Status</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-start gap-2">
              {STATUS_FILTERS.option.map((option, i) => (
                <div
                  className="flex items-center space-x-2"
                  key={option.label + randNum}
                >
                  <Checkbox
                    id={`status-${i + randNum}`}
                    onCheckedChange={() =>
                      handleCheckboxChange("status", option.value)
                    }
                    checked={filter.status.includes(option.value)}
                  />
                  <Label
                    htmlFor={`status-${i + randNum}`}
                    className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Brands</span>
          </AccordionTrigger>
          <AccordionContent>
            {brandsLoading && (
              <div className="flex flex-col gap-y-3">
                <Skeleton className="h-4" />
                <Skeleton className="ml-auto h-4 w-60" />
                <Skeleton className="h-4" />
                <Skeleton className="h-4" />
              </div>
            )}
            <div className="flex flex-col items-start gap-2">
              {BRAND_FILTERS.option.map((option, i) => (
                <div
                  className="flex items-center space-x-2"
                  key={option + randNum}
                >
                  <Checkbox
                    id={`brand-${i + randNum}`}
                    onCheckedChange={() =>
                      handleCheckboxChange("brand", option)
                    }
                    checked={filter.brand.includes(option)}
                  />
                  <Label
                    htmlFor={`brand-${i + randNum}`}
                    className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn, createUrl } from "@/lib/utils";
import { PriceSlider } from "../ui/price-slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  option: FilterOption<string>[];
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

const BRAND_FILTERS: BrandFilter = {
  id: "brand",
  name: "Brand",
  option: [
    { value: "brand1", label: "Pirelli", count: 50 },
    { value: "brand2", label: "Honda", count: 9 },
    { value: "brand3", label: "FUEL", count: 65 },
    { value: "brand4", label: "Shell", count: 2 },
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
        option.value[1] === filter.maxPrice
    )?.label || "Custom"
  );

  const updateQuery = useCallback(
    (
      key: keyof FilterState,
      value: string | number | string[] | number[] | ""
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
    },
    [query, router, pathname]
  );

  useEffect(() => {
    const updateURL = () => {
      if (selectedPrice !== "Custom") {
        const option = PRICE_FILTERS.option.find(
          (option) => option.label === selectedPrice
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

  return (
    <div>
      <div>
        <span className="font-medium text-gray-900">Categories</span>
      </div>
      <Accordion
        type="multiple"
        defaultValue={["brand", "price", "condition", "status"]}
      >
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
                    (option) => option.label === value
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
                <div key={option.label} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.label} id={`price-${idx}`} />
                  <Label htmlFor={`price-${idx}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Custom" id={`price-custom`} />
                <Label htmlFor={`price-custom`} className="cursor-pointer">
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
                <div className="flex items-center space-x-2" key={option.label}>
                  <Checkbox
                    id={`condition-${i}`}
                    onCheckedChange={() =>
                      handleCheckboxChange("condition", option.value)
                    }
                    checked={filter.condition.includes(option.value)}
                  />
                  <Label
                    htmlFor={`condition-${i}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
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
                <div className="flex items-center space-x-2" key={option.label}>
                  <Checkbox
                    id={`status-${i}`}
                    onCheckedChange={() =>
                      handleCheckboxChange("status", option.value)
                    }
                    checked={filter.status.includes(option.value)}
                  />
                  <Label
                    htmlFor={`status-${i}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
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
            <div className="flex flex-col items-start gap-2">
              {BRAND_FILTERS.option.map((option, i) => (
                <div className="flex items-center space-x-2" key={option.label}>
                  <Checkbox
                    id={`brand-${i}`}
                    onCheckedChange={() =>
                      handleCheckboxChange("brand", option.value)
                    }
                    checked={filter.brand.includes(option.value)}
                  />
                  <Label
                    htmlFor={`brand-${i}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ProductState } from "@/lib/validators/product-filter-validator";
import { cn } from "@/lib/utils";
import { PriceSlider } from "../ui/price-slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const SUBCATEGORIES = [
  { name: "Fog Lights", selected: true, href: "#" },
  { name: "Reflectors", selected: false, href: "#" },
  { name: "Headlights", selected: false, href: "#" },
  { name: "Brake Lights", selected: false, href: "#" },
  { name: "Brake Pads", selected: false, href: "#" },
];

const DEFAULT_CUSTOM_PRICE = [0, 350] as [number, number];

const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  option: [
    { value: [0, 350], label: "Any price" },
    { value: [0, 200], label: "Under $200" },
    { value: [0, 150], label: "Under $150" },
    // Custom option will be defined in JSX
  ],
} as const;

const CONDITION_FILTERS = {
  id: "condition",
  name: "Condition",
  option: [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
    // Custom option will be defined in JSX
  ],
} as const;

const STATUS_FILTERS = {
  id: "status",
  name: "Status",
  option: [
    { value: "inStock", label: "In Stock" },
    { value: "onSale", label: "On Sale" },
    // Custom option will be defined in JSX
  ],
} as const;

// TODO: get all the brands from the api
const BRAND_FILTERS = {
  id: "brand",
  name: "Brand",
  option: [
    { value: "brand1", label: "Pirelli", count: 50 },
    { value: "brand2", label: "Honda", count: 9 },
    { value: "brand3", label: "FUEL", count: 65 },
    { value: "brand4", label: "Shell", count: 2 },
  ],
} as const;

export default function Filters() {
  const [filter, setFilter] = useState<ProductState>({
    sort: "none",
    price: { isCustom: false, range: DEFAULT_CUSTOM_PRICE },
    brand: [],
    status: [],
    condition: [],
  });

  console.log(filter);

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Omit<typeof filter, "price" | "sort">;
    value: string;
  }) => {
    const isFilterApplied = filter[category].includes(value as never);

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

  return (
    <div>
      <div>
        <span className="font-medium text-gray-900">Categories</span>
        {/* TODO: fix this categories menu */}
        {/* Subcategories */}
        {/* <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
          {SUBCATEGORIES.map((subcategory) => (
            <li key={subcategory.name} className="flex items-center">
              <input
                id={subcategory.name}
                name={subcategory.name}
                type="checkbox"
                defaultChecked={subcategory.selected}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor={subcategory.name}
                className="ml-3 text-sm text-gray-600"
              >
                {subcategory.name}
              </label>
            </li>
          ))}
        </ul> */}
      </div>
      <Accordion
        type="multiple"
        className="animate-none"
        defaultValue={["brand", "price", "condition", "status"]}
      >
        {/* Price Filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Price</span>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              defaultValue={PRICE_FILTERS.option[0].label}
              onValueChange={(value) => {
                const option = PRICE_FILTERS.option.find(
                  (option) => option.label === value
                );
                if (option) {
                  setFilter((prev) => ({
                    ...prev,
                    price: {
                      isCustom: false,
                      range: [...option.value],
                    },
                  }));
                } else {
                  setFilter((prev) => ({
                    ...prev,
                    price: {
                      isCustom: true,
                      range: DEFAULT_CUSTOM_PRICE,
                    },
                  }));
                }
              }}
            >
              {PRICE_FILTERS.option.map((option, idx) => (
                <div key={option.label} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.label}
                    id={`price-${idx}`}
                    checked={
                      !filter.price.isCustom &&
                      filter.price.range[0] === option.value[0] &&
                      filter.price.range[1] === option.value[1]
                    }
                  />
                  <Label htmlFor={`price-${idx}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="custom"
                  id={`price-${PRICE_FILTERS.option.length}`}
                  checked={filter.price.isCustom}
                />
                <Label
                  htmlFor={`price-${PRICE_FILTERS.option.length}`}
                  className="cursor-pointer"
                >
                  Custom
                </Label>
              </div>

              <div className="flex justify-between">
                <p className="font-medium">Price</p>
                <div>
                  {filter.price.isCustom
                    ? minPrice.toFixed(0)
                    : filter.price.range[0].toFixed(0)}
                  $ -{" "}
                  {filter.price.isCustom
                    ? maxPrice.toFixed(0)
                    : filter.price.range[1].toFixed(0)}
                  $
                </div>
              </div>

              <PriceSlider
                className={cn({
                  "opacity-50 cursor-not-allowed": !filter.price.isCustom,
                })}
                disabled={!filter.price.isCustom}
                onValueChange={(range) => {
                  const [newMin, newMax] = range;
                  setFilter((prev) => ({
                    ...prev,
                    price: {
                      isCustom: true,
                      range: [newMin, newMax],
                    },
                  }));
                }}
                min={DEFAULT_CUSTOM_PRICE[0]}
                defaultValue={DEFAULT_CUSTOM_PRICE}
                max={DEFAULT_CUSTOM_PRICE[1]}
                step={1}
                value={
                  filter.price.isCustom
                    ? filter.price.range
                    : DEFAULT_CUSTOM_PRICE
                }
              />
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Condition</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col items-start gap-2">
              {CONDITION_FILTERS.option.map((option) => (
                <div className="flex items-center space-x-2" key={option.label}>
                  <Checkbox
                    id={`condition-${option.label}`}
                    onCheckedChange={() => {
                      setFilter((prev) => {
                        const newConditions = prev.condition.includes(
                          option.value as never
                        )
                          ? prev.condition.filter(
                              (value) => value !== option.value
                            )
                          : [...prev.condition, option.value as never];
                        return { ...prev, condition: newConditions };
                      });
                    }}
                    checked={filter.condition.includes(option.value as never)}
                  />
                  <Label
                    htmlFor={`condition-${option.label}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="status">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Product Status</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col items-start gap-2">
              {STATUS_FILTERS.option.map((option) => (
                <div className="flex items-center space-x-2" key={option.label}>
                  <Checkbox
                    id={`status-${option.label}`}
                    onCheckedChange={() => {
                      setFilter((prev) => {
                        const newStatus = prev.status.includes(
                          option.value as never
                        )
                          ? prev.status.filter(
                              (value) => value !== option.value
                            )
                          : [...prev.status, option.value as never];
                        return { ...prev, status: newStatus };
                      });
                    }}
                    checked={filter.status.includes(option.value as never)}
                  />
                  <Label
                    htmlFor={`status-${option.label}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-bold text-gray-900">Brands</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col items-start gap-2">
              {BRAND_FILTERS.option.map((option) => (
                <div className="flex items-center space-x-2" key={option.label}>
                  <Checkbox
                    id={`brand-${option.label}`}
                    onCheckedChange={() => {
                      setFilter((prev) => {
                        const newBrand = prev.brand.includes(
                          option.value as never
                        )
                          ? prev.brand.filter((value) => value !== option.value)
                          : [...prev.brand, option.value as never];
                        return { ...prev, brand: newBrand };
                      });
                    }}
                    checked={filter.brand.includes(option.value as never)}
                  />
                  <Label
                    htmlFor={`brand-${option.label}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </Label>

                  {/* <span className="text-xs font-bold">{option.count}</span> */}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

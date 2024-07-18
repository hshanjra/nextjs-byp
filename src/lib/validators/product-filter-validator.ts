import { z } from "zod";

export const AVAILABLE_SORT = [
  "none",
  "avgRating",
  "latest",
  "price-asc",
  "price-desc",
] as const;

export const AVAILABLE_STATUS = ["inStock", "onSale"] as const;

export const ProductFilterValidator = z.object({
  sort: z.enum(AVAILABLE_SORT),
  price: z.tuple([z.number(), z.number()]),
  brand: z.array(z.string()),
  status: z.array(z.enum(AVAILABLE_STATUS)),
  condition: z.array(z.enum(["new", "used"])),
});

export type ProductState = Omit<
  z.infer<typeof ProductFilterValidator>,
  "price"
> & { price: { isCustom: boolean; range: [number, number] } };

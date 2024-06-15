import * as z from "zod";

const addressSchema = z.object({
  firstName: z.string().min(1).max(40),
  lastName: z.string().min(1).max(40),
  companyName: z.string().min(1).max(70).optional(),
  phone: z.string().min(10).max(10).optional(),
  streetAddress: z.string().min(1).max(100),
  city: z.string().min(1).max(70),
  state: z.string(),
  zipCode: z.string().min(5).max(10),
  country: z.string().min(1).max(20),
});

export const checkoutOrderSchema = z.object({
  sessionId: z.string().min(1),
  billingAddress: addressSchema,
  shippingAddress: addressSchema,
});

export type checkoutOrderType = z.infer<typeof checkoutOrderSchema>;

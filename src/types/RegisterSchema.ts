import * as z from "zod";

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(10, { message: "First name must not be greater than 10 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(10, { message: "Last name must not be greater than 10 characters" }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

export type RegisterForm = z.infer<typeof RegisterSchema>;

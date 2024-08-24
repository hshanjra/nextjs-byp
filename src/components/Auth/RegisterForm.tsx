"use client";

import { RegisterUserAction } from "@/actions/AuthAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CircleFadingPlus, LoaderCircle } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormError from "./FormError";
import Logo from "../Logo";
import { toast } from "sonner";
import {
  RegisterForm as registerFrm,
  RegisterSchema,
} from "@/types/authSchema";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import FormSuccess from "./FormSuccess";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { execute, status } = useAction(RegisterUserAction, {
    onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) {
        toast.success(data.success, {
          description: "The link is valid only for 24hrs.",
          duration: 4000,
        });
        setSuccess(
          "Please verify your email, link has been sent to your email.",
        );
      }
    },
    onError(data) {
      if (data.serverError) setError(data.serverError);
    },
  });

  const onSubmit = (v: registerFrm) => {
    setError("");
    setSuccess("");
    execute(v);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Logo className="mx-auto my-2 lg:my-4" />
        <div className="my-5 text-center">
          <h2 className="text-xl font-semibold">BECOME A MEMBER</h2>
          <p className="my-2 text-sm font-[400] text-zinc-700">
            With our extensive collection of automotive parts and accessories,
            we are the ultimate destination for all your needs.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-col gap-3 lg:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="firstName"
              control={form.control}
              placeholder="John"
              label="First Name"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="lastName"
              control={form.control}
              placeholder="Doe"
              label="Last Name"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.EMAIL_INPUT}
            name="email"
            control={form.control}
            placeholder="Enter your email..."
            label="E-Mail Address"
          />

          <CustomFormField
            fieldType={FormFieldType.PASSWORD_INPUT}
            name="password"
            control={form.control}
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            label="Password"
          />
        </div>

        <Link
          href="/password-reset"
          className={buttonVariants({
            variant: "link",
            size: "sm",
          })}
        >
          Forgot your password ?
        </Link>

        {/* Success/Error message */}
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button
          type="submit"
          className="my-2 w-full bg-zinc-900 text-white hover:bg-zinc-700"
          disabled={status === "executing"}
        >
          {status === "executing" ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              Register <CircleFadingPlus size={20} className="mx-1" />
            </>
          )}
        </Button>

        <div className="mt-3 flex items-center">
          <span className="ml-auto text-sm">Already have an account?</span>
          <Link
            href="/auth/login"
            className="ml-2 mr-auto text-sm font-semibold text-red-500 hover:text-zinc-700"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}

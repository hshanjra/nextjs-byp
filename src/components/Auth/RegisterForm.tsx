"use client";

import { RegisterUserAction } from "@/actions/AuthAction";
import { type RegisterForm, RegisterSchema } from "@/types/RegisterSchema";
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
import { CircleFadingPlus, LoaderCircle, Phone } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import Logo from "../Logo";

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
      if (data?.success) setSuccess(data.success);
    },
    onError(data) {
      if (data.serverError) setError(data.serverError);
    },
  });

  const onSubmit = (v: RegisterForm) => {
    setError("");
    setSuccess("");
    execute(v);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <Logo className="mx-auto" />
        <div className="text-center my-3">
          <h2 className="font-semibold text-3xl">BECOME A MEMBER</h2>
          <h6 className="text-sm font-semibold my-2">
            With our extensive collection of automotive parts and accessories,
            we are the ultimate destination for all your needs.
          </h6>
        </div>
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    autoComplete="firstName"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    autoComplete="firstName"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  {...field}
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormDescription></FormDescription>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          className={cn("w-full my-2")}
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
      </form>
    </Form>
  );
}

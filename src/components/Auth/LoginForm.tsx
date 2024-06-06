"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { EmailSignInAction } from "@/actions/AuthAction";
import { cn } from "@/lib/utils";
import { LoaderCircle, LogIn } from "lucide-react";
import { useState } from "react";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import Logo from "../Logo";
import { toast } from "sonner";
import { useStore } from "@/store/store";
import { LoginForm as LoginFrm, LoginSchema } from "../../types/authSchema";

export default function LoginForm() {
  const { fetchAndSetUser } = useStore();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { execute, status } = useAction(EmailSignInAction, {
    async onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) {
        toast.success(data.success);
        await fetchAndSetUser();
        setSuccess(data.success);
        window.location.reload();
      }
    },
    onError(data) {
      if (data.serverError) setError(data.serverError);
    },
  });

  const onSubmit = (v: LoginFrm) => {
    setError("");
    setSuccess("");
    execute(v);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <Logo className="mx-auto" />
        <div className="text-center my-3">
          <h2 className="font-semibold text-3xl">Welcome Back!</h2>
          <h6 className="text-sm font-semibold my-2">
            Explore a wide range of high-quality automotive products, all just a
            click away.
          </h6>
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
            className: "text-zinc-900",
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
              Log in <LogIn size={20} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

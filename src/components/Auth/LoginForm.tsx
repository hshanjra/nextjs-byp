"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { EmailSignInAction } from "@/actions/AuthAction";
import { cn } from "@/lib/utils";
import { ArrowLeft, LoaderCircle, LogIn } from "lucide-react";
import { useState } from "react";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import Logo from "../Logo";
import { toast } from "sonner";
import { useStore } from "@/store/store";
import { LoginForm as LoginFrm, LoginSchema } from "@/types/authSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import CustomFormField, { FormFieldType } from "../CustomFormField";

export default function LoginForm() {
  const router = useRouter();
  const return_url = useSearchParams().get("return_url");

  const { fetchAndSetUser } = useStore();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const [error, setError] = useState<string>("");

  const { execute, status } = useAction(EmailSignInAction, {
    async onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) {
        await fetchAndSetUser();

        // Redirect to return URL if provided, otherwise to /account page
        router.push(return_url || "/account");
        // window.location.href = "/account";
      }
    },
    onError(data) {
      if (data.serverError) setError(data.serverError);
    },
  });

  const onSubmit = (v: LoginFrm) => {
    setError("");
    execute(v);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Logo className="mx-auto my-5" />
        <div className="my-5 text-center">
          <h2 className="text-xl font-semibold">Welcome back!</h2>
          <p className="my-2 text-sm font-[400] text-zinc-700">
            Please enter your details to sign in.
          </p>
        </div>
        <div className="space-y-3">
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

        <div className="my-3 flex items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-1">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-zinc-900 data-[state=checked]:bg-zinc-900"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/password-reset"
            className="text-sm font-semibold text-zinc-800 underline hover:text-zinc-700"
          >
            Forgot password?
          </Link>
        </div>

        {/* Error message */}

        <FormError message={error} />

        <Button
          type="submit"
          className={cn("my-2 w-full bg-zinc-900 text-white hover:bg-zinc-700")}
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

        <div className="mt-3 flex items-center">
          <span className="ml-auto text-sm font-semibold text-zinc-500">
            Don&apos;t have an account yet?
          </span>
          <Link
            href="/auth/register"
            className="ml-2 mr-auto text-sm font-semibold text-red-500 hover:text-zinc-700"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}

"use client";

import { EmailVerificationAction } from "@/actions/AuthAction";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { EmailVerificationSchema } from "@/types/AuthSchema";
import { Button, buttonVariants } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Card } from "../ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function EmailVerificationForm() {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      token: token,
    },
  });

  const { execute, status } = useAction(EmailVerificationAction, {
    onSuccess(data) {
      if (data?.error) {
        toast.error(data.error);
      } else if (data?.success) {
        toast.success(data.success);
        setTimeout(() => {
          router.push("/account");
        }, 2000);
      }
    },
    onError(data) {
      if (data?.serverError) {
        toast.error(data.serverError);
      }
    },
  });

  const onSubmit = (v: any) => {
    execute(v);
  };

  if (!token) {
    return null;
  }

  return (
    <Card className="max-w-md lg:max-w-lg m-auto p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <h1 className="mb-6 mt-10 text-xl tracking-[-0.16px] text-slate-12 font-bold">
            Account Verification
          </h1>
          <p className="mb-6 text-sm text-slate-11 font-normal">
            To verify your account, please follow the button below.
          </p>
          <input type="text" name="token" hidden />
          <Button
            className="w-full"
            type="submit"
            disabled={status === "executing"}
          >
            {status === "executing" ? (
              <>
                <LoaderCircle className="animate-spin mr-1" /> Confirming
                account
              </>
            ) : (
              <>Confirm account</>
            )}
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-sm text-slate-11 font-normal">
        If you have any issue confirming your account please, contact&nbsp;
        <Link
          href="mailto:support@buyurparts.com"
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "m-0 p-0"
          )}
        >
          support@buyurparts.com
        </Link>
        .
      </p>
    </Card>
  );
}

"use client";

import { EmailVerificationAction } from "@/actions/AuthAction";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { Card } from "../ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { EmailVerificationSchema } from "@/types/authSchema";
import { SITE_METADATA } from "@/constants";

function EmailVerificationFormContent({ token }: { token: string }) {
  const return_url = useSearchParams().get("return_url");

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

        // Redirect to return URL if provided, otherwise to /account page
        router.push(return_url || "/account");
      }
    },
    onError(data) {
      if (data?.serverError) {
        toast.error(data.serverError);
      }
    },
  });

  const onSubmit = (values: any) => {
    execute(values);
  };

  return (
    <Card className="m-auto max-w-md p-5 lg:max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <h1 className="text-slate-12 mb-6 mt-10 text-xl font-bold tracking-[-0.16px]">
            Account Verification
          </h1>
          <p className="text-slate-11 mb-6 text-sm font-normal">
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
                <LoaderCircle className="mr-1 animate-spin" /> Confirming
                account
              </>
            ) : (
              <>Confirm account</>
            )}
          </Button>
        </form>
      </Form>
      <p className="text-slate-11 mt-6 text-sm font-normal">
        If you have any issue confirming your account please, contact&nbsp;
        <Link
          href={`mailto:${SITE_METADATA.supportEmail}`}
          className={cn(
            buttonVariants({
              variant: "link",
            }),
            "m-0 p-0",
          )}
        >
          {SITE_METADATA.supportEmail}
        </Link>
        .
      </p>
    </Card>
  );
}

function EmailVerificationFormWrapper() {
  const token = useSearchParams().get("token");
  if (!token) return null;

  return <EmailVerificationFormContent token={token} />;
}

export default function EmailVerificationForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationFormWrapper />
    </Suspense>
  );
}

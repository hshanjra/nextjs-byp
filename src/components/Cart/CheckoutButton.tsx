"use client";

import { createCheckoutSession } from "@/actions/CheckoutAction";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await createCheckoutSession();
    setIsLoading(false);

    if (result.sessionId) {
      setSessionId(result.sessionId);
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      router.push(`/checkout/${sessionId}`);
    }
  }, [sessionId, router]);
  return (
    <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        "Proceed to checkout"
      )}
    </Button>
  );
}

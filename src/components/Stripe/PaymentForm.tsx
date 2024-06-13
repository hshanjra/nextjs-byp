import { useState } from "react";
import { Button } from "../ui/button";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { toast } from "sonner";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-placed`,
      },
      redirect: "if_required",
    });
    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Payment Success 🎉");
    } else {
      toast.error("Unexpected Error");
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="max-w-md items-center justify-center"
    >
      <PaymentElement />
      <Button type="submit" disabled={isProcessing} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing..." : "Pay Now"}
        </span>
      </Button>
    </form>
  );
}

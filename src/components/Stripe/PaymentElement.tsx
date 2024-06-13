"use client";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { getStripe } from "@/lib/load-stripe";

export default function StripePaymentElement({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = getStripe();
  return (
    <div>
      {stripe && clientSecret && (
        <Elements
          stripe={stripe}
          options={{
            clientSecret: clientSecret,
          }}
        >
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
}

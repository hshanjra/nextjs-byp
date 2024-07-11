"use client";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import { getStripe } from "@/lib/load-stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = getStripe();

const options = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

export default function page() {
  // const [clientSecret, seClientSecret] = useState("");

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />;
    </Elements>
  );
}

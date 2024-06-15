import { validateCheckoutSession } from "@/actions/CheckoutAction";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import StripePaymentElement from "@/components/Stripe/PaymentElement";
import { redirect } from "next/navigation";

interface params {
  params: {
    sessionId: string;
  };
}

export const dynamic = "force-dynamic";

export default async function CheckoutPage({ params }: params) {
  const sessionId = params.sessionId;

  const { client_secret, cart, error } = await validateCheckoutSession(
    sessionId
  );

  if (error) redirect("/cart");

  return (
    <div className="bg-gray-100">
      <MaxWidthWrapper>
        <StripePaymentElement clientSecret={client_secret}>
          <CheckoutForm sessionId={sessionId} cart={cart} />
        </StripePaymentElement>
      </MaxWidthWrapper>
    </div>
  );
}

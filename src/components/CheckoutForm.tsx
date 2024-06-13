import { validateCheckoutSession } from "@/actions/CheckoutAction";
import StripePaymentElement from "./Stripe/PaymentElement";

export default async function CheckoutForm({
  sessionId,
}: {
  sessionId: string;
}) {
  const { client_secret, cart } = await validateCheckoutSession(sessionId);

  return (
    <div>
      {/* TODO: Render cart items  */}
      <StripePaymentElement clientSecret={client_secret} />
    </div>
  );
}

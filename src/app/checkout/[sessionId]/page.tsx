import CheckoutForm from "@/components/CheckoutForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface params {
  params: {
    sessionId: string;
  };
}
export default function CheckoutPage({ params }: params) {
  const sessionId = params.sessionId;
  return (
    <MaxWidthWrapper className="flex justify-center items-center h-screen">
      <CheckoutForm sessionId={sessionId} />
    </MaxWidthWrapper>
  );
}

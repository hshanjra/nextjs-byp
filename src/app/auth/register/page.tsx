import RegisterForm from "@/components/Auth/RegisterForm";
import { SITE_METADATA } from "@/constants";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Register | ${SITE_METADATA.title}`,
  description:
    "With our extensive collection of automotive parts and accessories, we are the ultimate destination for all your needs.",
};

const RegisterPage = () => {
  return (
    <section className="w-full max-w-md rounded-2xl bg-white p-10 drop-shadow-2xl">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </section>
  );
};

export default RegisterPage;

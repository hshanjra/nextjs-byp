import LoginForm from "@/components/Auth/LoginForm";
import { SITE_METADATA } from "@/constants";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: `Login | ${SITE_METADATA.title}`,
};

const LoginPage = () => {
  return (
    <section className="w-full max-w-md rounded-2xl bg-white p-10 drop-shadow-2xl">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
};

export default LoginPage;

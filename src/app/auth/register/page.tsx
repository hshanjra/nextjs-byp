import RegisterForm from "@/components/Auth/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <section className="max-w-md w-full bg-white drop-shadow-2xl p-10 rounded-2xl">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </section>
  );
};

export default RegisterPage;

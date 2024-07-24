import RegisterForm from "@/components/Auth/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <section className="max-w-lg">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </section>
  );
};

export default RegisterPage;

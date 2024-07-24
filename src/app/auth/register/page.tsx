import RegisterForm from "@/components/Auth/RegisterForm";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;

import LoginForm from "@/components/Auth/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <section className="max-w-lg">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
};

export default LoginPage;

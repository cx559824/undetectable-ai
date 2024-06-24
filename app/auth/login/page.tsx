import LoginForm from "@/components/auth/login-form";
import { BeatLoader } from "react-spinners";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<BeatLoader />}>
      <LoginForm />
    </Suspense>
  );
}

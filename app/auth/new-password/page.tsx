import NewPasswordForm from "@/components/auth/new-password-form";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<BeatLoader />}>
      <NewPasswordForm />
    </Suspense>
  );
}

import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<BeatLoader />}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;

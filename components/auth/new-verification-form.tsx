"use client";

import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
      headerLabel='Confirming your verification'
    >
      <div className='flex w-full flex-col items-center justify-center space-y-2'>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}

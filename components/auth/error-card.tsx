import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Oops! Something went wrong!'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
    >
      <div className='flex h-full w-full items-center justify-center'>
        <ExclamationTriangleIcon className='h-full text-7xl font-bold text-destructive' />
      </div>
    </CardWrapper>
  );
};

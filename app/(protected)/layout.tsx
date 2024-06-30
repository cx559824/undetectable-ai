import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='flex h-full flex-col'>
      <Navbar />
      <div className='flex w-full grow flex-col gap-y-10'>{children}</div>
    </div>
  );
}

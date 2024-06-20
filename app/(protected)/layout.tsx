import { auth } from "@/auth";
import Navbar from "@/components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className='flex h-full flex-col'>
      <Navbar />
      {children}
    </div>
  );
}

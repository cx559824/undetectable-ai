import Navbar from "@/components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full flex-col'>
      <Navbar />
      {children}
    </div>
  );
}

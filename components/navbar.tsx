import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";
import Image from "next/image";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className='mx-auto flex h-20 w-full items-center justify-between bg-blue-950 px-5'>
      <h1 className='text-3xl font-bold text-orange-600'>Undetectable AI</h1>
      <div className='flex gap-3'>
        <Image
          className='rounded-full'
          src={session?.user.image || ""}
          alt={session?.user.name || ""}
          width={40}
          height={40}
        />
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button className='rounded-full' variant='outline'>
            Sign Out
          </Button>
        </form>
      </div>
    </nav>
  );
}

"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

// import { logout } from "@/actions/logout"; // Serverside logout
import { signOut } from "next-auth/react"; // Clientside signOut
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Navbar = () => {
  const user = useCurrentUser();
  const pathname = usePathname();

  // Example server action for logging out
  // const onClick = () => {
  //   logout();
  // };
  //
  return (
    <nav className='mx-auto flex h-20 w-full items-center justify-between bg-blue-950 px-5'>
      <h1 className='text-3xl font-bold text-orange-600'>Undetectable AI</h1>
      <div className='flex items-center justify-center gap-5 text-white'>
        <Link
          className='cursor-pointer duration-300 hover:scale-110'
          href='/dashboard'
        >
          Dashboard
        </Link>
        <Link
          className='cursor-pointer duration-300 hover:scale-110'
          href='/settings'
        >
          Settings
        </Link>
        <Image
          className='cursor-pointer rounded-full duration-300 hover:scale-125'
          src={user?.image || "/no-avatar.png"}
          alt={user?.name || ""}
          width={40}
          height={40}
        />
        <Button
          className='cursor-pointer duration-300 hover:scale-110'
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
        {/* form to signOut serverside */}
        {/* <form */}
        {/*   action={async () => { */}
        {/*     await signOut(); */}
        {/*   }} */}
        {/* > */}
        {/*   <Button className='rounded-md' variant='outline'> */}
        {/*     Sign Out */}
        {/*   </Button> */}
        {/* </form> */}
      </div>
    </nav>
  );
};

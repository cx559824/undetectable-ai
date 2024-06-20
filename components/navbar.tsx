import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

export default async function Navbar() {
  return (
    <nav className='mx-auto flex h-20 w-full items-center justify-between bg-blue-950 px-5'>
      <h1 className='text-3xl font-bold text-orange-600'>Ditter Raquion</h1>
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
    </nav>
  );
}

"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { logout } from "@/actions/logout"; // Serverside logout
// import { signOut } from "next-auth/react"; // Clientside signOut
import { useCurrentUser } from "@/hooks/use-current-user";
import { ModeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="mx-auto flex h-20 w-full items-center justify-between bg-blue-950 px-5">
      <Link href="/dashboard">
        <h1 className="text-3xl font-bold text-orange-600">Undetectable AI</h1>
      </Link>
      <div className="flex items-center justify-center gap-5 text-white">
        <Link
          className={cn(
            "cursor-pointer duration-300 hover:scale-110",
            pathname === "/dashboard" &&
              "scale-110 font-bold text-yellow-300 drop-shadow-lg duration-300"
          )}
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={cn(
            "cursor-pointer duration-300 hover:scale-110",
            pathname.startsWith("/demo") &&
              "scale-110 font-bold text-yellow-300 drop-shadow-lg duration-300"
          )}
          href="/demo"
        >
          Client-SSR-Demo
        </Link>
        <UserButton />
        <ModeToggle />
      </div>
    </nav>
  );
};

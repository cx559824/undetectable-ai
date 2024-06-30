"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";
import Link from "next/link";

export const UserButton = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='duration-300 hover:scale-125'>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className='bg-sky-500'>
            <FaUser className='text-white' />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className='mr-2 h-4 w-4' />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <Link href='/settings'>
          <DropdownMenuItem
            className={cn(pathname === "/settings" && "bg-slate-800")}
          >
            <GearIcon className='mr-2 h-4 w-4' />
            Settings
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

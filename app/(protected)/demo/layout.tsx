"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const DemoLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div className='mx-6 flex w-full flex-col items-center'>
      <div className='my-5 w-[600px] space-x-3 rounded-xl bg-gray-100 p-5 text-white'>
        <Button
          asChild
          variant={pathname === "/demo/server" ? "outline" : "default"}
        >
          <Link href='/demo/server'>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/demo/client" ? "outline" : "default"}
        >
          <Link href='/demo/client'>Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/demo/admin" ? "outline" : "default"}
        >
          <Link href='/demo/admin'>Admin</Link>
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DemoLayout;

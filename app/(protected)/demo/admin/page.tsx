"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("FORBIDDEN API Route!");
      }
    });
  };
  return (
    <Card className='w-[600px] bg-white text-black'>
      <CardHeader>
        <p className='text-center text-2xl font-semibold'>🔑 Admin</p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message='You are allowed to see this content!' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only API Route</p>
          <Button
            className='border border-gray-300 shadow-lg hover:bg-gray-100'
            onClick={onApiRouteClick}
          >
            Click to test
          </Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
          <p className='text-sm font-medium'>Admin-only Server Action</p>
          <Button
            className='border border-gray-300 shadow-lg hover:bg-gray-100'
            onClick={onServerActionClick}
          >
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;

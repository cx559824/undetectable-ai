import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className='flex grow flex-col items-center justify-center text-9xl font-bold'>
      Settings Page
    </div>
  );
}

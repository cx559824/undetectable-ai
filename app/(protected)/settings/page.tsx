"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={onClick}>Sign Out</button>
    </div>
  );
};

export default SettingsPage;

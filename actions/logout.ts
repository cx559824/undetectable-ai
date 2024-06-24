"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // some server stuff
  // was also created to just demonstrate that
  // Authjs gives capability to logout server or client side
  await signOut();
};

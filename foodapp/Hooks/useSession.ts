// hooks/useSession.ts
"use client";

import { useSession } from "next-auth/react";

export function useUserSession() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    role: session?.user?.role,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
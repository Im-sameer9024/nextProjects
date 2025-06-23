"use client"

import { useUser } from "@clerk/nextjs";

const useRole =  () => {
  
  const {user} =  useUser()

  return {
    role:user?.publicMetadata?.role,
  };
};

export default useRole;

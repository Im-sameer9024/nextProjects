"use client"

import { usePathname, useRouter } from "next/navigation";
import  { useCallback, useState } from "react";

const useNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const path = usePathname();
  const router = useRouter();


  const handleNavigation = useCallback(
    (url: string) => {
      setShowSidebar(false);
      router.push(url);
    },
    [router]
  );

  const handleClose = useCallback(() => {
    setShowSidebar(false);
  }, []);

  return {
    showSidebar,
    path,
    handleClose,
    handleNavigation,
    setShowSidebar
  };
};

export default useNavbar;

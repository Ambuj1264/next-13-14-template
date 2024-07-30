import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAuth, LocalStorageKey } from "@/types/global";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren, useState } from "react";
import { AuthContextContainer } from "./authContext";

interface UseLocalStorageResult {
  item: string | null;
  setItem: (value: string) => void;
  clearStorage: () => void;
}

function AuthProvider({ children }: PropsWithChildren) {
  
  const { setItem, item, clearStorage }: UseLocalStorageResult =
    useLocalStorage<LocalStorageKey>("AUTH_TOKEN");
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(item);
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname === "/dashboard";
  const authenticateUser = (token: string) => {
    setItem(token);
    setIsLoggedIn(token);
  };

  const logout = () => {
    clearStorage();
    setIsLoggedIn(null);
    router.push("/login");
  };

  const contextValues: IAuth = {
    authenticateUser,
    logout,
    isDashboard,
    isLoggedIn: !!isLoggedIn,
  };

  return (
    <AuthContextContainer value={contextValues}>
      {children}
    </AuthContextContainer>
  );
}

export default AuthProvider;

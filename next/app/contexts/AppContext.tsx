import React, { useState } from "react";
import Cookies from "js-cookie";
import { TIME_ZONE_OFFSET } from "@/app/utils/Enums/ConstantEnums";
interface AppProviderProps {
  children: React.ReactNode;
}
interface AppContextValue {
  hasAccessToken?: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: number;
  currentUserName: string;
  currentUserRoleId: number;
  timezone: number;
}
export const AppContext = React.createContext<AppContextValue>(
  {} as AppContextValue
);

export const AppProvider = ({ children }: AppProviderProps) => {
  const hasAccessToken = Cookies.get("accessToken");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentUserId = Number(Cookies.get("userId"));
  const currentUserName = String(Cookies.get("userName"));
  const currentUserRoleId = Number(Cookies.get("roleId"));

  const now = new Date();
  const timezone = now.getTimezoneOffset() / TIME_ZONE_OFFSET;
  return (
    <AppContext.Provider
      value={{
        hasAccessToken,
        isSidebarOpen,
        setIsSidebarOpen,
        currentUserId,
        currentUserName,
        currentUserRoleId,
        timezone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

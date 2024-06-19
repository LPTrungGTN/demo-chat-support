import Cookies from 'js-cookie';
import React from 'react';

interface AppProviderProps {
  children: React.ReactNode;
}
interface AppContextValue {
  hasAccessToken?: string;
}
export const AppContext = React.createContext<AppContextValue>(
  {} as AppContextValue,
);

export const AppProvider = ({ children }: AppProviderProps) => {
  const hasAccessToken = Cookies.get('accessToken');

  return (
    <AppContext.Provider
      value={{
        hasAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

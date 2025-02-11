import { createContext } from "react";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const value = {};
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
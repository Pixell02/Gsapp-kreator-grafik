import { useContext, useState } from "react";
import { createContext } from "react";

export const radioContext = createContext();

export const RadioProvider = ({ children }) => {
  const [radioChecked, setRadioChecked] = useState("radio1");

  return <radioContext.Provider value={{ radioChecked, setRadioChecked }}>{children}</radioContext.Provider>;
};

export const useRadioContext = () => {
  const context = useContext(radioContext);
  if (!context) {
    throw new Error("useRadioContext must be used within a RadioProvider");
  }
  return context;
};

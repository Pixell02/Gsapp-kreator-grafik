import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(null);

  return <ThemeContext.Provider value={{ themeColor, setThemeColor }}>{children}</ThemeContext.Provider>;
};

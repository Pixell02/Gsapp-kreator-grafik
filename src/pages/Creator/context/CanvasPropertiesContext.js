import { createContext, useState } from "react";

export const CanvasPropertiesContext = createContext(null);

export const CanvasContextProvider = ({ children }) => {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  return (
    <CanvasPropertiesContext.Provider value={{ width, setWidth, height, setHeight }}>{children}</CanvasPropertiesContext.Provider>
  );
};

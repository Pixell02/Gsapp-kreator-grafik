import React, { createContext, useState } from "react";

export const ManyBackgroundsContext = createContext();

export function ManyBackgroundsProvider({ children }) {
  const [manyBackgrounds, setManyBackgrounds] = useState([]);
  return (
    <ManyBackgroundsContext.Provider value={{ manyBackgrounds, setManyBackgrounds }}>{children}</ManyBackgroundsContext.Provider>
  );
}

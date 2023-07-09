import { useState } from "react";
import { createContext } from "react";



const radioContext = createContext();

export const RadioProvider = ({ children }) => {
  const [radioChecked, setRadioChecked] = useState("radio1");

  return (
    <radioContext.Provider value={{ radioChecked, setRadioChecked }}>
      {children}
    </radioContext.Provider>
  );
};

export default radioContext;
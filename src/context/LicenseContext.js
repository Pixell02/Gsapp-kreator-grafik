import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";



export const LicenseContext = createContext();


export const LicenseProvider = ({ children }) => {
  const [license, setLicense] = useState();

  
  return (
    <LicenseContext.Provider value={{ license, setLicense }}>
      {children}
    </LicenseContext.Provider>
  )

}
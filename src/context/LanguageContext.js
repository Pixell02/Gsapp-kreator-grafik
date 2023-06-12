import { createContext, useState } from "react";



export const LanguageContext = createContext();


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("lang") ? localStorage.getItem("lang") : "pl");


  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("lang", newLanguage);
  }

  return (
    <LanguageContext.Provider value={{language, changeLanguage}}>
      {children}
    </LanguageContext.Provider>
  )



}
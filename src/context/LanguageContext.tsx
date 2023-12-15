import { PropsWithChildren, createContext, useContext, useState } from 'react';

type LanguageContextProps = {
  language: string;
  changeLanguage: (newLanguage: string) => void;
};

const LanguageContext = createContext<null | LanguageContextProps>(null);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'pl');

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('lang', newLanguage);
  };

  return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }

  return context;
};

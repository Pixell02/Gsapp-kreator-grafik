import React, { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext';

const useLanguageContext = () => {

  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  
  }

  return context;
}

export default useLanguageContext

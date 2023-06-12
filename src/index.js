import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import { LicenseProvider } from './context/LicenseContext';
import { LanguageProvider } from './context/LanguageContext';

ReactDOM.render (
  <AuthContextProvider>
    <LicenseProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </LicenseProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);



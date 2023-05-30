import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './context/AuthContext';
import App from './App';
import { LicenseProvider } from './context/LicenseContext';

ReactDOM.render (
  <AuthContextProvider>
    <LicenseProvider>
    <App />
    </LicenseProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);



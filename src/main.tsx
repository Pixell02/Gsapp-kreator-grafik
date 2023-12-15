import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { LicenseProvider } from './context/LicenseContext.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <LicenseProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </LicenseProvider>
  </AuthContextProvider>
);


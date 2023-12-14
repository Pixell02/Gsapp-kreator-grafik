import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { langSelectOption } from './options';
import { useLanguageContext } from '../context/LanguageContext';
import './languageOption.css';

export default function LanguageOption() {
  const { language, changeLanguage } = useLanguageContext();
  const navigate = useNavigate();

  const handleLanguageChange = (selectedLanguage) => {
    changeLanguage(selectedLanguage);
    const currentPath = window.location.pathname;
    const newPath = `/${selectedLanguage}${currentPath.substring(3)}`;
    navigate(newPath);
  };

  return (
    <div className="w-50 d-flex ml-5 justify-content-end mt-2">
      <NavDropdown title={language}>
        {langSelectOption.map((lang) => (
          <NavDropdown.Item
            key={lang.value}
            className={language === lang.value ? 'selected' : ''}
            onClick={() => handleLanguageChange(lang.value)}>
            <img
              src={lang.label}
              style={{ width: '20px' }}
              alt={lang.value}
            />
            {lang.value}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </div>
  );
}

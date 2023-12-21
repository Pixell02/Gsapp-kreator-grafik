import { Link } from 'react-router-dom';
import translate from './locales/translate.json';
import './returnButton.css';
import { useLanguageContext } from '../context/LanguageContext';

const ReturnButton = () => {
  const { language } = useLanguageContext();
  return (
    <div className="return-container">
      <Link to={`/${language}/yourCatalog`}>
        {'<'}
        {translate.return[language]}
      </Link>
    </div>
  );
};

export default ReturnButton;

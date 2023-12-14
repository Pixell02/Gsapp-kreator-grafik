import React from 'react';
import Title from '../../../components/main-content-elements/Title';
import './MainYourCatalog.css';
import IndividualPosters from './IndividualPosters';
import translate from '../locales/translate.json';
import Navbar from './Navbar';
import { useLanguageContext } from '../../../context/LanguageContext';
export default function MainYourCatalog() {
  const { language } = useLanguageContext();

  return (
    <div className="main-content d-flex flex-column">
      <Title title={translate.yourCatalog[language]} />
      <div className="ml-5 w-100">
        <Navbar />
      </div>
      <div className="ml-5 d-flex flex-column">
        <IndividualPosters />
      </div>
    </div>
  );
}

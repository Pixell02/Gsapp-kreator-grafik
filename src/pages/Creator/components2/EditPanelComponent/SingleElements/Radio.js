import React from 'react';
import { useContext } from 'react';
import radioContext from '../../../context/radioContext';
import translate from '../../../locales/translate.json';
import { useLanguageContext } from '../../../../../context/LanguageContext';

export default function Radio() {
  const { radioChecked, setRadioChecked } = useContext(radioContext);
  const { language } = useLanguageContext();
  return (
    <div className="option-container">
      <div className="input-container">
        <label className="label-container">
          <input
            type="radio"
            value="radio1"
            onChange={(e) => setRadioChecked(e.target.value)}
            checked={radioChecked === 'radio1'}
          />
          <span>{translate.host[language]}</span>
        </label>
      </div>
      <div className="input-container">
        <label>
          <input
            type="radio"
            value="radio2"
            onChange={(e) => setRadioChecked(e.target.value)}
            checked={radioChecked === 'radio2'}
          />
          <span className="guest">{translate.guest[language]}</span>
        </label>
      </div>
    </div>
  );
}

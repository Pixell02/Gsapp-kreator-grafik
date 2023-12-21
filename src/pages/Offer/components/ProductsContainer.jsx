import React from 'react';
import logo from '../../../img/2.png';
import CodeInput from './CodeInput';
import translate from '../locales/translate.json';
import { useLanguageContext } from '../../../context/LanguageContext';

export default function ProductsContainer(props) {
  const { language } = useLanguageContext();

  const licenseRadioArray = [
    { value: '2800', name: 'Licencja MAX 1 miesiąc', title: translate.month[language] },
    { value: '8148', name: 'Licencja MAX 3 miesięce', title: translate.month3[language] },
    { value: '15792', name: 'Licencja MAX 6 miesięce', title: translate.month6[language] },
    { value: '0', name: 'other', title: translate.services[language] },
  ];

  return (
    <>
      <div className="logo-block">
        <img
          src={logo}
          className="logo-image"
          alt="logo"
        />
      </div>
      <div className="price-container">
        <h1>{(props.paymentData.totalAmount / 100).toFixed(2)}zł</h1>
      </div>
      <div className="package-container">
        {licenseRadioArray.map((item) => (
          <label>
            <input
              type="radio"
              value={item.value}
              name={item.name}
              onChange={(e) => {
                props.handleCheckboxChange(e);
                props.setRadioType(e.target.name);
              }}
              checked={props.radioType === item.name}
              defaultChecked
            />
            <span>{item.title}</span>
          </label>
        ))}
      </div>
      {props.radioType && props.radioType === 'other' && (
        <div className="mt-3">
          <a href="http://grafika-sportowa.pl/sklep/">Zakup usług dostępne pod linkiem</a>
        </div>
      )}
      <CodeInput />
    </>
  );
}

import React, { useRef } from 'react';
import translate from '../pages/YourTeamPanel/components/locales/yourTeamPanel.json';
import { useLanguageContext } from '../context/LanguageContext';

const InputImage = ({ setImage }) => {
  const { language } = useLanguageContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <button
        onClick={onButtonClick}
        className="btn primary-btn add-img">
        {translate.addImage[language]}
      </button>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        accept="image/png"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImage(file);
          } else {
            setImage(null);
          }
        }}
      />
    </>
  );
};

export default InputImage;

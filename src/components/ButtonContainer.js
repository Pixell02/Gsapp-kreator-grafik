import React from "react";
import useLanguageContext from "../hooks/useLanguageContext";
import translate from "../pages/YourTeamPanel/components/locales/yourTeamPanel.json";

const ButtonContainer = ({ handleClick, handleSubmit }) => {
  const { language } = useLanguageContext();

  return (
    <div className="buttons-container">
      <button onClick={handleClick} className="btn primary-btn">
        {translate.Cancel[language]}
      </button>
      <button onClick={handleSubmit} className="btn primary-btn">
        {translate.Save[language]}
      </button>
    </div>
  );
};

export default ButtonContainer;

import translation from "../pages/YourTeamPanel/components/locales/yourTeamPanel.json";
import { useLanguageContext } from "../context/LanguageContext";
import { translationProps } from "../types/translationTypes";

type props = {
  handleClick: () => void;
  handleSubmit: () => void;
};

const ButtonContainer = ({ handleClick, handleSubmit }: props) => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;

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

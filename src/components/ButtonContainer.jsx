import translate from '../pages/YourTeamPanel/components/locales/yourTeamPanel.json';
import { useLanguageContext } from '../context/LanguageContext';

const ButtonContainer = ({ handleClick, handleSubmit }) => {
  const { language } = useLanguageContext();

  return (
    <div className="buttons-container">
      <button
        onClick={handleClick}
        className="btn primary-btn">
        {translate.Cancel[language]}
      </button>
      <button
        onClick={handleSubmit}
        className="btn primary-btn">
        {translate.Save[language]}
      </button>
    </div>
  );
};

export default ButtonContainer;

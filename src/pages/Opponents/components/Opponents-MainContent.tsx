import Title from "../../../components/main-content-elements/Title";
import ReturnButton from "../../../components/ReturnButton";
import translation from "../locales/locales.json";
import "./opponents.css";
import { useLanguageContext } from "../../../context/LanguageContext";
import { translationProps } from "../../../types/translationTypes";
import OpponentContent from "./OpponentContent";
import PlaceContent from "./PlaceContent";

function OpponentsMainContent() {
  const translate: translationProps = translation;
  const { language } = useLanguageContext();

  return (
    <div className="main-content">
      <ReturnButton />
      <Title title={translate.opponents[language]} />
      <div className="ml-5">
        <OpponentContent />
        <PlaceContent />
      </div>
    </div>
  );
}

export default OpponentsMainContent;

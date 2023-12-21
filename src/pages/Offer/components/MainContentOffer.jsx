import Title from '../../../components/main-content-elements/Title';
import './MainContentOffer.css';
import BuyFormContainer from './BuyFormContainer';
import ReturnButton from '../../../components/ReturnButton';
import translate from '../locales/translate.json';
import { useLanguageContext } from '../../../context/LanguageContext';

function MainContentOffer() {
  const { language } = useLanguageContext();

  return (
    <div className="main-content">
      <div className="ml-5">
        <ReturnButton />
        <Title title={translate.buyAccess[language]} />
        <BuyFormContainer />
      </div>
    </div>
  );
}

export default MainContentOffer;

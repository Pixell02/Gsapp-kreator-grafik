import Title from "../../../components/main-content-elements/Title";
import "./MainAccount.css";
import Licenses from "./Licenses";
import UserInformation from "./UserInformation";
import ReturnButton from "../../../components/ReturnButton";
import translation from "../locales/translate.json";
import MultiAccountContainer from "./MultiAccountContainer";
import { useLanguageContext } from "../../../context/LanguageContext";
import FaxData from "./FaxData";
import { translationProps } from "../../../types/translationTypes";
import AffiliationContent from "./AffiliationContent";

function MainAccount() {
  const translate: translationProps = translation;
  const { language } = useLanguageContext();

  return (
    <div className="main-content">
      <div className="ml-5">
        <ReturnButton />
        <div className="account-content">
          <Title title={translate.account[language]} />
          <div className="account-items">
            <UserInformation />
            <Licenses />
            <AffiliationContent />
            <MultiAccountContainer />
            <FaxData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainAccount;

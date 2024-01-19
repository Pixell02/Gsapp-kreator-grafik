import { useState } from "react";
import Title from "../../../components/main-content-elements/Title";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./MainAccount.css";
import { useCollection } from "../../../hooks/useCollection";
import useUserInformation from "../../../hooks/useUserInformation";
import Licenses from "./Licenses";
import UserInformation from "./UserInformation";
import ReturnButton from "../../../components/ReturnButton";
import translate from "../locales/translate.json";
import MultiAccountContainer from "./MultiAccountContainer";
import { useLanguageContext } from "../../../context/LanguageContext";
import FaxData from "./FaxData";

function MainAccount() {
  const { user } = useAuthContext();
  const { userCreatedAt } = useUserInformation(user.uid);
  const [userEmail] = useState(user.email);
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);
  const { language } = useLanguageContext();

  return (
    <div className="main-content">
      <div className="ml-5">
        <ReturnButton />
        <div className="account-content">
          <Title title={translate.account[language]} />
          <div className="account-items">
            <UserInformation user={user} userEmail={userEmail} userCreatedAt={userCreatedAt} />
            <Licenses License={License} />
            <MultiAccountContainer />
            <FaxData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainAccount;

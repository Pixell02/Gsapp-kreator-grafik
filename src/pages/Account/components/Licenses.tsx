import verified from "../../../img/verified.png";
import discard from "../../../img/discard.png";
import { Link } from "react-router-dom";
import translation from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { License, useLicenseContext } from "../../../context/LicenseContext";
import { translationProps } from "../../../types/translationTypes";

export default function Licenses({ License }: { License: License }) {
  const { language } = useLanguageContext();
  const { license: userLicense } = useLicenseContext();
  const license = License || userLicense;
  const translate: translationProps = translation;
  return (
    <div>
      {license?.license === "free-trial" && (
        <div className="license-container">
          <div className="license-content">
            <img src={verified} className="icon-verified" />{" "}
            <span>
              {translate.youHave[language]} {license?.numberOfFreeUse} {translate.freeUses[language]}
            </span>
          </div>
        </div>
      )}
      {license && license?.license === "no-license" && (
        <div className="license-container">
          <div className="license-content">
            <img src={discard} className="icon-verified" />{" "}
            <span>
              {translate.expireLicense[language]}
              <Link to="/offer">Kup dostęp</Link>
            </span>
          </div>
        </div>
      )}
      {license && license?.license === "full-license" && (
        <div className="license-container ">
          <p style={{ marginLeft: "20px" }}>{translate.license[language]}</p>
          <div className="license-type">
            <label>{translate.licenseType[language]}</label>
            <input type="text" className="license-content" value="UNLIMITED" disabled />
          </div>
          <div className="license-type">
            <label>{translate.expireDate[language]}</label>
            <input type="text" className="license-content" value={license.expireDate} disabled />
          </div>
          <label>Format MM-DD-YYYY</label>
        </div>
      )}
    </div>
  );
}

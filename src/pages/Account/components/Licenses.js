import React from "react";
import verified from "../../../img/verified.png";
import discard from "../../../img/discard.png";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useContext } from "react";
import translate from "../locales/translate.json";

export default function Licenses({ License }) {
  const { language } = useContext(LanguageContext);
  console.log(License)
  return (
    <div>
      {License && License[0]?.license === "free-trial" && (
        <div className="license-container">
          <div className="license-content">
            <img src={verified} className="icon-verified" />{" "}
            <span>
              {translate.youHave[language]} {License[0]?.numberOfFreeUse} {translate.freeUses[language]}
            </span>
          </div>
        </div>
      )}
      {License && License[0]?.license === "no-license" && (
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
      {License && License[0]?.license === "full-license" && (
        <div className="license-container ">
          <p style={{ marginLeft: "20px" }}>{translate.license[language]}</p>
          <div className="license-type">
            <label>{translate.licenseType[language]}</label>
            <input type="text" className="license-content" value="UNLIMITED" disabled />
          </div>
          <div className="license-type">
            <label>{translate.expireDate[language]}</label>
            <input type="text" className="license-content" value={License[0].expireDate} disabled />
          </div>
          <label>Format MM-DD-YYYY</label>
        </div>
      )}
    </div>
  );
}

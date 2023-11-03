import React from "react";
import { useContext } from "react";
import moment from "moment";
import translate from "../locales/translate.json";
import { LanguageContext } from "../../../context/LanguageContext";
import usePromoCodeContext from "../hooks/usePromoCodeContext";

const PromoCodeInformation = () => {
  const { promoCode } = usePromoCodeContext();
  const { language } = useContext(LanguageContext);
  return (
    <div className="w-100 d-flex align-items-center justify-content-center">
      {promoCode?.expireDate && (
        <div className="border mt-5 p-3 border-success">
          <span className="text-success">
            {translate.youAreUsing[language]}{" "}
            <b>{promoCode.code}</b>,{" "}{translate.whichIsValid[language]}
            <b> {moment(promoCode.expireDate).format("DD-MM-YYYY")}</b>
          </span>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInformation;

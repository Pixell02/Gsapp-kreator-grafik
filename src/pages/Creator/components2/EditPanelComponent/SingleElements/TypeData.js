import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeDate from "./typeDate/typeDate"
import translate from "../../../locales/translate.json"
import { LanguageContext } from "../../../../../context/LanguageContext";
import moment from "moment/moment";

export default function TypeData({ fabricRef, coords, themeOption, posterBackground }) {
  const [Date, setTypeDate] = useState("");
  const { language } = useContext(LanguageContext)
  useEffect(() => {
    setTimeout(() => {
      setTypeDate(moment().format("DD.MM.YYYY"));
    },500)
  }, [fabricRef.current?._objects]);



  useEffect(() => {
    if (fabricRef.current?._objects && Date !== "") {
        typeDate(fabricRef, Date, coords, themeOption, posterBackground)
    }
  },[fabricRef.current,Date, posterBackground])

  return (
    <>
      <label>{translate.typeDate[language]}</label>
      <input type="text" onChange={e => setTypeDate(e.target.value)} value={Date} className="date-type" />
    </>
  );
};



import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import translate from "./locales/translate.json"
import "./returnButton.css";

const ReturnButton = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="return-container">
      <Link to={`/${language}/yourCatalog`}>{"<"}{translate.return[language]}</Link>
    </div>
  );
};

export default ReturnButton;

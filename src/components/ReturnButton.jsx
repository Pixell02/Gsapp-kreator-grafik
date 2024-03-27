import { Link } from "react-router-dom";
import translate from "./locales/translate.json";
import "./returnButton.css";
import { useLanguageContext } from "../context/LanguageContext";

const ReturnButton = () => {
  const { language } = useLanguageContext();
  return (
    <div className="return-container w-75">
      <Link className="d-flex w-100" to={`/${language}/yourCatalog`}>
        {"<"}
        {translate.return[language]}
      </Link>
      {/* <div className="d-flex w-75 justify-content-end">
        <button className="btn">Samouczek</button>
      </div> */}
    </div>
  );
};

export default ReturnButton;

import Title from "../../../components/main-content-elements/Title";
import Catalog from "./CatalogBlock";
import translate from "../locales/catalog.json";
import "../../../components/main-content-elements/Main.css";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

function MainCatalog() {
  const {language} = useContext(LanguageContext)
  return (
    <div className="main-content">
      <div className="ml-5">
        <Title title={translate.title[language]} />
        <div className="item-container">
          <Catalog />
        </div>
      </div>
    </div>
  );
}

export default MainCatalog;

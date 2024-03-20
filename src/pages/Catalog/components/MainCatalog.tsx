import Title from "../../../components/main-content-elements/Title";
import CatalogBlock from "./CatalogBlock";
import translation from "../locales/catalog.json";
import "../../../components/main-content-elements/Main.css";
import { useState } from "react";
import ReturnButton from "../../../components/ReturnButton";
import { useTeamContext } from "../../../context/TeamContext";
// import Select from "react-select";
import { useLanguageContext } from "../../../context/LanguageContext";
import ThemeCode from "./ThemeCode";
import ThemeTypeIcon from "../../stats/components/AdministratorPanel/Themes/ThemeTypeIcon";
import { translationProps } from "../../../types/translationTypes";
import Select from "../../../components/Select";

function MainCatalog() {
  const { language } = useLanguageContext();
  const { sportOptions, setSelectedSportKeys, selectedSportKeys } = useTeamContext();
  const [selectedType, setSelectedType] = useState<"normal" | "story">("normal");
  const translate: translationProps = translation;

  return (
    <div className="main-content">
      <div className="ml-5">
        <ReturnButton />
        <Title title={translate.title[language]} />
        <ThemeCode />
        {sportOptions && sportOptions.length > 1 && (
          <Select
            options={sportOptions}
            value={selectedSportKeys as string}
            onChange={(option) => setSelectedSportKeys(option.target.value)}
          />
        )}
        <div className="d-flex">
          <ThemeTypeIcon selectedType={selectedType} setSelectedType={setSelectedType} />
        </div>
        <div className="item-container">
          <CatalogBlock selectedType={selectedType} setSelectedPoster={setSelectedType} />
        </div>
      </div>
    </div>
  );
}

export default MainCatalog;

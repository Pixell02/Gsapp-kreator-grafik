import React, { useState } from "react";
import useOrderBy from "../../../Catalog/hooks/useOrderBy";
import ThemeBlock from "./Themes/ThemeBlock";
import ThemesBar from "./Themes/ThemesBar";
import useSearchDocsByQuery from "../../../../hooks/useSearchDocsByQuery";

export default function Themes() {
  const [selectedSportOption, setSelectedSportOption] = useState("piłka nożna");
  const [selectedLangOption, setSelectedLangOption] = useState("pl");

  const { documents: themes } = useSearchDocsByQuery(
    "catalog",
    "lang",
    "==",
    selectedLangOption,
    "sport",
    "==",
    selectedSportOption
  );
  const { documents: posters } = useOrderBy("piecesOfPoster", "themeId");

  const handleSportChange = (e) => {
    setSelectedSportOption(e.value);
  };
  const handleLangChange = (e) => {
    setSelectedLangOption(e.value);
  };

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <ThemesBar
        handleLangChange={handleLangChange}
        themes={themes}
        selectedLangOption={selectedLangOption}
        selectedSportOption={selectedSportOption}
        handleSportChange={handleSportChange}
      />
      <div className="d-flex mt-4 flex-column">
        <p>Motywy</p>
        <div>{themes && <ThemeBlock themes={themes} posters={posters} />}</div>
      </div>
    </div>
  );
}

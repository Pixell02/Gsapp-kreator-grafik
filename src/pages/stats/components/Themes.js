import React from "react";
import { useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import ThemesBar from "./ThemesBar";
import ThemeBlock from "./ThemeBlock";

export default function Themes() {
  const [selectedSportOption, setSelectedSportOption] = useState("football");
  const [selectedLangOption, setSelectedLangOption] = useState("pl");
  const { documents: themes } = useCollection("catalog");
  const { documents: posters } = useCollection("piecesOfPoster");

  const handleSportChange = (e) => {
    setSelectedSportOption(e.value);
  };
  const handleLangChange = (e) => {
    setSelectedLangOption(e.value);
  };

  const filteredData = themes
    ? themes.filter((item) => {
        if (selectedLangOption !== "" && item.lang !== selectedLangOption) {
          return false;
        }
        if (selectedSportOption !== "" && item.sport !== selectedSportOption) {
          return false;
        }
        return true;
      })
    : [];

  const filteredPosters = posters
    ? posters.filter((item) => {
        if (!posters.themeId) {
          return false;
        } else {
          return true;
        }
      })
    : [];

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <ThemesBar handleLangChange={handleLangChange} handleSportChange={handleSportChange} />
      <div className="d-flex mt-4 flex-column">
        <p>Motywy</p>
        <ThemeBlock themes={filteredData} />
      </div>
    </div>
  );
}

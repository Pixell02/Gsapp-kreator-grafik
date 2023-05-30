import React from "react";
import { useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import useOrderBy from "../../Catalog/hooks/useOrderBy";
import ThemesBar from "./ThemesBar";
import ThemeBlock from "./ThemeBlock";
import ThemeAddModal from "./ThemeAddModal";

export default function Themes() {
  const [selectedSportOption, setSelectedSportOption] = useState("piłka nożna");
  const [selectedLangOption, setSelectedLangOption] = useState("pl");
  const [isOpen, setIsOpen] = useState(false);
  const { documents: themes } = useCollection("catalog");
  
  const { documents: posters } = useOrderBy("piecesOfPoster", "themeId")
  

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
      {isOpen &&<ThemeAddModal setIsOpen={() => setIsOpen(false)} themes={themes} selectedLangOption={selectedLangOption} selectedSportOption={selectedSportOption} /> } 
      <ThemesBar setIsOpen={() => setIsOpen(true)}  handleLangChange={handleLangChange} handleSportChange={handleSportChange} />
      <div className="d-flex mt-4 flex-column">
        <p>Motywy</p>
        <div>
        <ThemeBlock themes={filteredData} posters={posters} />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useCollection } from "../../../../hooks/useCollection";
import useOrderBy from "../../../Catalog/hooks/useOrderBy";
import Modals from "./Themes/Modals";
import ThemeBlock from "./Themes/ThemeBlock";
import ThemesBar from "./Themes/ThemesBar";

export default function Themes() {
  const [selectedSportOption, setSelectedSportOption] = useState("piłka nożna");
  const [selectedLangOption, setSelectedLangOption] = useState("pl");
  const [isOpen, setIsOpen] = useState({
    isOpen: false,
    type: "",
  });
  const { documents: themes } = useCollection("catalog");
  const { documents: posters } = useOrderBy("piecesOfPoster", "themeId");
  const [selectedTheme, setSelectedTheme] = useState(null);

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

  return (
    <div className="w-100 h-100 d-flex flex-column">
      {isOpen?.isOpen && (
        <Modals
          isOpen={isOpen}
          selectedTheme={selectedTheme}
          setIsOpen={() => setIsOpen({ isOpen: false, type: "" })}
          themes={themes}
          selectedLangOption={selectedLangOption}
          selectedSportOption={selectedSportOption}
        />
      )}
      <ThemesBar
        setIsOpen={() => setIsOpen({ isOpen: true, type: "add" })}
        handleLangChange={handleLangChange}
        handleSportChange={handleSportChange}
      />
      <div className="d-flex mt-4 flex-column">
        <p>Motywy</p>
        <div>
          <ThemeBlock setSelectedTheme={setSelectedTheme} setIsOpen={setIsOpen} themes={filteredData} posters={posters} />
        </div>
      </div>
    </div>
  );
}

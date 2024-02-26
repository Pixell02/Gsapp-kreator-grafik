import React, { useState } from "react";
import useOrderBy from "../../../Catalog/hooks/useOrderBy";
import ThemeBlock from "./Themes/ThemeBlock";
import ThemesBar from "./Themes/ThemesBar";
import useSearchDocsByQuery from "../../../../hooks/useSearchDocsByQuery";
import { Catalog } from "../../../../types/creatorComponentsTypes";

export default function Themes() {
  const [selectedSportOption, setSelectedSportOption] = useState("piłka nożna");

  const { documents: themes } = useSearchDocsByQuery<Catalog>("catalog", "sport", "==", selectedSportOption);
  const { documents: posters } = useOrderBy("piecesOfPoster", "themeId");

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSportOption(e.target.value);
  };

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <ThemesBar themes={themes} selectedSportOption={selectedSportOption} handleSportChange={handleSportChange} />
      <div className="d-flex mt-4 flex-column">
        <p>Motywy</p>
        <div>{themes && <ThemeBlock themes={themes} posters={posters} />}</div>
      </div>
    </div>
  );
}

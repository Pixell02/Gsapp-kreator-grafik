import Select from "react-select";
import { langOptions, sportOptions } from "../../../../../components/options";
import { useState } from "react";
import ThemeAddModal from "./Modals/ThemeAddModal";

export default function ThemesBar({
  handleLangChange,
  handleSportChange,
  selectedLangOption,
  selectedSportOption,
  themes,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-100">
      {isOpen && (
        <ThemeAddModal
          setIsOpen={() => setIsOpen(false)}
          themes={themes}
          selectedLangOption={selectedLangOption}
          selectedSportOption={selectedSportOption}
        />
      )}
      <div className="d-flex flex-row">
        <div>
          <label>
            {" "}
            wybierz sport
            <Select options={sportOptions} onChange={handleSportChange} />
          </label>
        </div>
        <div className="ml-5">
          <label>
            {" "}
            wybierz język
            <Select options={langOptions} onChange={handleLangChange} />
          </label>
          <button onClick={setIsOpen} className="btn">
            Dodaj motyw
          </button>
        </div>
      </div>
    </div>
  );
}

import { sportOptions } from "../../../../../components/options";
import { useState } from "react";
import ThemeAddModal from "./Modals/ThemeAddModal";
import Select from "../../../../../components/Select";
import { Catalog } from "../../../../../types/creatorComponentsTypes";

type props = {
  handleSportChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedSportOption: string;
  themes: Catalog[];
};

export default function ThemesBar({ handleSportChange, selectedSportOption, themes }: props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-100">
      {isOpen && (
        <ThemeAddModal setIsOpen={() => setIsOpen(false)} themes={themes} selectedSportOption={selectedSportOption} />
      )}
      <div className="d-flex flex-row">
        <div>
          <label>
            {" "}
            wybierz sport
            <Select value={selectedSportOption} options={sportOptions} onChange={handleSportChange} />
          </label>
        </div>
        <div className="ml-5">
          <button onClick={() => setIsOpen(true)} className="btn">
            Dodaj motyw
          </button>
        </div>
      </div>
    </div>
  );
}

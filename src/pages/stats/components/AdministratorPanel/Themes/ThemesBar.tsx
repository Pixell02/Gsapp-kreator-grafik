import { sportOptions } from "../../../../../components/options";
import { Dispatch, SetStateAction, useState } from "react";
import ThemeAddModal from "./Modals/ThemeAddModal";
import Select from "../../../../../components/Select";
import { Catalog } from "../../../../../types/creatorComponentsTypes";
import ThemeTypeIcon from "./ThemeTypeIcon";

type props = {
  handleSportChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedSportOption: string;
  themes: Catalog[];
  selectedType: "normal" | "story";
  setSelectedType: Dispatch<SetStateAction<"normal" | "story">>;
};

export default function ThemesBar({
  handleSportChange,
  selectedSportOption,
  themes,
  selectedType,
  setSelectedType,
}: props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-100">
      {isOpen && (
        <ThemeAddModal
          setIsOpen={() => setIsOpen(false)}
          selectedType={selectedType}
          themes={themes}
          selectedSportOption={selectedSportOption}
        />
      )}
      <div className="d-flex flex-row align-items-center">
        <label>
          {" "}
          wybierz sport
          <Select value={selectedSportOption} options={sportOptions} onChange={handleSportChange} />
        </label>
        <ThemeTypeIcon selectedType={selectedType} setSelectedType={setSelectedType} />
        <div className="ml-5">
          <button onClick={() => setIsOpen(true)} className="btn">
            Dodaj motyw
          </button>
        </div>
      </div>
    </div>
  );
}

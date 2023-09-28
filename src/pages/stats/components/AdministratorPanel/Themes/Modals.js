import React from "react";
import ThemeAddModal from "./Modals/ThemeAddModal";
import ThemeEditModal from "./Modals/ThemeEditModal";
import ThemeDeleteModal from "./Modals/ThemeDeleteModal";

const Modals = ({ isOpen, setIsOpen, themes, selectedLangOption, selectedSportOption, selectedTheme }) => {
  console.log(isOpen)
  return (
    <div>
      {isOpen.type === "add" && (
        <ThemeAddModal
          setIsOpen={() => setIsOpen(false)}
          themes={themes}
          selectedLangOption={selectedLangOption}
          selectedSportOption={selectedSportOption}
        />
      )}
      {isOpen.type === "edit" && <ThemeEditModal selectedTheme={selectedTheme} setIsOpen={setIsOpen} />}
      {isOpen.type === "delete" && <ThemeDeleteModal selectedTheme={selectedTheme} setIsOpen={setIsOpen}  />}
    </div>
  );
};

export default Modals;

import React from "react";
import StartingPlayers from "./components/StartingPlayers";
import ReservePlayers from "./components/ReservePlayers";
import MultiElements from "./components/MultiElements";

const SelectWindow = ({ isModalOpen, setIsModalOpen, fabricRef, coords, themeOption, setSelectedMatch, selectedMatch }) => {
  const handleClick = () => {
    setIsModalOpen({ id: null, open: false });
    setSelectedMatch(null);
  };

  return (
    <div>
      {isModalOpen.id === 1 && <StartingPlayers fabricRef={fabricRef} coords={coords} themeOption={themeOption} />}
      {isModalOpen.id === 2 && <ReservePlayers fabricRef={fabricRef} coords={coords} themeOption={themeOption} />}
      {isModalOpen.id === 3 && <MultiElements fabricRef={fabricRef} coords={coords} selectedMatch={selectedMatch} />}
      <button className="w-100 btn mt-5" onClick={() => handleClick()}>
        Zamknij
      </button>
    </div>
  );
};

export default SelectWindow;

import React from "react";
import PlayerContent from "./PlayerContent";
import SquadPresetContent from "./SquadPresetContent";
import ReturnButton from "../../../components/ReturnButton";

const MainContent = () => {
  return (
    <div className="main-content">
      <ReturnButton />
      <PlayerContent />
      <SquadPresetContent />
    </div>
  );
};

export default MainContent;

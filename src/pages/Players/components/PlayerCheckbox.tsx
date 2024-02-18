import React, { ChangeEventHandler } from "react";
import { Player } from "../../../types/teamTypes";

type props = {
  selectedPlayers: Player[];
  player: Player;
  handleCheck: ChangeEventHandler<HTMLInputElement>;
};

const PlayerCheckbox = ({ selectedPlayers, player, handleCheck }: props) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={selectedPlayers?.some(
            (selectedPlayer: Player) =>
              selectedPlayer.firstName === player.firstName &&
              selectedPlayer.secondName === player.secondName &&
              selectedPlayer.number === player.number
          )}
          onChange={handleCheck}
        />
        <span>{player.number || "" + " " + player.firstName + " " + player.secondName}</span>
      </label>
    </div>
  );
};

export default PlayerCheckbox;

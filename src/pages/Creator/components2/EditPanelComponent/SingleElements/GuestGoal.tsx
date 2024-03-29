import React from "react";
import { Goal } from "../../../../../types/creatorComponentsTypes";

type GuestProps = {
  i: number;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>, i: number, type: string) => void;
  player: Goal;
  handlePlayerChange: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
};

const GuestGoal = ({ i, handleValueChange, player, handlePlayerChange }: GuestProps) => {
  return (
    <div className="d-flex w-100">
      <div className="w-25">
        <label htmlFor={`input${i}`}>Minuta</label>
        <input
          value={player.time}
          className="time"
          type="number"
          min="0"
          onChange={(e) => handleValueChange(e, i, "guest")}
        />
      </div>
      <div className="w-75">
        <label htmlFor={`text${i}`}>GOL przeciwnika</label>
        <input type="text" value={player.player as string} onChange={(e) => handlePlayerChange(e, i)} />
      </div>
    </div>
  );
};

export default GuestGoal;

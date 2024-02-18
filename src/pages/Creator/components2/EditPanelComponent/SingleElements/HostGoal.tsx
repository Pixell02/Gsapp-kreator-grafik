import Select, { SingleValue } from "react-select";
import React from "react";
import { Goal } from "../../../../../types/creatorComponentsTypes";
import { Player } from "../../../../../types/teamTypes";

type options = {
  label: string;
  value: Player | undefined;
};

type props = {
  i: number;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement>, i: number, type: string) => void;
  handleSelectChange: (option: SingleValue<options | null>, i: number) => void;
  playerOptions: options[];
  player: Goal;
};

const HostGoal = ({ i, handleValueChange, handleSelectChange, playerOptions, player }: props) => {
  return (
    <div className="d-flex align-items-center w-100">
      <div className="w-25">
        <label htmlFor={`input`}>Minuta</label>
        <input
          className="time"
          value={player.time}
          type="number"
          min="0"
          onChange={(e) => handleValueChange(e, i, "host")}
        />
      </div>
      <div className="w-75">
        <label htmlFor={`select${i}`}>{`Twój GOL ${i + 1}`}</label>
        <Select
          className="player-select"
          id={`select${i + 1}`}
          options={playerOptions}
          onChange={(option: SingleValue<options>) => handleSelectChange(option, i)}
        />
      </div>
    </div>
  );
};

export default HostGoal;

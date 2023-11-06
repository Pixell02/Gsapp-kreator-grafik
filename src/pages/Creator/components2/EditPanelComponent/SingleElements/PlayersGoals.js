import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import radioContext from "../../../context/radioContext";
import useCreateOpponentGoals from "../../../hooks2/useCreateOpponentGoals";
import useCreateYourTeamGoals from "../../../hooks2/useCreateYourTeamGoals";
import opponentTeamResult from "./result/opponentTeamResult";
import yourTeamResult from "./result/yourTeamResult";
import useThemeContext from "../../../hooks/useThemeContext";

export default function PlayersGoals({ fabricRef, coords, posterBackground, Players }) {
  const [playerOptions, setPlayerOption] = useState([]);
  const [opponentGoals, handleOpponentGoalChange, handleOpponentMinuteChange, opponentGoalMinute] = useCreateOpponentGoals(
    Array(9).fill()
  );
  const [yourTeamGoal, handleGoalChange, handleYourTeamMinuteChange, yourTeamGoalMinute] = useCreateYourTeamGoals(
    Array(9).fill()
  );
  const { themeColor } = useThemeContext();
  const { radioChecked } = useContext(radioContext);

  useEffect(() => {
    if (Players) {
      const options = Players.map((player) => ({
        label: player.number + " " + player.firstName + " " + player.secondName,
        value: player.firstName + "." + player.secondName,
      }));

      setPlayerOption(options);
    }
  }, [Players]);

  useEffect(() => {
    if (fabricRef.current?._objects && (yourTeamGoal || yourTeamGoalMinute)) {
      yourTeamResult({ fabricRef, yourTeamGoal, yourTeamGoalMinute, coords, radioChecked, themeColor });
    }
  }, [fabricRef, yourTeamGoal, yourTeamGoalMinute, radioChecked, posterBackground, coords, themeColor]);

  useEffect(() => {
    if (fabricRef.current?._objects && (opponentGoals || opponentGoalMinute)) {
      opponentTeamResult({ fabricRef, opponentGoals, opponentGoalMinute, coords, radioChecked });
    }
  }, [fabricRef, opponentGoals, opponentGoalMinute, radioChecked, posterBackground, coords, themeColor]);

  return (
    <div>
      {coords &&
        coords.yourPlayerOneGoal &&
        yourTeamGoal.map((goal, i) => (
          <div key={i} className="goal-container">
            <div className="minute-container">
              <label htmlFor={`input${i + 1}`}>Minuta</label>
              <input id={`input${i + 1}`} type="number" min="0" onChange={(e) => handleYourTeamMinuteChange(e, i)} />
            </div>
            <div className="goals-container">
              <label htmlFor={`select${i}`}>{`Twój GOL ${i + 1}`}</label>
              <Select
                className="player-select"
                id={`select${i + 1}`}
                options={playerOptions}
                onChange={(e) => handleGoalChange(e, i)}
              />
            </div>
          </div>
        ))}
      {coords &&
        coords.opponentPlayerOneGoal &&
        opponentGoals.map((goal, i) => (
          <div key={i} className="goal-container">
            <div className="minute-container">
              <label htmlFor={`input${i}`}>Minuta</label>
              <input id={`imput${i}`} type="number" min="0" onChange={(e) => handleOpponentMinuteChange(e, i)} />
            </div>
            <div className="goals-container">
              <label htmlFor={`text${i}`}>GOL przeciwnika</label>
              <input id={`text${i}`} type="text" onChange={(e) => handleOpponentGoalChange(e, i)} />
            </div>
          </div>
        ))}
    </div>
  );
}

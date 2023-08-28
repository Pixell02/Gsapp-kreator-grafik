import React, { useState } from "react";
import useTeamContext from "../../../../hooks/useTeamContext";
import "./startingPlayers.css";
import { useEffect } from "react";
import squadPlayer from "../../SingleElements/playerOption/squadPlayer";
import Select from "react-select";
const StartingPlayers = ({fabricRef, coords, themeOption}) => {
  const { Players, selectedPlayers, handlePlayerChecked } = useTeamContext();
  const [goalkeeper, setGoalkeeper] = useState(null);
  const [capitan, setCapitan] = useState(null);
  const [playerSelect, setPlayerSelect] = useState();
  useEffect(() => {
   
    if (fabricRef.current?._objects && selectedPlayers) {
      squadPlayer(fabricRef, selectedPlayers, coords, themeOption, goalkeeper, capitan)
    }
  }, [selectedPlayers, goalkeeper, capitan])
  
  useEffect(() => {
    const option = selectedPlayers?.map((player) => ({
      label: (player.number || "") + " " + player.firstName + " " + player.secondName,
      value: {
        number: player.number,
        firstName: player.firstName,
        secondName: player.secondName,
        age: player?.age
      }
      // value: (player.number || "") + " " + player.firstName + " " + player.secondName
    }))
    setPlayerSelect(option)
  },[selectedPlayers])
  return (
    <div className="w-100 d-flex align-items-center flex-column">
      {Players &&
        Players.map((player, i) => (
          <div className="w-100 d-flex flex-row" key={i}>
            <div className="checkbox-container">
              <label>
                <input
                  type="checkbox"
                  style={{ width: "50px", height: "50px" }}
                  checked={selectedPlayers.some(
                    (selectedPlayer) =>
                      selectedPlayer.firstName === player.firstName &&
                      selectedPlayer.secondName === player.secondName &&
                      selectedPlayer.number === player.number
                  )}
                  onChange={() => handlePlayerChecked(player)}
                  name={player.firstName}
                />
                <span>{(player.number || "") + " " + player.firstName + " " + player.secondName}</span>
              </label>
            </div>
            <div className="player-image">
              {player.img && <img src={player.img} alt={player.firstName} />}
            </div>
          </div>
        ))}
      <span>Kapitan</span>
      <Select options={playerSelect} onChange={(option) => setCapitan(option.value)} />
      <span>Bramkarz</span>
      <Select options={playerSelect} onChange={(option) => setGoalkeeper(option.value)} />
    </div>
  );
};

export default StartingPlayers;

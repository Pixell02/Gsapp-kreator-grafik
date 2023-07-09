import React, { useEffect, useState } from "react";
import Select from "react-select";
import playerName from "./playerOption/playerName";

export default function Player({ fabricRef, coords, themeOption, posterBackground, Players }) {
  const [playerOptions, setPlayerOption] = useState([]);
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
  const [selectedPlayerImage, setSelectedPlayerImage] = useState("");

  useEffect(() => {
    if (Players) {
      const options = Players.map((player) => ({
        label: player.number + "." + player.firstName + "." + player.secondName,
        value: player.img + " " + player.firstName + " " + player.secondName,
      }));

      setPlayerOption(options);
    }
  }, [Players]);

  useEffect(() => {
    
    if (fabricRef.current && selectedPlayerName !== "") {
      playerName(fabricRef, selectedPlayerName, coords, themeOption, posterBackground)
    }
    if (fabricRef.current && selectedPlayerImage.split(" ")[0] !== "" && coords.playerImage) {
      
    }
  }, [fabricRef.current, themeOption, posterBackground, selectedPlayerName, selectedPlayerImage]);

  const handleSelectPlayer = (option) => {
    setSelectedPlayerName(option.label);
    setSelectedPlayerImage(option.value);
  };

  return (
    <>
      {playerOptions && (
        <>
          <label>Zawodnik</label>
          <Select options={playerOptions} onChange={handleSelectPlayer} />
        </>
      )}
    </>
  );
}

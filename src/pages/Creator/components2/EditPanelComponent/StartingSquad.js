import React, { useEffect, useState } from "react";
import Select from "react-select";
import squadPlayer from "./playerOption/squadPlayer";
import { useParams } from "react-router-dom";
import ReservePlayers from "../../components/ReservePlayers";
import useReservePlayer from "../../hooks2/useReservePlayer";
import showReserve from "./playerOption/showReserve";

export default function StartingSquad({ fabricRef, coords, themeOption, posterBackground, Players }) {
  const [playerOptions, setPlayerOption] = useState([]);
  const [squadPlayers, setSquadPlayers] = useState(Array(11).fill());
  const [goalKeeper, setGoalKeeper] = useState(Array(2).fill(""));
  const [capitan, setCapitan] = useState();
  const [young, setYoung] = useState(Array(11).fill(""));

  const getGoalKeeper = (options) => {
    setGoalKeeper((prev) => [...prev, options.value]);
    // let filtered = specialPlayerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setSpecialPlayerOption(filtered);
  };
  const getCapitan = (options) => {
    setCapitan(options.value);
    // let filtered = specialPlayerOptions.filter(
    //   (player) => player.value !== options.value
    // );
    // setSpecialPlayerOption(filtered);
  };
  const getYoung = (options) => {
    setYoung((prev) => [...prev, options.value]);
  };
  const [reserve, handleReserveChange] = useReservePlayer(Array(9).fill());
  const poster = useParams();

  const handlePlayerChange = (option, i) => {
    const newPlayerValue = [...squadPlayers];
    newPlayerValue[i] = option.value;
    setSquadPlayers(newPlayerValue);
  };

  useEffect(() => {
    if (Players) {
      const options = Players.map((player) => ({
        label: player.number + " " + player.firstName + " " + player.secondName,
        value: player.number + "." + player.firstName + "." + player.secondName,
      }));

      setPlayerOption(options);
    }
  }, [Players]);

  useEffect(() => {
    if (fabricRef.current && squadPlayers) {
      squadPlayer(fabricRef, squadPlayers, themeOption, coords, young, goalKeeper, capitan, poster);
    }
  }, [fabricRef.current, squadPlayers, themeOption, posterBackground, goalKeeper, capitan, young]);

  useEffect(() => {
    if (fabricRef.current && reserve) {
      showReserve(fabricRef, reserve, coords, themeOption, young, goalKeeper, capitan, poster);
    }
  }, [fabricRef.current, reserve, themeOption, posterBackground, goalKeeper, capitan, young]);

  return (
    <>
      {coords && coords.playerOne && (
        <>
          <p style={{ margin: "20px" }}>Zawodnicy</p>
          {squadPlayers &&
            squadPlayers.map((player, i) => (
              <div key={i}>
                <label htmlFor={`select${i}`}>Zawodnik {i + 1}</label>

                <Select
                  id={`select${i}`}
                  options={playerOptions}
                  onChange={(option) => handlePlayerChange(option, i)}
                />
              </div>
            ))}
        </>
      )}
      {coords && coords.reserveOne && (
        <>
      <p style={{ marginTop: "20px" }}>Rezerwowi</p>
          <ReservePlayers reserve={reserve} playerOptions={playerOptions} handleReserveChange={handleReserveChange} />
        </>
      )}
      {coords && (coords.reserveOne || coords.playerOne) && (
        <>
      <label>Bramkarz 1</label>
      
<Select options={playerOptions} onChange={getGoalKeeper} />
<label>Bramkarz 2</label>
<Select options={playerOptions} onChange={getGoalKeeper} />

<label>Kapitan</label>

<Select options={playerOptions} onChange={getCapitan} />

{young &&
  young.map((young, i) => (
    <>
      <label>Młodzieżowiec {i + 1}</label>
      <Select options={playerOptions} onChange={getYoung} />
    </>
  ))}
          </>
      )}
    </>
  );
}

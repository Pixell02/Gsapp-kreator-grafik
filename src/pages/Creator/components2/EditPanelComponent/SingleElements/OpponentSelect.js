import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import opponentLogo from "./TeamOption/opponentLogo";
import { useContext } from "react";
import radioContext from "../../../context/radioContext";
import opponentsFullName from "./TeamOption/opponentsFullName";
import opponentsFirstName from "./TeamOption/opponentsFirstName";
import opponentsSecondName from "./TeamOption/opponentsSecondName";

const OpponentSelect = ({ Opponents, fabricRef, coords, posterBackground, themeOption }) => {
  const [opponentsName, setOpponentsName] = useState("");
  const [opponentsLogo, setOpponentsLogo] = useState("");
  const [options, setOptions] = useState([]);
  const { radioChecked } = useContext(radioContext);

 

  useEffect(() => {
    if (Opponents) {
      const options = Opponents.map((opponent) => ({
        value: opponent.img,
        label: `${opponent.firstName} ${opponent.secondName}`,
      }));

      setOptions(options);
    }
  }, [Opponents]);

  const setOpponent = (option) => {
    fetch(`${option.value}`)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setOpponentsLogo(reader.result);
        };
      });
    setOpponentsName(option.label);
  };
  useEffect(() => {
    if (fabricRef.current && opponentsLogo) {
      opponentLogo(fabricRef, opponentsLogo, coords, themeOption, radioChecked);
    }
  }, [fabricRef.current, coords, posterBackground, themeOption, opponentsLogo, radioChecked]);

  useEffect(() => {
    if (fabricRef.current && opponentsName !== "") {
      if (coords.opponentFirstName) {
        opponentsFirstName(fabricRef, opponentsName, coords, themeOption, radioChecked);
      }
      if (coords.opponentSecondName) {
        opponentsSecondName(fabricRef, opponentsName, coords, themeOption, radioChecked);
      }
      if (coords.opponentName) {
        opponentsFullName(fabricRef, opponentsName, coords, themeOption, radioChecked);
      }
    }
  }, [fabricRef.current, coords, posterBackground, themeOption, opponentsName, radioChecked]);

  return (
    <>
      <label>Przeciwnicy</label>
      {Opponents && <Select options={options} onChange={setOpponent} />}
    </>
  );
};

export default OpponentSelect;

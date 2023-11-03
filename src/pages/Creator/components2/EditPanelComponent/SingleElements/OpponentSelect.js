import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { LanguageContext } from "../../../../../context/LanguageContext";
import useFetch from "../../../../../hooks/useFetch";
import radioContext from "../../../context/radioContext";
import useOpponents from "../../../hooks/useOpponents";
import translate from "../../../locales/translate.json";
import opponentLogo from "./TeamOption/opponentLogo";
import opponentsFirstName from "./TeamOption/opponentsFirstName";
import opponentsFullName from "./TeamOption/opponentsFullName";
import opponentsSecondName from "./TeamOption/opponentsSecondName";

const OpponentSelect = ({
  fabricRef,
  coords,
  posterBackground,
  themeOption,
}) => {
  const options = useOpponents();
  const [selectedValue, setSelectedValue] = useState(null);
  const { image: opponentsLogo } = useFetch(selectedValue?.img);
  const [opponentsName, setOpponentsName] = useState("");
  const { radioChecked } = useContext(radioContext);
  const { language } = useContext(LanguageContext);

  const setOpponent = (option) => {
    setSelectedValue(option.value);
    setOpponentsName(option.label);
  };
  useEffect(() => {
    if (fabricRef.current?._objects && opponentsLogo && coords.opponentImage) {
      opponentLogo(fabricRef, opponentsLogo, coords, themeOption, radioChecked);
    }
  }, [
    fabricRef.current,
    coords,
    posterBackground,
    themeOption,
    opponentsLogo,
    radioChecked,
  ]);

  useEffect(() => {
    if (fabricRef.current?._objects && opponentsName !== "") {
      if (coords.opponentFirstName) {
        opponentsFirstName(
          fabricRef,
          opponentsName,
          coords,
          themeOption,
          radioChecked
        );
      }
      if (coords.opponentSecondName) {
        opponentsSecondName(
          fabricRef,
          opponentsName,
          coords,
          themeOption,
          radioChecked
        );
      }
      if (coords.opponentName) {
        opponentsFullName(
          fabricRef,
          opponentsName,
          coords,
          themeOption,
          radioChecked
        );
      }
    }
  }, [
    fabricRef.current,
    coords,
    posterBackground,
    themeOption,
    opponentsName,
    radioChecked,
  ]);

  return (
    <>
      <label>{translate.Opponents[language]}</label>
      {options && <Select options={options} onChange={setOpponent} />}
    </>
  );
};

export default OpponentSelect;

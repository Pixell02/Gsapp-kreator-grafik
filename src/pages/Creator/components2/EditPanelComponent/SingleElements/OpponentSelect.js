import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../../../hooks/useTeamLicenseCollection";
import radioContext from "../../../context/radioContext";
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
  const { user } = useAuthContext();
  const { documents: LicenseOpponents } = useTeamLicenseCollection("Opponents");
  const [opponentsName, setOpponentsName] = useState("");
  const [opponentsLogo, setOpponentsLogo] = useState("");
  const [options, setOptions] = useState([]);
  const { radioChecked } = useContext(radioContext);
  const { language } = useContext(LanguageContext);
  const { documents: Opponents } = useCollection("Opponents", [
    "uid",
    "==",
    user.uid,
  ]);
  useEffect(() => {
    if (Array.isArray(Opponents)) {
      // Check if both are arrays
      const options = Opponents.map((opponent) => ({
        value: opponent.img,
        label: `${opponent.firstName} ${opponent.secondName}`,
      }));
      setOptions([...options]);
    }
    if (Array.isArray(LicenseOpponents)) {
      const additionalOption = LicenseOpponents.map((item) => ({
        value: item.img,
        label: `${item.firstName} ${item.secondName}`,
      }));

      setOptions([...additionalOption]);
    }

    // Concatenate the two arrays and update the state
  }, [Opponents, LicenseOpponents]);

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
    if (fabricRef.current?._objects && opponentsLogo) {
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
      {Opponents && <Select options={options} onChange={setOpponent} />}
    </>
  );
};

export default OpponentSelect;

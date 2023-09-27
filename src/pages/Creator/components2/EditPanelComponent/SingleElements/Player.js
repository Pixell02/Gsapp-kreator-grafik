import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { LanguageContext } from "../../../../../context/LanguageContext";
import useTeamLicenseCollection from "../../../../../hooks/useTeamLicenseCollection";
import translate from "../../../locales/translate.json";
import playerImage from "./playerOption/playerImage";
import playerName from "./playerOption/playerName";

export default function Player({
  fabricRef,
  coords,
  themeOption,
  posterBackground,
  Players,
}) {
  const { documents: LicensedPlayers } = useTeamLicenseCollection("Players");
  const [playerOptions, setPlayerOption] = useState([]);
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
  const [imageRef, setImageRef] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [playerImg, setPlayerImage] = useState("");
  const { language } = useContext(LanguageContext);

  const handleActive = (item) => {
    fabricRef.current.setActiveObject(item);
    setIsActive(true);
    fabricRef.current.renderAll();
  };
  const handleDiscard = () => {
    fabricRef.current.discardActiveObject();
    setIsActive(false);
    fabricRef.current.renderAll();
  };

  useEffect(() => {
    if (Players) {
      const options = Players.map((player) => ({
        label: player.number + "." + player.firstName + "." + player.secondName,
        value: player.img + " " + player.firstName + " " + player.secondName,
      }));
      setPlayerOption([...options]);
    }
    if (LicensedPlayers) {
      const options = LicensedPlayers?.map((item) => ({
        label: item.number + "." + item.firstName + "." + item.secondName,
        value: item.img + " " + item.firstName + " " + item.secondName,
      }));
      setPlayerOption([...options]);
    }
  }, [Players, LicensedPlayers]);

  useEffect(() => {
    if (
      fabricRef.current?._objects &&
      selectedPlayerName !== "" &&
      coords.player
    ) {
      playerName(
        fabricRef,
        selectedPlayerName,
        coords,
        themeOption,
        posterBackground
      );
    }
    if (fabricRef.current?._objects && playerImg !== "" && coords.playerImage) {
      playerImage(fabricRef, playerImg, coords.playerImage, setImageRef);
    } else {
      setPlayerImage(null);
      setImageRef(null);
    }
  }, [
    fabricRef.current,
    themeOption,
    posterBackground,
    selectedPlayerName,
    playerImg,
  ]);

  const handleSelectPlayer = async (option) => {
    setSelectedPlayerName(option.label);
    await fetch(`${option.value.split(" ")[0]}`)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setPlayerImage(reader.result);
        };
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {playerOptions && (
        <>
          <label>{translate.player[language]}</label>
          <Select options={playerOptions} onChange={handleSelectPlayer} />
          {playerImg && !isActive && (
            <button onClick={() => handleActive(imageRef)} className="mt-2 btn">
              Wybierz
            </button>
          )}
          {playerImg && isActive && (
            <button
              onClick={() => handleDiscard(imageRef)}
              className="mt-2 btn"
            >
              Ustaw
            </button>
          )}
        </>
      )}
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { LanguageContext } from "../../../../../context/LanguageContext";
import useFetch from "../../../../../hooks/useFetch";
import useCanvasPropertiesContext from "../../../hooks/useCanvasPropertiesContext";
import usePlayers from "../../../hooks/usePlayers";
import translate from "../../../locales/translate.json";
import playerImage from "./playerOption/playerImage";
import playerName from "./playerOption/playerName";

export default function Player({ fabricRef, coords, themeOption, posterBackground, Players }) {
  const playerOptions = usePlayers(Players);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState("");
  const { height } = useCanvasPropertiesContext();
  const { image: playerImg } = useFetch(selectedPlayer?.img);
  const [imageRef, setImageRef] = useState(null);
  const [isActive, setIsActive] = useState(false);
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
    if (fabricRef.current?._objects && selectedPlayerName !== "" && coords.player) {
      playerName(fabricRef, selectedPlayerName, coords, themeOption, posterBackground);
    }
    if (fabricRef.current?._objects && playerImg !== "" && coords.playerImage) {
      playerImage(fabricRef, playerImg, coords.playerImage, setImageRef, height);
    } else {
      setImageRef(null);
    }
  }, [fabricRef.current, themeOption, posterBackground, selectedPlayerName, playerImg]);

  const handleSelectPlayer = async (option) => {
    setSelectedPlayer(option.value);
    setSelectedPlayerName(option.label);
  };
  return (
    <>
      {playerOptions && (
        <>
          <label>{translate.player[language]}</label>
          <Select options={playerOptions} onChange={handleSelectPlayer} />
          {coords.playerImage && playerImg && !isActive && (
            <button onClick={() => handleActive(imageRef)} className="mt-2 btn">
              Wybierz
            </button>
          )}
          {coords.playerImage && playerImg && isActive && (
            <button onClick={() => handleDiscard(imageRef)} className="mt-2 btn">
              Ustaw
            </button>
          )}
        </>
      )}
    </>
  );
}

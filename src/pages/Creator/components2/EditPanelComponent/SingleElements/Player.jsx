import { useState } from "react";
import Select from "react-select";
import usePlayers from "../../../hooks/usePlayers";
import translate from "../../../locales/translate.json";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import usePlayerFabricObject from "../../../hooks/usePlayerFabricObject";

export default function Player({ fabricRef, playersName, playersImage, i }) {
  const playerOptions = usePlayers(playersImage);
  const { setSelectedPlayer, imageObject } = usePlayerFabricObject(playersName, playersImage, i, fabricRef);

  const [isActive, setIsActive] = useState(false);
  const { language } = useLanguageContext();
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

  const handleSelectPlayer = (option) => {
    setSelectedPlayer(option.value);
  };
  return (
    <>
      {playerOptions && (
        <>
          <label>{translate.player[language]}</label>
          <Select options={playerOptions} onChange={handleSelectPlayer} />
          {playersImage && imageObject && !isActive && (
            <button onClick={() => handleActive(imageObject)} className="mt-2 btn">
              Wybierz
            </button>
          )}
          {playersImage && imageObject && isActive && (
            <button onClick={() => handleDiscard(imageObject)} className="mt-2 btn">
              Ustaw
            </button>
          )}
        </>
      )}
    </>
  );
}

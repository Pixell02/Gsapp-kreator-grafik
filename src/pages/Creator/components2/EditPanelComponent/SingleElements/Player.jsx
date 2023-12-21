import { useEffect, useState } from 'react';
import Select from 'react-select';
import useFetch from '../../../../../hooks/useFetch';
import useCanvasPropertiesContext from '../../../hooks/useCanvasPropertiesContext';
import usePlayers from '../../../hooks/usePlayers';
import translate from '../../../locales/translate.json';
import playerImage from './playerOption/playerImage';
import playerName from './playerOption/playerName';
import useThemeContext from '../../../hooks/useThemeContext';
import { useLanguageContext } from '../../../../../context/LanguageContext';

export default function Player({ fabricRef, playersArray, playersImageArray, posterBackground, Players, i }) {
  const playerOptions = usePlayers(Players);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState('');
  const { themeColor } = useThemeContext();
  const { height } = useCanvasPropertiesContext();
  const { image: playerImg } = useFetch(selectedPlayer?.img);
  const [imageRef, setImageRef] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { language } = useLanguageContext();
  const handleActive = item => {
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
    if (fabricRef.current?._objects && selectedPlayerName !== '' && playersArray[i]) {
      playerName(fabricRef, selectedPlayerName, playersArray[i], themeColor, i);
    }
    if (fabricRef.current?._objects && playerImg !== '' && playersImageArray[i]) {
      playerImage(fabricRef, playerImg, playersImageArray[i], setImageRef, height, i);
    } else {
      setImageRef(null);
    }
  }, [
    fabricRef,
    themeColor,
    posterBackground,
    selectedPlayerName,
    playerImg,
    playersImageArray,
    playersArray,
    i,
    height,
  ]);

  const handleSelectPlayer = async option => {
    setSelectedPlayer(option.value);
    setSelectedPlayerName(option.label);
  };
  return (
    <>
      {playerOptions && (
        <>
          <label>{translate.player[language]}</label>
          <Select
            options={playerOptions}
            onChange={handleSelectPlayer}
          />
          {playersImageArray[i] && playerImg && !isActive && (
            <button
              onClick={() => handleActive(imageRef)}
              className="mt-2 btn">
              Wybierz
            </button>
          )}
          {playersImageArray[i] && playerImg && isActive && (
            <button
              onClick={() => handleDiscard(imageRef)}
              className="mt-2 btn">
              Ustaw
            </button>
          )}
        </>
      )}
    </>
  );
}

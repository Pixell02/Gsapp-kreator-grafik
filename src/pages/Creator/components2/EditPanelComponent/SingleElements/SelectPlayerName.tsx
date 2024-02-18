import Select from "react-select";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { Text } from "../../../../../types/globalPropertiesTypes";
import { translationProps } from "../../../../../types/translationTypes";
import usePlayers from "../../../hooks/usePlayers";
import translation from "../../../locales/translate.json";
import useTextLayer from "./hooks/useTextLayer";
import { Player } from "../../../../../types/teamTypes";
type props = {
  playerFirstName?: Text;
  playerLastName?: Text;
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
};

type Option = {
  label: string;
  value: Player;
};

const SelectPlayerName = ({ playerFirstName, playerLastName, fabricRef }: props) => {
  const translate: translationProps = translation;
  const { language } = useLanguageContext();
  const playerOption = usePlayers();
  const { setTextValue: setFirstName } = useTextLayer(playerFirstName as Text, fabricRef);
  const { setTextValue: setLastName } = useTextLayer(playerLastName as Text, fabricRef);
  const handleValueChange = (option: Option | null) => {
    if (!option) return;
    const { firstName, secondName } = option.value;
    setFirstName(firstName);
    setLastName(secondName);
  };

  return (
    <>
      <label>{translate.player[language]}</label>
      <Select options={playerOption} onChange={handleValueChange} />
    </>
  );
};

export default SelectPlayerName;

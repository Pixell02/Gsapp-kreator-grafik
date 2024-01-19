import React, { useEffect, useState } from "react";
import Select from "react-select";
import useOpponents from "../../../hooks/useOpponents";
import translation from "../../../locales/translate.json";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import useOpponentFabricObject from "../../../hooks/useOpponentFabricObject";
import { DocumentData } from "firebase/firestore";
import { props } from "../../../../../types/translationTypes";
import { useCalendarContext } from "../../../context/CalendarContext";

type componentProps = {
  coords: DocumentData;
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
};

type translationProps = {
  Opponents: props;
};

const OpponentSelect = ({ coords, fabricRef }: componentProps) => {
  const options = useOpponents();
  const { selectedTeam, selectedOption, handleChange, setSelectedTeam } = useOpponentFabricObject(coords, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const translate: translationProps = translation;
  const { language } = useLanguageContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    if (calendarData?.selectedOpponent) {
      setSelectedTeam(calendarData.selectedOpponent);
      setIsLoaded(true);
    }
  }, [calendarData]);

  useEffect(() => {
    if (!selectedTeam) return;
    setCalendarData({ ...calendarData, selectedOpponent: selectedTeam });
  }, [selectedTeam]);

  return (
    <>
      <label>{translate.Opponents[language]}</label>
      {options && <Select options={options} value={selectedOption} onChange={handleChange} />}
    </>
  );
};

export default OpponentSelect;

import React, { useEffect } from "react";
import Select from "react-select";
import translation from "../../../locales/translate.json";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import useTeamOption from "../../../hooks/useTeamOption";
import useTeamFabricObject from "../../../hooks/useTeamFabricObject";
import { props } from "../../../../../types/translationTypes";
import { DocumentData } from "firebase/firestore";
import { useCalendarContext } from "../../../context/CalendarContext";

type translationProps = {
  yourTeam: props;
};

type componentProps = {
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  coords: DocumentData;
};

export default function TeamOption({ fabricRef, coords }: componentProps) {
  const { language } = useLanguageContext();
  const teamOption = useTeamOption();
  const { calendarData, setCalendarData } = useCalendarContext();
  const { selectedTeam, handleChange } = useTeamFabricObject(coords, fabricRef);
  const translate: translationProps = translation;
  useEffect(() => {
    if (!calendarData?.selectedTeam && teamOption && teamOption.length === 1) {
      handleChange(teamOption[0]);
    }
  }, [teamOption]);

  useEffect(() => {
    if (!selectedTeam) return;
    setCalendarData({ ...calendarData, selectedTeam: selectedTeam });
  }, [selectedTeam]);

  return (
    <div>
      {teamOption?.length > 1 && (
        <>
          <label>{translate.yourTeam[language]}</label>
          <Select options={teamOption} onChange={handleChange} />
        </>
      )}
    </div>
  );
}

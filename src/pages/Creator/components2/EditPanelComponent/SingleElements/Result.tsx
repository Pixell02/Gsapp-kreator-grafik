import useTextLayer from "./hooks/useTextLayer";
import { fabric } from "fabric";
import translation from "../../../locales/translate.json";
import { props } from "../../../../../types/translationTypes";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../context/CalendarContext";

type translationProps = {
  hostResult: props;
  opponentResult: props;
};

type componentProps = {
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  coords: DocumentData;
};

export default function Result({ fabricRef, coords }: componentProps) {
  const { setTextValue: setHostResult, textValue: hostResult } = useTextLayer(coords.yourTeamResult, fabricRef);
  const { setTextValue: setGuestResult, textValue: guestResult } = useTextLayer(coords.yourOpponentResult, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const [isHostLoaded, setIsHostLoaded] = useState(false);
  const [isGuestLoaded, setIsGuestLoaded] = useState(false);

  useEffect(() => {
    if (!hostResult) return;
    setCalendarData({ ...calendarData, yourResult: hostResult });
    setIsHostLoaded(true);
  }, [hostResult]);

  useEffect(() => {
    if (!guestResult) return;
    setCalendarData({ ...calendarData, opponentResult: guestResult });
    setIsGuestLoaded(true);
  }, [guestResult]);

  useEffect(() => {
    if (!isHostLoaded && calendarData?.yourResult) {
      setHostResult(calendarData.yourResult);
    }
    if (!isGuestLoaded && calendarData?.opponentResult) {
      setGuestResult(calendarData.opponentResult);
    }
  }, [calendarData]);

  return (
    <div className="d-flex w-100 align-items-center">
      <div className="w-100">
        <label>{translate.hostResult[language]}</label>
        <input
          type="number"
          onChange={(e) => setHostResult(e.target.value)}
          value={hostResult}
          style={{ textAlign: "center" }}
          min="0"
          max="99"
        />
      </div>
      -
      <div className="w-100">
        <label>{translate.opponentResult[language]}</label>
        <input
          type="number"
          onChange={(e) => setGuestResult(e.target.value)}
          value={guestResult}
          style={{ textAlign: "center" }}
          min="0"
          max="99"
        />
      </div>
    </div>
  );
}

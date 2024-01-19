import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../../../context/CalendarContext";
import useMultiplyTextLayer from "./hooks/useMultiplyTextLayer";

const UniversalNumberLayer = ({ fabricRef, coords, properties, i }) => {
  const { setTextValue, textValue } = useMultiplyTextLayer(coords, i, properties, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    if (calendarData?.NumberOne && calendarData.NumberOne[i - 1] && calendarData.NumberOne[i - 1][coords.className]) {
      setTextValue(calendarData.NumberOne[i - 1][coords.className]);
      setIsLoaded(true);
    }
  }, [calendarData]);

  useEffect(() => {
    if (!calendarData?.NumberOne) return setCalendarData({ ...calendarData, NumberOne: [] });
    const textArray = [...calendarData.NumberOne];
    if (!textArray[i]) return;
    textArray[i][coords.className] = textValue;
    setCalendarData({ ...calendarData, NumberOne: textArray });
  }, [textValue]);

  return (
    <div className="d-flex w-100 flex-column">
      <span>{coords.className}</span>
      <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
    </div>
  );
};

export default UniversalNumberLayer;

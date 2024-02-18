import { SetStateAction, useEffect, useState } from "react";
import useMultiplyTextLayer from "./hooks/useMultiplyTextLayer";
import { useCalendarContext } from "../../../../../context/CalendarContext";
import { Text } from "../../../../../../../types/globalPropertiesTypes";

type props = {
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  coords: Text;
  properties: {
    Margin: number;
    orientation: string;
  };
  i: number;
};

const UniversalTextLayer = ({ fabricRef, coords, properties, i }: props) => {
  const { setTextValue, textValue } = useMultiplyTextLayer(coords, i, properties, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    if (calendarData?.TextOne && calendarData.TextOne[i - 1] && calendarData.TextOne[i - 1][coords.className]) {
      setTextValue(calendarData.TextOne[i - 1][coords.className] as SetStateAction<string>);
      setIsLoaded(true);
    }
  }, [calendarData]);

  useEffect(() => {
    if (!calendarData?.TextOne) return setCalendarData({ ...calendarData, TextOne: [] });
    const textArray = [...calendarData.TextOne];
    if (!textArray[i]) return;
    textArray[i][coords.className] = textValue;
    setCalendarData({ ...calendarData, TextOne: textArray });
  }, [textValue]);

  return (
    <div className="d-flex w-100 flex-column">
      <span>{coords.className}</span>
      <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
    </div>
  );
};

export default UniversalTextLayer;

import React, { useEffect, useState } from "react";
import useTextLayer, { textCoordsProps } from "./hooks/useTextLayer";
import { useCalendarContext } from "../../../context/CalendarContext";

type props = {
  coords: textCoordsProps;
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  i: number;
};

const TextInput = ({ coords, i, fabricRef }: props) => {
  const { textValue, setTextValue } = useTextLayer(coords, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (isLoaded || !calendarData?.Text) return;
    if (calendarData.Text[i]) {
      setTextValue(calendarData.Text[i].value as string);
      setIsLoaded(true);
    }
  }, [calendarData]);

  useEffect(() => {
    if (textValue === "") return;
    if (!calendarData?.Text)
      return setCalendarData({ ...calendarData, Text: [{ className: coords.className, value: textValue }] });
    const newArray = [...calendarData.Text];
    if (!newArray[i]) {
      newArray[i] = { className: coords.className, value: textValue };
    } else {
      newArray[i].className = coords.className;
      newArray[i].value = textValue;
    }
    setCalendarData({ ...calendarData, Text: newArray });
  }, [textValue]);

  return (
    <div>
      <label>{coords.className}</label>
      <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
    </div>
  );
};

export default TextInput;

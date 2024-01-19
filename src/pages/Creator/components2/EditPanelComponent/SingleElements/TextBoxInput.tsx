import React, { useEffect, useState } from "react";
import { useCalendarContext } from "../../../context/CalendarContext";
import { textCoordsProps } from "./hooks/useTextLayer";
import useTextboxLayer from "../../../hooks/useTextboxLayer";

type componentProps = {
  coords: textCoordsProps;
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  i: number;
};

const TextBoxInput = ({ coords, i, fabricRef }: componentProps) => {
  const { textValue, setTextValue } = useTextboxLayer(coords, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded || !calendarData?.Textbox) return;
    if (calendarData?.Textbox[i]) {
      setTextValue(calendarData?.Textbox[i]?.value);
      setIsLoaded(true);
    }
  }, [calendarData]);

  useEffect(() => {
    if (textValue === "") return;
    if (!calendarData?.Textbox) return setCalendarData({ ...calendarData, Textbox: [] });
    const newArray = [...calendarData.Textbox];
    newArray[i].className = coords.className;
    newArray[i].value = textValue;
    setCalendarData({ ...calendarData, Textbox: newArray });
  }, [textValue]);
  return (
    <div>
      <label>{coords.className}</label>
      <textarea value={textValue || ""} onChange={(e) => setTextValue(e.target.value)} />
    </div>
  );
};

export default TextBoxInput;

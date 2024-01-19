import translate from "../../../locales/translate.json";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { useRadioContext } from "../../../context/radioContext";
import { useCalendarContext } from "../../../context/CalendarContext";
import { useEffect, useState } from "react";

export default function Radio() {
  const { radioChecked, setRadioChecked } = useRadioContext();
  const { calendarData, setCalendarData } = useCalendarContext();
  const { language } = useLanguageContext();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (isLoaded) return;
    if (calendarData?.radioChecked) {
      setRadioChecked(calendarData.radioChecked);
      setIsLoaded(true);
    }
  }, [calendarData]);

  useEffect(() => {
    setCalendarData({ ...calendarData, radioChecked: radioChecked });
  }, [radioChecked]);

  return (
    <div className="option-container">
      <div className="input-container">
        <label className="label-container">
          <input
            type="radio"
            value="radio1"
            onChange={(e) => setRadioChecked(e.target.value)}
            checked={radioChecked === "radio1"}
          />
          <span>{translate.host[language]}</span>
        </label>
      </div>
      <div className="input-container">
        <label>
          <input
            type="radio"
            value="radio2"
            onChange={(e) => setRadioChecked(e.target.value)}
            checked={radioChecked === "radio2"}
          />
          <span className="guest">{translate.guest[language]}</span>
        </label>
      </div>
    </div>
  );
}

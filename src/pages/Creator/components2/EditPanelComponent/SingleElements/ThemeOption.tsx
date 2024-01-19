import Select, { SingleValue } from "react-select";
import translation from "../../../locales/translate.json";
import { useLanguageContext } from "../../../../../context/LanguageContext";
import { props } from "../../../../../types/translationTypes";
import { options, useThemeContext } from "../../../context/ThemeContext";
import { useCalendarContext } from "../../../context/CalendarContext";
import { useEffect } from "react";
import { DocumentData } from "firebase/firestore";

type translationProps = {
  themes: props;
};

type componentProps = {
  setSelectedPoster: (value: DocumentData | null) => void;
};

export default function ThemeOption({ setSelectedPoster }: componentProps) {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const { themeColor, setThemeColor, themeOptions } = useThemeContext();
  const { calendarData, setCalendarData } = useCalendarContext();
  const handleValueChange = (option: SingleValue<options>) => {
    setThemeColor(option as options);
  };
  useEffect(() => {
    if (!themeColor) return;
    setCalendarData({ ...calendarData, selectedTheme: themeColor?.label });
    setSelectedPoster((prev: DocumentData) => ({
      ...prev,
      color: themeColor?.label,
      src: themeColor?.value.src,
    }));
  }, [themeColor]);

  return (
    <>
      {themeOptions && themeOptions.length > 1 && (
        <>
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {translate.themes[language]}
          </label>

          <Select value={themeColor} options={themeOptions} onChange={handleValueChange} className="select-option" />
        </>
      )}
    </>
  );
}

import React, { useContext } from "react";
import Select from "react-select";
import translate from "../../../locales/translate.json";
import { LanguageContext } from "../../../../../context/LanguageContext";
import useThemeContext from "../../../hooks/useThemeContext";

export default function ThemeOption({ themeOptions }) {
  const { language } = useContext(LanguageContext);
  const { themeColor, setThemeColor } = useThemeContext();
  return (
    <>
      {themeOptions.length > 1 && (
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

          <Select
            value={themeColor}
            options={themeOptions}
            onChange={(option) => setThemeColor(option)}
            className="select-option"
          />
        </>
      )}
    </>
  );
}

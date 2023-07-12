import React, { useContext } from "react";
import Select from "react-select";
import translate from "../../../locales/translate.json";
import { LanguageContext } from "../../../../../context/LanguageContext";

export default function ThemeOption({ themeOptions, themeOption, setSelectThemes }) {
  const { language } = useContext(LanguageContext);
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
            value={themeOption}
            options={themeOptions}
            onChange={(option) => setSelectThemes(option)}
            className="select-option"
          />
        </>
      )}
    </>
  );
}

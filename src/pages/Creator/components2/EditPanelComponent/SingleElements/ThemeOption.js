
import React from "react";
import Select from "react-select";


export default function ThemeOption({ themeOptions, themeOption, setSelectThemes }) {
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
        Motywy
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

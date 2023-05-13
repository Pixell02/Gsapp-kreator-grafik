import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { db } from "../../../../firebase/config";

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

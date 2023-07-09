import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeDate from "./typeDate/typeDate"

export default function TypeData({ fabricRef, coords, themeOption, posterBackground }) {
  const [Date, setTypeDate] = useState("");

  useEffect(() => {
    if (fabricRef.current?.backgroundImage && Date !== "") {
        typeDate(fabricRef, Date, coords, themeOption, posterBackground)
    }
  },[fabricRef.current,Date, posterBackground])

  return (
    <>
      <label>Data i godzina</label>
      <input type="text" onChange={e => setTypeDate(e.target.value)} value={Date} className="date-type" />
    </>
  );
};



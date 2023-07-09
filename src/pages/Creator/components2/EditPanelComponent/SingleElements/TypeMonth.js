import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeMonth from "./typeDate/typeMonth";


export default function TypeMonth({ fabricRef, coords, themeOption, posterBackground }) {
  const [month, setMonth] = useState("");
  

  useEffect(() => {
    if (fabricRef.current && month !== "")
      typeMonth(fabricRef, month, themeOption, coords)
  },[fabricRef.current, themeOption, posterBackground, month]);

  return (
    <div>
      {coords && coords.typeMonth && (
        <>
          <label>Miesiąc</label>
          <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
        </>
      )}
    </div>
  );
}

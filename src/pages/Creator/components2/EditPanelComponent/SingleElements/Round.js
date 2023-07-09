import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeKolejka from "./typeDate/typeKolejka";

export default function Round({ fabricRef, coords, themeOption, posterBackground }) {
  
  const [typeRound, setTypeRound] = useState("")

  useEffect(() => {
    if (fabricRef.current?.backgroundImage && typeRound !== "") {
        typeKolejka(fabricRef, typeRound, coords, themeOption)
     }

  },[fabricRef.current, typeRound, posterBackground])

  return (
    <>
      <label>Kolejka</label>
      <input type="text" value={typeRound} onChange={e => setTypeRound(e.target.value)} />
    </>
  );
}

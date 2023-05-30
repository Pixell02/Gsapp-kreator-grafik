import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeLeague from "./typeDate/typeLeague";

export default function League({ fabricRef, coords, themeOption, posterBackground }) {
  const [league, setLeague] = useState("");

  useEffect(() => {
    if (fabricRef.current && league !== "") {
      typeLeague(fabricRef, league, themeOption, coords)
    }
  },[fabricRef.current, league, themeOption, posterBackground]);

  return (
    <>
      <label>Klasa / Liga</label>
      <input type="text" value={league} onChange={e => setLeague(e.target.value)} />
    </>
  );
}

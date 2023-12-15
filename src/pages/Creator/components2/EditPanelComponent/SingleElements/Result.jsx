import React, { useEffect, useState } from "react";
import yourResult from "./result/yourResult";
import opponentResult from "./result/opponentResult";
import { useContext } from "react";
import radioContext from "../../../context/radioContext";
import useThemeContext from "../../../hooks/useThemeContext";

export default function Result({ fabricRef, coords, posterBackground}) {
  const [yourTeamResult, setYourTeamResult] = useState("");
  const [yourOpponentResult, setYourOpponentResult] = useState("");
  const { themeColor } = useThemeContext();
  const { radioChecked } = useContext(radioContext);
  useEffect(() => {
    if(fabricRef.current?._objects && yourTeamResult !== "")
    yourResult(fabricRef, yourTeamResult, coords, themeColor, radioChecked)
  }, [fabricRef, coords, yourTeamResult, posterBackground, themeColor, radioChecked])
  
  useEffect(() => {
    if (fabricRef.current?._objects && yourOpponentResult !== "")
      opponentResult(fabricRef, yourOpponentResult, coords, themeColor, radioChecked)
  },[fabricRef, coords, yourOpponentResult, posterBackground, themeColor, radioChecked])

  return (
    <>
      <input
        type="number"
        onChange={(e) => setYourTeamResult(e.target.value)}
        value={yourTeamResult}
        style={{ width: "50px", textAlign: "center" }}
        min="0"
        max="99"
      />
      -
      <input
        type="number"
        onChange={(e) => setYourOpponentResult(e.target.value)}
        value={yourOpponentResult}
        style={{ width: "50px", textAlign: "center" }}
        min="0"
        max="99"
      />
      <br />
    </>
  );
}

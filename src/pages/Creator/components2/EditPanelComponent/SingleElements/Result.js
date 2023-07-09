import React, { useEffect, useState } from "react";
import yourResult from "./result/yourResult";
import opponentResult from "./result/opponentResult";
import { useContext } from "react";
import radioContext from "../../../context/radioContext";

export default function Result({ fabricRef, coords, posterBackground, themeOption}) {
  const [yourTeamResult, setYourTeamResult] = useState("");
  const [yourOpponentResult, setYourOpponentResult] = useState("");
  const { radioChecked } = useContext(radioContext);
  
  useEffect(() => {
    if(fabricRef && yourTeamResult !== "")
    yourResult(fabricRef, yourTeamResult, coords, themeOption, radioChecked)
  }, [fabricRef.current, yourTeamResult, posterBackground, themeOption, radioChecked])
  
  useEffect(() => {
    if (fabricRef && yourOpponentResult !== "")
      opponentResult(fabricRef, yourOpponentResult, coords, themeOption, radioChecked)
  },[fabricRef.current, yourOpponentResult, posterBackground, themeOption, radioChecked])

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

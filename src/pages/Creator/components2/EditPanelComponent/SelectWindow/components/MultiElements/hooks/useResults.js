import { useEffect, useState } from "react";
import useMultiplyTextLayer from "./useMultiplyTextLayer";
import useProperties from "./useProperties";

const useResults = (coords, i, fabricRef) => {
  const { properties } = useProperties(coords);
  console.log(coords);
  const [hostResult, setHostResult] = useState("");
  const [guestResult, setGuestResult] = useState("");
  const { setTextValue: setHostResultOne } = useMultiplyTextLayer(coords.yourTeamResultOne, i, properties, fabricRef);
  const { setTextValue: setOpponentResult } = useMultiplyTextLayer(
    coords.opponentTeamResultOne,
    i,
    properties,
    fabricRef
  );
  const { setTextValue: setConnectedResult } = useMultiplyTextLayer(
    coords.connectedResultsOne,
    i,
    properties,
    fabricRef
  );
  useEffect(() => {
    if (coords.connectedResultsOne) {
      setConnectedResult(
        (hostResult || "") +
          " " +
          (hostResult !== "" ? coords.connectedResultsOne.Formatter || ":" : "") +
          " " +
          (guestResult || "")
      );
    }
    if (coords.yourTeamResultOne && hostResult) {
      setHostResultOne(hostResult);
    }
    if (coords.opponentTeamResultOne && guestResult) {
      setOpponentResult(guestResult);
    }
  }, [hostResult, guestResult]);

  return { hostResult, setHostResult, guestResult, setGuestResult };
};

export default useResults;

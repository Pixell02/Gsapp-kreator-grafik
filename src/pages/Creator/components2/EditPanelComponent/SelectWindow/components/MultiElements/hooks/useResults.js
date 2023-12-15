import { useEffect, useState } from "react";
import useAddMultiplyImageAndText from "./useAddMultiplyImageAndText";
import useProperties from "./useProperties";

const useResults = (fabricRef, coords, selectedMatch) => {
  const { properties } = useProperties(coords);
  const [hostResult, setHostResult] = useState("");
  const [guestResult, setGuestResult] = useState("");
  const { handleAddText } = useAddMultiplyImageAndText(
    fabricRef,
    selectedMatch,
    properties
  );

  useEffect(() => {
    if (coords.connectedResultsOne && (hostResult || guestResult))
      handleAddText(
        coords.connectedResultsOne,
        (hostResult || "") +
          " " +
          (coords.connectedResultsOne.Formatter || ":") +
          " " +
          (guestResult || ""),
        properties
      );
    if (coords.yourTeamResultOne && hostResult)
      handleAddText(coords.yourTeamResultOne, hostResult, properties);
    if (coords.opponentTeamResultOne && guestResult)
      handleAddText(coords.opponentTeamResultOne, guestResult, properties);
  }, [hostResult, guestResult]);

  return { hostResult, setHostResult, guestResult, setGuestResult };
};

export default useResults;

import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../../../context/CalendarContext";
import useResults from "./hooks/useResults";
import { DocumentData } from "firebase/firestore";

type ResultProps = {
  fabricRef?: React.MutableRefObject<fabric.Canvas>;
  coords: DocumentData;
  i: number;
  selectedMatch: number;
};

const Results = ({ fabricRef, coords, selectedMatch, i }: ResultProps) => {
  const { hostResult, setHostResult, guestResult, setGuestResult } = useResults(coords, i, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isHostLoaded, setIsHostLoaded] = useState(false);
  const [isGuestLoaded, setIsGuestLoaded] = useState(false);
  useEffect(() => {
    if (!isHostLoaded) {
      if (calendarData?.hostResult && calendarData.hostResult[selectedMatch - 1]) {
        setHostResult(calendarData.hostResult[selectedMatch - 1]);
        setIsHostLoaded(true);
      }
    }
    if (!isGuestLoaded) {
      if (calendarData?.guestResult && calendarData?.guestResult[selectedMatch - 1]) {
        setGuestResult(calendarData.guestResult[selectedMatch - 1]);
        setIsGuestLoaded(true);
      }
    }
  }, [calendarData]);

  useEffect(() => {
    if (!calendarData?.guestResult) return setCalendarData({ ...calendarData, guestResult: [] });
    const newGuestResult = [...calendarData.guestResult];
    newGuestResult[i] = guestResult;
    setCalendarData({ ...calendarData, guestResult: newGuestResult });
  }, [guestResult]);

  useEffect(() => {
    if (!calendarData?.hostResult) return setCalendarData({ ...calendarData, hostResult: [] });
    const newHostResult = [...calendarData.hostResult];
    newHostResult[i] = hostResult;
    setCalendarData({ ...calendarData, hostResult: newHostResult });
  }, [hostResult]);

  return (
    <>
      {(coords.connectedResultsOne || coords.yourTeamResultOne || coords.opponentTeamResultOne) && (
        <div className="w-100 d-flex flex-row align-items-center">
          <input name="host" type="number" value={hostResult} onChange={(e) => setHostResult(e.target.value)} />
          <span>-</span>
          <input name="guest" type="number" value={guestResult} onChange={(e) => setGuestResult(e.target.value)} />
        </div>
      )}
    </>
  );
};

export default Results;

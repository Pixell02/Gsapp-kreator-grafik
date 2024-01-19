import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../../../context/CalendarContext";
import useSelectTeams from "./hooks/useSelectTeams";
import Select from "react-select";

const SelectLeagueTeams = ({ fabricRef, coords, i }) => {
  const { teamOption, setSelectedGuest, selectedGuest } = useSelectTeams(coords, i, fabricRef);
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (isLoaded) return;
    if (calendarData.selectedGuest && calendarData?.selectedGuest[i - 1]) {
      setSelectedGuest({ ...calendarData.selectedGuest[i - 1] });
      setIsLoaded(true);
    }
  }, [calendarData]);

  useEffect(() => {
    if (!selectedGuest) return;
    if (!calendarData?.selectedGuest && !calendarData?.selectedGuest)
      return setCalendarData({ ...calendarData, selectedGuest: [] });
    const guestArray = [...calendarData.selectedGuest];
    guestArray[i] = { ...selectedGuest };
    setCalendarData({ ...calendarData, selectedGuest: guestArray });
  }, [selectedGuest]);

  return (
    <div className="d-flex w-100 flex-column">
      <span>Drużyna</span>
      <Select options={teamOption} onChange={(option) => setSelectedGuest(option)} />
    </div>
  );
};

export default SelectLeagueTeams;

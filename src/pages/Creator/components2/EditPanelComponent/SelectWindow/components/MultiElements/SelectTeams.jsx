import Select from "react-select";
import useSelectTeams from "./hooks/useSelectTeams";
import { useCalendarContext } from "../../../../../context/CalendarContext";
import { useEffect, useState } from "react";

const SelectTeams = ({ fabricRef, coords, i }) => {
  const { teamOption, setSelectedHost, setSelectedGuest, selectedGuest, selectedHost } = useSelectTeams(
    coords,
    i,
    fabricRef
  );
  const { calendarData, setCalendarData } = useCalendarContext();
  const [isHostLoaded, setIsHostLoaded] = useState(false);
  const [isGuestLoaded, setIsGuestLoaded] = useState(false);
  useEffect(() => {
    if (!isHostLoaded) {
      if (calendarData?.selectedGuest && calendarData?.selectedGuest[i - 1]) {
        setSelectedGuest(calendarData.selectedGuest[i - 1]);
        setIsHostLoaded(true);
      }
    }
    if (!isGuestLoaded) {
      if (calendarData?.selectedHost && calendarData?.selectedHost[i - 1]) {
        setSelectedHost(calendarData.selectedHost[i - 1]);
        setIsGuestLoaded(true);
      }
    }
  }, [calendarData]);

  useEffect(() => {
    const guestArray = Array.isArray(calendarData?.selectedGuest) ? [...calendarData.selectedGuest] : [];
    guestArray[i - 1] = { ...selectedGuest };
    if (!guestArray[i - 1]) guestArray[i - 1] = {};
    setCalendarData({ ...calendarData, selectedGuest: guestArray });
  }, [selectedGuest]);

  useEffect(() => {
    const hostArray = Array.isArray(calendarData?.selectedHost) ? [...calendarData.selectedHost] : [];
    hostArray[i - 1] = { ...selectedHost };
    if (!hostArray[i - 1]) hostArray[i - 1] = {};
    setCalendarData({ ...calendarData, selectedHost: hostArray });
  }, [selectedHost]);

  return (
    <div className="d-flex w-100 flex-column">
      <div className="d-flex w-100 flex-column">
        <span>Gospodarz</span>
        <Select options={teamOption} onChange={(option) => setSelectedHost(option)} />
      </div>
      <div className="d-flex w-100 flex-column mt-2">
        <span>Gość</span>
        <Select options={teamOption} onChange={(option) => setSelectedGuest(option)} />
      </div>
    </div>
  );
};

export default SelectTeams;

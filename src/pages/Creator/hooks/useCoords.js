import { useParams } from "react-router-dom";
import { useDoc } from "../../../hooks/useDoc";
import { useCalendarContext } from "../context/CalendarContext";

const useCoords = () => {
  const { poster } = useParams();
  const { calendarPoster } = useCalendarContext();
  const { documents: coords } = useDoc("coords", ["uid", "==", calendarPoster?.uuid || poster]);

  return { coords };
};

export default useCoords;

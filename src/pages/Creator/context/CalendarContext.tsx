import { PropsWithChildren, createContext, useContext, useState, useEffect, SetStateAction, Dispatch } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router";
import { useDoc } from "../../../hooks/useDoc";
import { CalendarData } from "../../../types/globalPropertiesTypes";

type calendarDataProps = {
  calendarData: CalendarData | null;
  setCalendarData: Dispatch<SetStateAction<CalendarData | null>>;
  calendarPoster: DocumentData | null;
};

const CalendarContext = createContext<calendarDataProps | null>(null);

export const CalendarProvider = ({ children }: PropsWithChildren) => {
  const { poster } = useParams();
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const { documents: calendarPoster } = useDoc<CalendarData>("calendarPoster", ["coords", "==", poster || ""]);

  useEffect(() => {
    const handleGetDoc = async () => {
      if (!poster) return;
      const docRef = doc(db, "calendarCoords", poster);
      const docSnap = await getDoc(docRef);
      setCalendarData(docSnap.data() as CalendarData);
    };
    handleGetDoc();
  }, [poster]);

  return (
    <CalendarContext.Provider value={{ calendarData, setCalendarData, calendarPoster }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("context not avaible here!");
  }

  return context;
};

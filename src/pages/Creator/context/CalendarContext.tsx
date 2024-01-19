import { PropsWithChildren, createContext, useContext, useState, useEffect, SetStateAction, Dispatch } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router";
import { useDoc } from "../../../hooks/useDoc";

export type selectedTeam = {
  firstName: string;
  img: string;
  secondName: string;
  team: string;
  uid: string;
};

export type Opponent = {
  firstName: string;
  img: string;
  secondName: string;
  team: string;
  uid: string;
};

export type Player = {
  firstName: string;
  secondName: string;
  number?: string;
  team: string;
  age?: number;
  img: string;
};

type textProps = {
  [key: string]: string;
  className: string;
  value: string;
};

type CalendarData = {
  player?: Player[];
  hostResult?: string[];
  guestResult?: string[];
  yourResult?: string;
  opponentResult?: string;
  typePlace?: string;
  selectedGuest?: selectedTeam;
  Textbox?: textProps[];
  Text?: textProps[];
  TextOne?: textProps[];
  radioChecked?: string;
  selectedTheme?: string;
  selectedTeam?: selectedTeam;
  selectedOpponent?: Opponent;
  selectedPlacePreset?: string;
  selectedPlayers?: Player[];
  selectedReserve?: Player[];
  capitan?: Player;
  goalKeeper?: Player;
};

type calendarDataProps = {
  calendarData: CalendarData | null;
  setCalendarData: Dispatch<SetStateAction<CalendarData | null>>;
  calendarPoster: DocumentData | null;
};

const CalendarContext = createContext<calendarDataProps | null>(null);

export const CalendarProvider = ({ children }: PropsWithChildren) => {
  const { poster } = useParams();
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const { documents: calendarPoster } = useDoc("calendarPoster", ["coords", "==", poster || ""]);

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

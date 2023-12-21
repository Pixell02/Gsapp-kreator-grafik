import { PropsWithChildren, createContext, useContext, useState, useEffect } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router";

const CalendarContext = createContext<null | { graphicProperties: DocumentData | null }>(null);

export const CalendarContextProvider = ({ children }: PropsWithChildren) => {
  const { poster } = useParams();
  const [graphicProperties, setGraphicProperties] = useState<DocumentData | null>(null);

  useEffect(() => {
    const handleGetDoc = async () => {
      const docRef = doc(db, "calendarCoords", poster || "");
      const docSnap = await getDoc(docRef);
      setGraphicProperties(docSnap.data() as DocumentData);
    };
    if (!poster) return;
    handleGetDoc();
  }, [poster]);

  return <CalendarContext.Provider value={{ graphicProperties }}>{children}</CalendarContext.Provider>;
};

export const useCalendarCoords = () => {
  const coords = useContext(CalendarContext);

  if (!coords) {
    throw new Error("Coords not avaible here!");
  }

  return coords;
};

import { PropsWithChildren, createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useParams } from 'react-router';

const CalendarContext = createContext<null | { graphicProperties: any }>(null);

export const CalendarContextProvider = ({ children }: PropsWithChildren) => {
  const { poster } = useParams();
  // const [graphicData, setGraphicData] = useState({ coords: 'm5fzpaz7qpd' });
  // value[coords.className]
  // coords.[typePlace].className
  const [graphicProperties, setGraphicProperties] = useState(null);

  useEffect(() => {
    const handleGetDoc = async () => {
      const docRef = doc(db, 'calendarCoords', 'm5fzpaz7qpd');
      const docSnap = await getDoc(docRef);
      setGraphicProperties(docSnap.data());
    };
    if (!poster) return;
    handleGetDoc();
  }, [poster]);

  return <CalendarContext.Provider value={{ graphicProperties }}>{children}</CalendarContext.Provider>;
};

export const useCalendarCoords = () => {
  const coords = useContext(CalendarContext);

  if (!coords) {
    throw new Error('Coords not avaible here!');
  }

  return coords;
};


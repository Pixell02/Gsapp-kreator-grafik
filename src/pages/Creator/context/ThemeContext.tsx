import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import useThemeOption from "../hooks/useThemeOption";
import useFetch from "../../../hooks/useFetch";
import { useCalendarContext } from "./CalendarContext";

type value = {
  src: string;
  additionalLayer?: string;
};

export type options = {
  label: string;
  value: value;
};

type contextValue = {
  themeColor: options | null;
  setThemeColor: (value: options) => void;
  dataURL: string | ArrayBuffer | null;
  additionalLayer: string | ArrayBuffer | null;
  themeOptions: options[] | null;
  setId: (value: string) => void;
};
export const ThemeContext = createContext<contextValue | null>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeColor, setThemeColor] = useState<options | null>(null);
  const { calendarPoster } = useCalendarContext();
  const { poster } = useParams();
  const [id, setId] = useState<string>("");
  const themeOptions = useThemeOption(poster || id);
  const { image: dataURL } = useFetch(calendarPoster?.src || themeColor?.value?.src);
  const { image: additionalLayer } = useFetch(themeColor?.value?.additionalLayer);
  useEffect(() => {
    themeOptions && themeOptions.length > 0 && setThemeColor(themeOptions[0]);
  }, [themeOptions]);
  useEffect(() => {
    setThemeColor({
      label: calendarPoster?.color,
      value: { src: calendarPoster?.src },
    });
  }, [calendarPoster]);

  return (
    <ThemeContext.Provider value={{ themeColor, setId, setThemeColor, dataURL, additionalLayer, themeOptions }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};

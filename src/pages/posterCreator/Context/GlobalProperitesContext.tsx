import React, { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDoc } from "../../../hooks/useDoc";
import { v4 as uuidv4 } from "uuid";

export const GlobalPropertiesContext = createContext<context | null>(null);

type globalProperties = {
  uid: string;
};

type context = {
  globalProperties: globalProperties;
  setGlobalProperties: (value: globalProperties) => void;
};

export function GlobalPropertiesProvider({ children }: PropsWithChildren) {
  const [globalProperties, setGlobalProperties] = useState<globalProperties>({ uid: uuidv4().replace(/-/g, "") });
  const { id } = useParams();
  const { documents: coords } = useDoc("coords", ["uid", "==", id || ""]);

  useEffect(() => {
    if (!coords) return;
    setGlobalProperties(coords as globalProperties);
  }, [coords]);

  return (
    <GlobalPropertiesContext.Provider value={{ globalProperties, setGlobalProperties }}>
      {children}
    </GlobalPropertiesContext.Provider>
  );
}

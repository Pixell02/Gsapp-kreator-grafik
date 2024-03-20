import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

export type MultiProperties = {
  numberOfMatches: number;
  orientation: "horizontally" | "vertically";
  Margin: number;
  rollAfter: number;
  MarginAfterRoll: number;
};

type ContextData = {
  isMany: boolean;
  setIsMany: Dispatch<SetStateAction<boolean>>;
  properties: MultiProperties;
  setProperties: Dispatch<SetStateAction<MultiProperties>>;
};

const MultiPropertiesContext = createContext<ContextData | null>(null);

export const MultiPropertiesProvider = ({ children }: PropsWithChildren) => {
  const [isMany, setIsMany] = useState(false);
  const [properties, setProperties] = useState<MultiProperties>({
    numberOfMatches: 4,
    orientation: "horizontally",
    Margin: 100,
    rollAfter: 0,
    MarginAfterRoll: 0,
  });
  return (
    <MultiPropertiesContext.Provider value={{ isMany, setIsMany, properties, setProperties }}>
      {children}
    </MultiPropertiesContext.Provider>
  );
};
export const useMultiPropertiesContext = () => {
  const context = useContext(MultiPropertiesContext);
  if (!context) {
    throw Error("MultiPropertiesContext");
  }

  return context;
};

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

export type Resolution = {
  width: number;
  height: number;
};

type ContextData = {
  resolution: Resolution;
  setResolution: Dispatch<SetStateAction<Resolution>>;
};

export const CanvasPropertiesContext = createContext<ContextData | null>(null);

export const CanvasContextProvider = ({ children }: PropsWithChildren) => {
  const [resolution, setResolution] = useState({ width: 0, height: 0 });
  return (
    <CanvasPropertiesContext.Provider value={{ resolution, setResolution }}>
      {children}
    </CanvasPropertiesContext.Provider>
  );
};

export const useCanvasPropertiesContext = () => {
  const context = useContext(CanvasPropertiesContext);
  if (!context) {
    throw Error("canvasPropertiesContext '");
  }

  return context;
};

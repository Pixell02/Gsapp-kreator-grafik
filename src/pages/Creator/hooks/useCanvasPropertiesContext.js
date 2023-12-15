import { useContext } from "react";
import { CanvasPropertiesContext } from "../context/CanvasPropertiesContext";

const useCanvasPropertiesContext = () => {
  const context = useContext(CanvasPropertiesContext);
  if (!context) {
    throw Error("canvasPropertiesContext '");
  }

  return context;
};

export default useCanvasPropertiesContext;

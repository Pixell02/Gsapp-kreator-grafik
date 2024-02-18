import { useEffect } from "react";
import useCoords from "../useCoords";
import useGlobalPropertiesContext from "../useGlobalPropertiesContext";

const useSponsorProperties = (fabricRef) => {
  const propertyKeys = ["Top", "Left", "className", "Width", "Height", "type", "Fill"];

  const { coords, setCoords, handleInputChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();

  useEffect(() => {
    if (!coords) return;
    if (Object.keys(coords).length === 0) return;
    if (coords.type === "SponsorBlock") {
      setGlobalProperties((prevState) => {
        const updatedCoords = {
          SponsorBlock: coords,
        };
        return {
          ...prevState,
          ...updatedCoords,
        };
      });
    }
  }, [coords]);

  return { coords, handleInputChange, setCoords };
};

export default useSponsorProperties;

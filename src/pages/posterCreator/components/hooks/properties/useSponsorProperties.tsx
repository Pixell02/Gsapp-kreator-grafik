import { useEffect } from "react";
import useCoords from "../useCoords";
import { useGlobalPropertiesContext } from "../../../Context/GlobalProperitesContext";
import { FabricReference, SponsorBlock } from "../../../../../types/creatorComponentsTypes";

const useSponsorProperties = (fabricRef: FabricReference) => {
  const propertyKeys = ["Top", "Left", "className", "Width", "Height", "type", "Fill"];

  const { coords, setCoords, handleInputChange } = useCoords<SponsorBlock>(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();

  useEffect(() => {
    if (!coords) return;
    if (coords?.type === "SponsorBlock") {
      setGlobalProperties((prevState) => {
        const updatedCoords = {
          SponsorBlock: coords as SponsorBlock,
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

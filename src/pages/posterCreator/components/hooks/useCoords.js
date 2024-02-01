import { useEffect, useState } from "react";
import useHandleChangeEvents from "./useHandleChangeEvents";
import useHandleKeyPress from "./useHandleKeyPress";
import useFiltersArray from "./useFiltersArray";

const useCoords = (fabricRef, propertyKeys, type) => {
  const [coords, setCoords] = useState(null);
  const { updateActiveObjectCoords, handleInputChange, handleSelectChange } = useHandleChangeEvents(
    fabricRef,
    coords,
    setCoords
  );
  const { handleDeleteKeyPress } = useHandleKeyPress(fabricRef);
  const handleReadFilters = useFiltersArray();
  useEffect(() => {
    const handleObjectModified = () => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return setCoords(null);
      const newCoords = {
        Top: parseInt(activeObject.top?.toFixed(0)),
        Left: parseInt(activeObject.left?.toFixed(0)),
        text: activeObject.text,
        className: activeObject.className,
        Angle: parseInt(activeObject.angle?.toFixed(0)),
        Width: parseInt(activeObject.width * activeObject.scaleX),
        Height: parseInt(activeObject.height * activeObject.scaleY),
        ScaleToWidth: parseInt(activeObject.width * activeObject.scaleX),
        ScaleToHeight: parseInt(activeObject.height * activeObject.scaleY),
        FontSize: parseInt(activeObject.fontSize),
        FontFamily: activeObject.fontFamily,
        CharSpacing: parseInt(activeObject.charSpacing),
        Fill: activeObject.fill,
        OriginX: activeObject.originX,
        OriginY: activeObject.originY,
        type: activeObject.type,
        TextAlign: activeObject.textAlign,
        Format: activeObject.Format,
        FontStyle: activeObject.fontStyle,
        LineHeight: parseInt(activeObject.lineHeight),
        filters: activeObject.filters,
        Formatter: activeObject.Formatter,
      };

      const selectedProperties = {};
      propertyKeys.forEach((key) => {
        if (newCoords[key] !== undefined) {
          selectedProperties[key] = newCoords[key];
        }
      });

      if (selectedProperties.type === "FilteredImage") {
        if (selectedProperties.filters) {
          const coordsWithFilter = handleReadFilters(selectedProperties.filters);
          selectedProperties.filters = coordsWithFilter;
        }
      }
      setCoords(selectedProperties);
    };
    if (fabricRef.current?._objects) {
      fabricRef.current?.on("object:modified", handleObjectModified);
      fabricRef.current?.on("mouse:down", handleObjectModified);
      document.addEventListener("keydown", handleDeleteKeyPress);
      return () => {
        fabricRef.current?.off("object:modified", handleObjectModified);
        fabricRef.current?.off("mouse:down", handleObjectModified);
        document.removeEventListener("keydown", handleDeleteKeyPress);
      };
    }
  }, [handleDeleteKeyPress, fabricRef, propertyKeys, handleReadFilters, type]);

  return { coords, updateActiveObjectCoords, handleInputChange, handleSelectChange };
};

export default useCoords;

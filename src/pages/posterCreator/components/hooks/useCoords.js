import { useEffect, useState } from "react";
import useHandleChangeEvents from "./useHandleChangeEvents";
import useHandleKeyPress from "./useHandleKeyPress";

const useCoords = (fabricRef, propertyKeys) => {
  const [coords, setCoords] = useState({});
  const { updateActiveObjectCoords, handleInputChange, handleSelectChange } = useHandleChangeEvents(fabricRef, coords, setCoords);
  const { handleDeleteKeyPress } = useHandleKeyPress(fabricRef);
  useEffect(() => {
    const handleObjectModified = () => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return setCoords({});
      const newCoords = {
        Top: parseInt(activeObject.top),
        Left: parseInt(activeObject.left),
        className: activeObject.className,
        Angle: parseInt(activeObject.angle),
        Width: parseInt((activeObject.width * activeObject.scaleX).toFixed(0)),
        Height: parseInt((activeObject.height * activeObject.scaleY.toFixed(2)).toFixed(0)),
        ScaleToWidth: parseInt((activeObject.width * activeObject.scaleX.toFixed(2)).toFixed(0)),
        ScaleToHeight: parseInt((activeObject.height * activeObject.scaleY).toFixed(0)),
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
      setCoords(selectedProperties);
    };
    if (fabricRef?.current?._objects) {
      fabricRef.current?.on("object:modified", handleObjectModified);
      fabricRef.current?.on("mouse:down", handleObjectModified);
      document.addEventListener("keydown", handleDeleteKeyPress);
      return () => {
        fabricRef.current?.off("object:modified", handleObjectModified);
        fabricRef.current?.off("mouse:down", handleObjectModified);
        document.removeEventListener("keydown", handleDeleteKeyPress);
      };
    }
  }, [handleDeleteKeyPress, fabricRef, propertyKeys]);

  console.log(coords?.type)

  return { coords, updateActiveObjectCoords, handleInputChange, handleSelectChange };
};

export default useCoords;

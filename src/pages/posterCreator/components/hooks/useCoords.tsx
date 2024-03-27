import { ChangeEvent, useEffect, useState } from "react";
import useHandleChangeEvents from "./useHandleChangeEvents";
import useHandleKeyPress from "./useHandleKeyPress";
import useFiltersArray from "./useFiltersArray";
import { ActiveObjectCoords, FabricReference, Filters } from "../../../../types/creatorComponentsTypes";

const useCoords = (fabricRef: FabricReference, propertyKeys: string[]) => {
  const [coords, setCoords] = useState<ActiveObjectCoords | null>(null);
  const { updateActiveObjectCoords, handleInputChange, handleSelectChange } = useHandleChangeEvents(
    fabricRef,
    coords,
    setCoords
  );
  const { handleDeleteKeyPress } = useHandleKeyPress(fabricRef);
  const handleReadFilters = useFiltersArray();

  const handleWriteToLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    const { className, value } = e.target;

    setCoords((prev) => ({ ...prev, text: { ...prev?.text, [className]: value } } as ActiveObjectCoords));
  };

  useEffect(() => {
    const handleObjectModified = () => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const activeObject = canvas.getActiveObject();
      if (!activeObject) return setCoords(null);
      const newCoords: ActiveObjectCoords = {
        Top: Math.round(Number(activeObject.top)),
        Left: Math.round(Number(activeObject.left)),
        text: { pl: activeObject.text as string, en: "", es: "", de: "", fr: "" },
        className: activeObject.className,
        Angle: Math.round(Number(activeObject.angle)),
        Width: Math.round(Number(activeObject.width) * Number(activeObject.scaleX)),
        Height: Math.round(Number(activeObject.height) * Number(activeObject.scaleY)),
        ScaleToWidth: Math.round(Number(activeObject.width) * Number(activeObject.scaleX)),
        ScaleToHeight: Math.round(Number(activeObject.height) * Number(activeObject.scaleY)),
        FontSize: activeObject.fontSize,
        FontFamily: activeObject.fontFamily,
        CharSpacing: activeObject.charSpacing,
        Fill: activeObject.fill as string,
        OriginX: activeObject.originX as string,
        OriginY: activeObject.originY as string,
        type: activeObject.type,
        TextAlign: activeObject.textAlign,
        Format: activeObject.Format,
        FontStyle: activeObject.fontStyle,
        LineHeight: Number(activeObject.lineHeight),
        filters: activeObject.filters,
        Formatter: activeObject.Formatter,
      };

      const selectedProperties: ActiveObjectCoords = {};
      propertyKeys.forEach((key) => {
        if (newCoords[key] !== undefined) {
          selectedProperties[key] = newCoords[key];
        }
      });

      if (selectedProperties.type === "FilteredImage") {
        if (selectedProperties.filters) {
          const coordsWithFilter: Filters = handleReadFilters(selectedProperties.filters as Filters[]);
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
  }, [handleDeleteKeyPress, fabricRef, propertyKeys, handleReadFilters]);

  return { coords, setCoords, handleWriteToLanguage, updateActiveObjectCoords, handleInputChange, handleSelectChange };
};

export default useCoords;

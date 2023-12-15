import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import { useEffect, useState } from "react";
import findThemeOption from "../functions/themeOption";
import useThemeContext from "../../../../hooks/useThemeContext";

const useTextLayer = (fabricRef, coords, name) => {

  const [textValue, setTextValue] = useState("");
  const { themeColor } = useThemeContext();
  
  useEffect(() => {
    if (fabricRef.current && textValue) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === (name || coords.className)) {
          fabricRef.current.remove(fabricRef.current.item(i));
          fabricRef.current.renderAll();
        }
      });
      const font = new FontFaceObserver(coords.FontFamily);
      font.load().then(() => {
        const typeDate = new fabric.Text(textValue, {
          selectable: false,
          top: coords.Top,
          left: coords.Left,
          className: name || coords.className,
          fontSize: coords.FontSize,
          fill: coords.Fill,
          originX: coords.OriginX,
          originY: coords.OriginY,
          fontFamily: coords.FontFamily,
          angle: coords.Angle || 0,
          charSpacing: coords.CharSpacing ? coords.CharSpacing : 0,
          fontStyle: coords.FontStyle ? coords.FontStyle : "normal",
        });

        if (typeDate.width >= coords.ScaleToWidth) {
          typeDate.scaleToWidth(coords.ScaleToWidth);
          if (coords.Angle > 0) {
            typeDate.scaleToHeight(coords.ScaleToWidth);
          }
        }
        if (coords.themeOption && themeColor) {
          findThemeOption(coords, themeColor, typeDate);
        }
        fabricRef.current.add(typeDate);
        fabricRef.current.renderAll();
      });
    }
  }, [textValue, themeColor, fabricRef, name, coords]);

  return { textValue, setTextValue };
};

export default useTextLayer;

import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const useTextLayer = (fabricRef, coords) => {

  const [textValue, setTextValue] = useState(null);

  useEffect(() => {
    if (textValue && fabricRef.current) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === coords.className) {
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
          className: coords.className,
          fontSize: coords.FontSize,
          fill: coords.Fill,
          zIndex: 5,
          originX: coords.OriginX,
          originY: coords.OriginY,
          fontFamily: coords.FontFamily,
          angle: (coords.Angle || 0),
          charSpacing: coords.CharSpacing ? coords.CharSpacing : 0,
          fontStyle: coords.FontStyle ? coords.FontStyle : "normal",
        });
        
        if (typeDate.width >= coords.ScaleToWidth) {
          typeDate.scaleToWidth(coords.ScaleToWidth);
          if (coords.typeDate?.Angle > 0) {
            typeDate.scaleToHeight(coords.ScaleToWidth);
          }
        }
        
        fabricRef.current.add(typeDate);
        fabricRef.current.renderAll();
      });
    }
  },[textValue])
  
  return {textValue, setTextValue}
}

export default useTextLayer

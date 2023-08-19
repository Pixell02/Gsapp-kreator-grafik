import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const typeDate = (fabricRef, date, coords, themeOption, posterBackground) => {
  
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "typeDate") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });
  const font = new FontFaceObserver(coords.typeData.FontFamily);
  font.load().then(() => {
    const typeDate = new fabric.Text(date, {
      selectable: false,
      top: coords.typeData.Top,
      left: coords.typeData.Left,
      className: "typeDate",
      fontSize: coords.typeData.FontSize,
      fill: coords.typeData.Fill,
      zIndex: 3,
      originX: coords.typeData.OriginX,
      originY: coords.typeData.OriginY,
      fontFamily: coords.typeData.FontFamily,
      angle: (coords.typeData.Angle || 0),
      charSpacing: coords.typeData.CharSpacing ? coords.typeData.CharSpacing : 0,
      fontStyle: coords.typeData.FontStyle ? coords.typeData.FontStyle : "normal",
    });
    
    if (typeDate.width >= coords.typeData.ScaleToWidth) {
      typeDate.scaleToWidth(coords.typeData.ScaleToWidth);
      if (coords.typeDate?.Angle) {
        typeDate.scaleToHeight(coords.typeDate.ScaleToWidth);
      }
    }
    if (coords.typeData.themeOption) {
      findThemeOption(coords.typeData, themeOption, typeDate);
    }
    fabricRef.current.add(typeDate);
    fabricRef.current.renderAll();
  });
};

export default typeDate;

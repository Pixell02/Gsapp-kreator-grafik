import React from 'react'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from '../functions/themeOption';

const typeMonth = (fabricRef, month, themeOption, coords) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "month") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });
  const font = new FontFaceObserver(coords.typeMonth.FontFamily)
  font.load().then(() => {
    const monthText = new fabric.Text(month, {
      selectable: false,
      className: "month",
      top: coords.typeMonth.Top,
      left: coords.typeMonth.Left,
      charSpacing: coords.typeMonth.CharSpacing,
      fontFamily: coords.typeMonth.FontFamily,
      fontSize: coords.typeMonth.FontSize,
      width: coords.typeMonth.ScaleToWidth,
      fill: coords.typeMonth.Fill,
      originX: coords.typeMonth.OriginX,
      originY: coords.typeMonth.OriginY
    })
    if (monthText.width > coords.typeMonth.ScaleToWidth) {
      monthText.scaleToWidth(coords.typeMonth.ScaleToWidth)
    }
    if (coords.typeMonth.themeOption) {
      findThemeOption(coords.typeMonth, themeOption, monthText);
     }
    fabricRef.current.add(monthText);
    fabricRef.current.renderAll();
  })
}

export default typeMonth

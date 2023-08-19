import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const typeMonth = (fabricRef, month, themeOption, coords) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "month") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });
  if (coords.typeMonth.type === "upper") {
    month = month.toUpperCase();
  }
  const font = new FontFaceObserver(coords.typeMonth.FontFamily);
  font.load().then(() => {
    let shadow;
    if (coords.typeMonth.shadow) {
      shadow = new fabric.Shadow({
        color: "white",
        blur: 2,
        offsetX: 0,
        offsetY: 0,
      });
    }
    const monthText = new fabric.Text(month, {
      selectable: false,
      className: "month",
      top: coords.typeMonth.Top,
      left: coords.typeMonth.Left,
      charSpacing: coords.typeMonth.CharSpacing,
      fontFamily: coords.typeMonth.FontFamily,
      fontStyle: coords.typeMonth.FontStyle ? coords.typeMonth.FontStyle : "normal",
      fontSize: coords.typeMonth.FontSize,
      shadow: shadow ? shadow : null,
      width: coords.typeMonth.ScaleToWidth,
      fill: coords.typeMonth.Fill,
      originX: coords.typeMonth.OriginX,
      originY: coords.typeMonth.OriginY,
    });
    if (coords.typeMonth.shadow) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "month") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const monthStroke = new fabric.Text(month, {
        selectable: false,
        className: "month",
        top: coords.typeMonth.Top,
        left: coords.typeMonth.Left,
        charSpacing: coords.typeMonth.CharSpacing,
        fontFamily: coords.typeMonth.FontFamily,
        fontStyle: coords.typeMonth.FontStyle ? coords.typeMonth.FontStyle : "normal",
        fontSize: coords.typeMonth.FontSize,
        stroke: "white",
        strokeWidth: 20,
        zIndex:5,
        strokeUniform: true,
        width: coords.typeMonth.ScaleToWidth,
        fill: "white",
        textAlign: "center",
        angle: coords.typeMonth.Angle || 0,
        originX: coords.typeMonth.OriginX,
        originY: coords.typeMonth.OriginY,
      });
      if (monthStroke.width > coords.typeMonth.ScaleToWidth) {
        monthStroke.scaleToWidth(coords.typeMonth.ScaleToWidth);
      }
      fabricRef.current.add(monthStroke);
      fabricRef.current.renderAll();
    }

    if (monthText.width > coords.typeMonth.ScaleToWidth) {
      monthText.scaleToWidth(coords.typeMonth.ScaleToWidth);
      if (coords.typeMonth?.Angle) {
        typeMonth.scaleToHeight(coords.typeMonth.ScaleToWidth);
      }
    }
    if (coords.typeMonth.themeOption) {
      findThemeOption(coords.typeMonth, themeOption, monthText);
    }
    fabricRef.current.add(monthText);
    fabricRef.current.renderAll();
  });
};

export default typeMonth;

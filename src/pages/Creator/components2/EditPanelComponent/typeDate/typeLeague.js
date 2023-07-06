import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const typeLeague = (fabricRef, league, themeOption, coords) => {
  
    fabricRef.current._objects.forEach((image, i) => {
      if (fabricRef.current.item(i).className === "yourLeague") {
        fabricRef.current.remove(fabricRef.current.item(i));
      }
    });

    const font = new FontFaceObserver(coords.yourLeague.FontFamily);
    font.load().then(() => {
      const yourLeague = new fabric.Text(league, {
        top: coords.yourLeague.Top,
        left: coords.yourLeague.Left,
        fontFamily: coords.yourLeague.FontFamily,
        selectable: false,
        fontSize: coords.yourLeague.FontSize,
        fill: coords.yourLeague.Fill,
        className: "yourLeague",
        originX: coords.yourLeague.OriginX,
        originY: coords.yourLeague.OriginY,
        angle: (coords.yourLeague.Angle || 0),
        fontStyle: coords.yourLeague.FontStyle ? coords.yourLeague.FontStyle : "normal",
      });

      if (yourLeague.width > coords.yourLeague.ScaleToWidth) {
        yourLeague.scaleToWidth(coords.yourLeague.ScaleToWidth);
      }
      if (coords.yourLeague.themeOption) {
        findThemeOption(coords.yourLeague, themeOption, yourLeague);
      }
      fabricRef.current.add(yourLeague);
      fabricRef.current.renderAll();
    });
  
};

export default typeLeague;

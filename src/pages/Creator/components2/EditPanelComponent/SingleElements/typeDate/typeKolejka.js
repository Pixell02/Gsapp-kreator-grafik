import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const typeKolejka = (fabricRef, typeRound, coords, themeOption) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "yourRound") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });
  const font = new FontFaceObserver(coords.yourKolejka.FontFamily);
  font.load().then(() => {
    const yourKolejka = new fabric.Text(typeRound, {
      charSpacing: coords.yourKolejka.CharSpacing ? coords.yourKolejka.CharSpacing : 0,
      top: coords.yourKolejka.Top,
      left: coords.yourKolejka.Left,
      fontFamily: coords.yourKolejka.FontFamily,
      selectable: false,
      fontSize: coords.yourKolejka.FontSize,
      fill: coords.yourKolejka.Fill,
      className: "yourRound",
      originX: coords.yourKolejka.OriginX,
      originY: coords.yourKolejka.OriginY,
      angle: (coords.yourKolejka.Angle || 0),
      fontStyle: coords.yourKolejka.FontStyle ? coords.yourKolejka.FontStyle : "normal",
    });
    if (yourKolejka.width > coords.yourKolejka.ScaleToWidth) {
      yourKolejka.scaleToWidth(coords.yourKolejka.ScaleToWidth);
    }
    if (coords.yourKolejka.themeOption) {
      findThemeOption(coords.yourKolejka, themeOption, yourKolejka)
    }
    fabricRef.current.add(yourKolejka);
    fabricRef.current.renderAll();
  });
};

export default typeKolejka;

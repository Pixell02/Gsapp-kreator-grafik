import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from "../functions/themeOption";

const playerName = (fabricRef, selectedPlayerName, coords, themeOption, i) => {
  fabricRef.current._objects.forEach((image) => {
    if (image.className === "yourPlayer" + i) {
      fabricRef.current.remove(image);
      fabricRef.current.renderAll();
    }
  });
  const font = new FontFaceObserver(coords.FontFamily);
  let formatPlayer = "";

  if (coords.format === "dotted") {
    formatPlayer = selectedPlayerName.split(".")[1][0] + "." + selectedPlayerName.split(".")[2];
  } else if (coords.format === "nameSurName") {
    formatPlayer = selectedPlayerName.split(".")[1] + " " + selectedPlayerName.split(".")[2];
  } else {
    formatPlayer = selectedPlayerName.split(".")[2];
  }
  font.load().then(() => {
    const playerName = new fabric.Text(formatPlayer, {
      left: coords.Left,
      top: coords.Top,
      fill: coords.Fill,
      originX: coords.OriginX,
      originY: coords.OriginY,
      className: "yourPlayer" + i,
      selectable: false,
      fontFamily: coords.FontFamily,
      angle: coords.Angle ? coords.Angle : 0,
      fontSize: coords.FontSize,
    });

    if (playerName.width > coords.ScaleToWidth) {
      playerName.scaleToWidth(coords.ScaleToWidth);
    }

    if (coords.themeOption && themeOption) {
      findThemeOption(coords, themeOption, playerName);
    }

    fabricRef.current.add(playerName);
    playerName.bringToFront();
    fabricRef.current.renderAll();
  });
};

export default playerName;

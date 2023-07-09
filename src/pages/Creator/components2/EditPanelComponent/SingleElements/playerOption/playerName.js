import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from "../functions/themeOption";

const playerName = (fabricRef, selectedPlayerName, coords, themeOption, posterBackground) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "yourPlayer") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });
  const font = new FontFaceObserver(coords.player.FontFamily);
  let formatPlayer = "";

  if (coords.player.format === "dotted") {
    formatPlayer = selectedPlayerName.split(".")[1][0] + "." + selectedPlayerName.split(".")[2];
  } else if (coords.player.format === "nameSurName") {
    formatPlayer = selectedPlayerName.split(".")[1] + " " + selectedPlayerName.split(".")[2];
  } else {
    formatPlayer = selectedPlayerName.split(".")[2];
  }
  font.load().then(() => {
    const playerName = new fabric.Text(formatPlayer, {
      left: coords.player.Left,
      top: coords.player.Top,
      fill: coords.player.Fill,
      originX: coords.player.OriginX,
      originY: coords.player.OriginY,
      className: "yourPlayer",
      selectable: false,
      fontFamily: coords.player.FontFamily,
      angle: coords.player.Angle ? coords.player.Angle : 0,
      fontSize: coords.player.FontSize,
    });

    if (playerName.width > coords.player.ScaleToWidth) {
      playerName.scaleToWidth(coords.player.ScaleToWidth);
    }

    if (coords.player.themeOption) {
      findThemeOption(coords.player, themeOption, playerName);
    }

    fabricRef.current.add(playerName);
    fabricRef.current.renderAll();
  });
};

export default playerName;

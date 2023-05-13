import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../functions/themeOption";

const teamFullName = (fabricRef, yourName, coords, themeOption, radioChecked) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "yourName") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });
  const fullName = yourName.split(".")[0] + " " + yourName.split(".")[1];
  const font = new FontFaceObserver(coords.yourTeamName.FontFamily);
  font.load().then(() => {
    const text = new fabric.Text(fullName, {
      selectable: false,
      charSpacing: coords.yourTeamName.CharSpacing ? coords.yourTeamName.CharSpacing : 0,
      fontStyle: coords.yourTeamName.FontStyle ? coords.yourTeamName.FontStyle : "normal",
      originX: radioChecked === "radio1" ? coords.yourTeamName.OriginX : coords.opponentName.OriginX,
      originY: radioChecked === "radio1" ? coords.yourTeamName.OriginY : coords.opponentName.OriginY,
      top: radioChecked === "radio1" ? coords.yourTeamName.Top : coords.opponentName.Top,
      left: radioChecked === "radio1" ? coords.yourTeamName.Left : coords.opponentName.Left,
      fill: coords.yourTeamName.Fill,
      fontSize: coords.yourTeamName.FontSize,
      fontFamily: coords.yourTeamName.FontFamily,
      className: "yourName",
    });
    if (
      text.width > (radioChecked === "radio1" ? coords.yourTeamName.ScaleToWidth : coords.opponentName.ScaleToWidth)
    ) {
      text.scaleToWidth(
        radioChecked === "radio1" ? coords.yourTeamName.ScaleToWidth : coords.opponentName.ScaleToWidth
      );
    }
    if (coords.yourTeamName.themeOption) {
      findThemeOption(coords.yourTeamName,themeOption, text)
    }
    fabricRef.current.add(text);
      fabricRef.current.renderAll();
  });
};

export default teamFullName;

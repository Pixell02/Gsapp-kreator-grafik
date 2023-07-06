import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from "../functions/themeOption";

const teamSecondName = (fabricRef, yourName, coords, themeOption, radioChecked) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "yourSecondName") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });

  const secondTeamName = yourName.split(".")[1].toUpperCase();
  const secondFont = new FontFaceObserver(coords.yourTeamSecondName.FontFamily);
  secondFont.load().then(() => {
   
      const secondName = new fabric.Text(secondTeamName, {
        selectable: false,
        originX: radioChecked === "radio1" ? coords.yourTeamSecondName.OriginX : (coords.opponentName && coords.opponentName.OriginX) ? coords.opponentName.OriginX : coords.opponentSecondName.OriginX,
        originY: radioChecked === "radio1" ? coords.yourTeamSecondName.OriginY : (coords.opponentName && coords.opponentName.OriginY) ? coords.opponentName.OriginY : coords.opponentSecondName.OriginY,
        top: radioChecked === "radio1" ? coords.yourTeamSecondName.Top : (coords.opponentName && coords.opponentName.Top) ? coords.opponentName.Top : coords.opponentSecondName.Top,
        left: radioChecked === "radio1" ? coords.yourTeamSecondName.Left : (coords.opponentName && coords.opponentName.Left) ? coords.opponentName.Left : coords.opponentSecondName.Left,
        fill: coords.yourTeamSecondName.Fill,
        fontSize: coords.yourTeamSecondName.FontSize,
        fontFamily: coords.yourTeamSecondName.FontFamily,
        fontStyle: coords.yourTeamSecondName.FontStyle ? coords.yourTeamSecondName.FontStyle : "normal",
        angle: radioChecked === "radio1" ? (coords.yourTeamSecondName.Angle || 0) : (coords.opponentSecondName.Angle || 0),
        className: "yourSecondName",
      });

      if (secondName.width > (coords.opponentName ? coords.opponentName.ScaleToWidth : coords.yourTeamSecondName.ScaleToWidth)) {
        secondName.scaleToWidth(coords.yourTeamSecondName.ScaleToWidth);
      }
    

      if (coords.opponentName ? coords.opponentName.themeOption : coords.yourTeamSecondName.themeOption) {
        findThemeOption(coords.yourTeamSecondName, themeOption, secondName);
      }
    

      fabricRef.current.add(secondName);
      fabricRef.current.renderAll();
   
  });
};

export default teamSecondName;

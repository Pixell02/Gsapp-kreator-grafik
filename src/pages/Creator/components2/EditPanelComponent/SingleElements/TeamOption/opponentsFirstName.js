import React from 'react'
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from '../functions/themeOption';
const opponentsFirstName = (fabricRef, opponentName, coords, themeOption, radioChecked) => {
  
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "opponentsFirstName") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });

  const opponentFirstName = opponentName.split(" ")[0];
  const font = new FontFaceObserver(
    coords.opponentFirstName.FontFamily
  );
  font.load().then(() => {
    const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
      selectable: false,
      top: radioChecked === "radio1" ? coords.opponentFirstName.Top : coords.yourTeamFirstName.Top,
      left: radioChecked === "radio1" ? coords.opponentFirstName.Left : coords.yourTeamFirstName.Left,
      originY: radioChecked === "radio1" ? coords.opponentFirstName.OriginY : coords.yourTeamFirstName.OriginY,
      originX: radioChecked === "radio1" ? coords.opponentFirstName.OriginX : coords.yourTeamFirstName.OriginX,
      fontSize: coords.opponentFirstName.FontSize,
      fill: coords.opponentFirstName.Fill,
      className: "opponentsFirstName",
      zIndex:5,
      fontFamily: coords.opponentFirstName.FontFamily,
      angle: radioChecked === "radio1" ? (coords.opponentFirstName.Angle || 0) : (coords.yourTeamFirstName.Angle || 0),
      fontStyle: coords.opponentFirstName.FontStyle ? coords.opponentFirstName.FontStyle : "normal"
    });
                   
    if (firstName.width > coords.opponentFirstName.ScaleToWidth) {
      firstName.scaleToWidth(
        coords.opponentFirstName.ScaleToWidth
      );
    }
    if (coords.opponentFirstName.themeOption) {
      findThemeOption(coords.opponentFirstName, themeOption, firstName)
    }
    fabricRef.current.add(firstName);
    fabricRef.current.renderAll();
  });
}


export default opponentsFirstName

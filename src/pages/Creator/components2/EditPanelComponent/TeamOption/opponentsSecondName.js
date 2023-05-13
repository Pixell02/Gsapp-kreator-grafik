import React from 'react'
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from '../functions/themeOption';

const opponentsSecondName = (fabricRef, opponentName, coords, themeOption, radioChecked) => {
 
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "opponentsSecondName") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
  });

  const opponentSecondName = opponentName.split(" ")[1];
  const font = new FontFaceObserver(
    coords.opponentSecondName.FontFamily
  );
  font.load().then(() => {
    const secondName = new fabric.Text(opponentSecondName.toUpperCase(), {
      selectable: false,
      top: radioChecked === "radio1" ? coords.opponentSecondName.Top : coords.yourTeamSecondName.Top,
      left: radioChecked === "radio1" ? coords.opponentSecondName.Left : coords.yourTeamSecondName.Left,
      originY: radioChecked === "radio1" ? coords.opponentSecondName.OriginY : coords.yourTeamSecondName.OriginY,
      originX: radioChecked === "radio1" ? coords.opponentSecondName.OriginX : coords.yourTeamSecondName.OriginX,
      fontSize: coords.opponentSecondName.FontSize,
      fill: coords.opponentSecondName.Fill,
      className: "opponentsSecondName",
      fontFamily: coords.opponentSecondName.FontFamily,
      fontStyle: coords.opponentSecondName.FontStyle ? coords.opponentSecondName.FontStyle : "normal"
    });
                   
    if (secondName.width > coords.opponentSecondName.ScaleToWidth) {
      secondName.scaleToWidth(
        coords.opponentSecondName.ScaleToWidth
      );
    }
    if (coords.opponentSecondName.themeOption) {
      findThemeOption(coords.opponentSecondName, themeOption, secondName)
    }
    fabricRef.current.add(secondName);
    fabricRef.current.renderAll();
  })
}

export default opponentsSecondName

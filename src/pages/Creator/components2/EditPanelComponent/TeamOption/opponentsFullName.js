import React from 'react'
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from '../functions/themeOption';

const opponentsFullName = (fabricRef, opponentName, coords, themeOption, radioChecked) => {
  
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "opponentsName") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });
  const fontOpponent = new FontFaceObserver(
    coords.opponentName.FontFamily
  );
  if (coords.opponentName.type === "upper")
    opponentName = opponentName.upperCases();
  fontOpponent.load().then(() => {
   
      const opponentsName = new fabric.Text(
        opponentName,
        {
          selectable: false,
          top: radioChecked === "radio1" ? coords.opponentName.Top : (coords.yourTeamName && coords.yourTeamName.Top) ? coords.yourTeamName.Top : coords.yourTeamFirstName.Top,
          left: radioChecked === "radio1" ? coords.opponentName.Left : (coords.yourTeamName && coords.yourTeamName.Left) ? coords.yourTeamName.Left : coords.yourTeamFirstName.Left,
          originY: radioChecked === "radio1" ? coords.opponentName.OriginY : (coords.yourTeamName && coords.yourTeamName.OriginY) ? coords.yourTeamName.OriginY : coords.yourTeamFirstName.OriginY ,
          originX: radioChecked === "radio1" ? coords.opponentName.OriginX : (coords.yourTeamName && coords.yourTeamName.OriginX) ? coords.yourTeamName.OriginX : coords.yourTeamFirstName.OriginX,
          fontSize: coords.opponentName.FontSize,
          fill: coords.opponentName.Fill,
          className: "opponentsName",
          fontFamily: coords.opponentName.FontFamily,
          fontStyle: coords.opponentName.FontStyle ? coords.opponentName.FontStyle : "normal"
        }
      );
      if (opponentsName.width > coords.opponentName.ScaleToWidth) {
        opponentsName.scaleToWidth(
          coords.opponentName.ScaleToWidth
        );
      }
      if (coords.opponentName.themeOption) {
        findThemeOption(coords.opponentName, themeOption, opponentsName)
      }

      fabricRef.current.add(opponentsName);
      fabricRef.current.renderAll();
    
  });


}

export default opponentsFullName

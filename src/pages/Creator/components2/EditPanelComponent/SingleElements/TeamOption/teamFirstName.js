import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from "../functions/themeOption";

const teamFirstName = (fabricRef, yourName, coords, themeOption, radioChecked) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "yourFirstName") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });
  const firstTeamName = yourName.split(".")[0].toUpperCase();

  const font = new FontFaceObserver(coords.yourTeamFirstName.FontFamily);

  font.load().then(() => {
    if (radioChecked === "radio2") {
      const text = new fabric.Text(firstTeamName, {
        selectable: false,
        originX: coords.opponentFirstName ? coords.opponentFirstName.OriginX : coords.opponentName.OriginX,
        originY: coords.opponentFirstName ? coords.opponentFirstName.OriginY : coords.opponentName.OriginY,
        top: coords.opponentFirstName ? coords.opponentFirstName.Top : coords.yourTeamFirstName.Top2,
        left: coords.opponentFirstName ? coords.opponentFirstName.Left : coords.yourTeamFirstName.Left,
        fill: coords.opponentFirstName ? coords.opponentFirstName.Fill : coords.opponentName.Fill,
        zIndex:5,
        fontFamily: coords.opponentFirstName ? coords.opponentFirstName.FontFamily : coords.opponentName.FontFamily,
        fontSize: coords.opponentFirstName ? coords.opponentFirstName.FontSize : coords.yourTeamFirstName.FontSize,
        angle: radioChecked === "radio1" ? (coords.opponentFirstName?.Angle || 0) : (coords.yourTeamFirstName?.Angle || 0),
        className: "yourFirstName",
      });

      if (
        text.width >
        (coords.opponentFirstName ? coords.opponentFirstName.ScaleToWidth : coords.yourTeamFirstName.ScaleToWidth)
      ) {
        text.scaleToWidth(
          coords.opponentFirstName ? coords.opponentFirstName.ScaleToWidth : coords.yourTeamFirstName.ScaleToWidth
        );
      }

      if (coords.opponentFirstName ? coords.opponentFirstName.themeOption : coords.opponentName.themeOption) {
        findThemeOption(coords.opponentFirstName, themeOption, text);
      }

      fabricRef.current.add(text);
      fabricRef.current.renderAll();
    } else {
      const text = new fabric.Text(firstTeamName, {
        selectable: false,
        top: coords.yourTeamFirstName.Top,
        left: coords.yourTeamFirstName.Left,
        fill: coords.yourTeamFirstName.Fill,
        fontFamily: coords.yourTeamFirstName.FontFamily,
        fontSize: coords.yourTeamFirstName.FontSize,
        originX: coords.yourTeamFirstName.OriginX,
        originY: coords.yourTeamFirstName.OriginY,
        fontStyle: coords.yourTeamFirstName.FontStyle ? coords.yourTeamFirstName.FontStyle : "normal",
        className: "yourFirstName",
      });

      if (text.width > coords.yourTeamFirstName.ScaleToWidth) {
        text.scaleToWidth(coords.yourTeamFirstName.ScaleToWidth);
      }
      console.log(coords.yourTeamFirstName.themeOption)
      if (coords.yourTeamFirstName ? coords.yourTeamFirstName.themeOption : coords.yourTeamName.themeOption) {
        findThemeOption(coords.yourTeamFirstName, themeOption, text);
      }
      fabricRef.current.add(text);
      fabricRef.current.renderAll();
    }
  });
};

export default teamFirstName;

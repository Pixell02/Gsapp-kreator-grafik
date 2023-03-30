import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function opponentNames(fabricRef, props, loops) {
 
  
  if (loops && props.selectNamesValues) {
    loops.forEach((loop, i) => {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentName") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.selectNamesValues[i] && props.coords.opponentNameOne) {
        const font = new FontFaceObserver(props.coords.opponentNameOne.FontFamily);
        if (props.radioValues[i] === "radio1") {
          font.load().then(() => {
       
            const teamName = new fabric.Text(props.selectNamesValues[i] ? props.selectNamesValues[i] : null, {
              selectable: false,
              className: "opponentName",
              top: props.coords.opponentNameOne.Top + i * props.coords.yourTeamNameOne.Margin,
              left: props.coords.opponentNameOne.Left,
              fontFamily: props.coords.opponentNameOne.FontFamily,
              fontSize: props.coords.opponentNameOne.FontSize,
              fill: props.coords.opponentNameOne.Fill,
              originX: props.coords.opponentNameOne.OriginX,
              originY: props.coords.opponentNameOne.OriginY
            });
            if (teamName.width > props.coords.opponentNameOne.ScaleToWidth) {
              teamName.scaleToWidth(props.coords.opponentNameOne.ScaleToWidth);
            }
            fabricRef.current.add(teamName);
       
          });
        } else if (props.radioValues[i] === "radio2") {
          font.load().then(() => {
       
            const teamName = new fabric.Text(props.selectNamesValues[i] ? props.selectNamesValues[i] : null, {
              selectable: false,
              className: "opponentName",
              top: props.coords.yourTeamNameOne.Top + i * props.coords.yourTeamNameOne.Margin,
              left: props.coords.yourTeamNameOneLeft,
              fontFamily: props.coords.yourTeamNameOne.FontFamily,
              fontSize: props.coords.yourTeamNameOne.FontSize,
              fill: props.coords.yourTeamNameOne.Fill,
              originX: props.coords.yourTeamNameOne.OriginX,
              originY: props.coords.yourTeamNameOne.OriginY
            });
            if (teamName.width > props.coords.opponentNameOne.ScaleToWidth) {
              teamName.scaleToWidth(props.coords.opponentNameOne.ScaleToWidth);
            }
            fabricRef.current.add(teamName);
       
          });
        }
      }
    });
  }
}

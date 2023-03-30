import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function teamLogos(fabricRef, props, loops) {

  if (props.yourLogo[0].firstName && props.coords.yourTeamNameOne&& props.coords.type !== "league") {
    
    const font = new FontFaceObserver(props.coords.yourTeamNameOne.FontFamily)
    if (loops) {
      loops.forEach((loop, i) => {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourTeamName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
     
        font.load().then(() => {
          if (props.radioValues[i] === "radio1") {
            const teamName = new fabric.Text(props.yourLogo[0].firstName + ' ' + props.yourLogo[0].secondName, {
              selectable: false,
              className: "yourTeamName",
              top: props.coords.yourTeamNameOne.Top + i * props.coords.yourTeamNameOne.Margin,
              left: props.coords.yourTeamNameOne.Left,
              fontFamily: props.coords.yourTeamNameOne.FontFamily,
              fontSize: props.coords.yourTeamNameOne.FontSize,
              fill: props.coords.yourTeamNameOne.Fill,
              originX: props.coords.yourTeamNameOne.OriginX,
              originY: props.coords.yourTeamNameOne.OriginY,
            })
            if (teamName.width > props.coords.yourTeamName.ScaleToWidth) {
              teamName.scaleToWidth(props.coords.yourTeamName.ScaleToWidth)
            }
            fabricRef.current.add(teamName);
          } else {
            const teamName = new fabric.Text(props.yourLogo[0].firstName + ' ' + props.yourLogo[0].secondName, {
              selectable: false,
              className: "yourTeamName",
              top: props.coords.opponentNameOne.Top + i * props.coords.yourTeamNameOne.Margin,
              left: props.coords.opponentNameOne.Left,
              width: props.coords.opponentName.ScaleToWidth,
              fontFamily: props.coords.opponentNameOne.FontFamily,
              fontSize: props.coords.opponentNameOne.FontSize,
              fill: props.coords.opponentNameOne.Fill,
              originX: props.coords.opponentNameOne.OriginX,
              originY: props.coords.opponentNameOne.OriginY
            })
            if (teamName.width > props.coords.opponentName.ScaleToWidth) {
              teamName.scaleToWidth(props.coords.opponentName.ScaleToWidth)
            }
            fabricRef.current.add(teamName);
          }
        })
      })
    }
  }
}

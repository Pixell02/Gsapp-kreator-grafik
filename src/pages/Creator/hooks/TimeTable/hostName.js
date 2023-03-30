import React from 'react'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";


export default function hostName(fabricRef, props, loops) {

  if (loops && props.selectHostNamesValues) {
    loops.forEach((loop, i) => {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentName") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.selectHostNamesValues[i] && props.coords.yourTeamNameOne) {
        const font = new FontFaceObserver(props.coords.yourTeamNameOne.FontFamily);
        if (props.radioValues[i] === "radio1") {
          
          font.load().then(() => {
            
            const teamName = new fabric.Text(props.selectHostNamesValues[i] ? props.selectHostNamesValues[i] : null, {
              selectable: false,
              className: "opponentName",
              top: props.coords.yourTeamNameOne.Top + i * props.coords.yourTeamNameOne.Margin,
              left: props.coords.yourTeamNameOne.Left,
              fontFamily: props.coords.yourTeamNameOne.FontFamily,
              fontSize: props.coords.yourTeamNameOne.FontSize,
              fill: props.coords.yourTeamNameOne.Fill,
              originX: props.coords.yourTeamNameOne.OriginX,
              originY: props.coords.yourTeamNameOne.OriginY
            });
            if (teamName.width > props.coords.yourTeamNameOne.ScaleToWidth) {
              teamName.scaleToWidth(props.coords.yourTeamNameOne.ScaleToWidth);
            }
            fabricRef.current.add(teamName);
            fabricRef.current.renderAll();
          });
        } else if (props.radioValues[i] === "radio2") {
          font.load().then(() => {
       
            const teamName = new fabric.Text(props.selectHostNamesValues[i] ? props.selectHostNamesValues[i] : null, {
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
            if (teamName.width > props.coords.opponentName.ScaleToWidth) {
              teamName.scaleToWidth(props.coords.opponentName.ScaleToWidth);
            }
            fabricRef.current.add(teamName);
            fabricRef.current.renderAll();
          });
        }
      }
    });
  }

}

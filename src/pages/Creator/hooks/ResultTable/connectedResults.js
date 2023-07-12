import React from 'react'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
export default function connectedResults(fabricRef, props, loops) {
  
  if (loops && props.coords.yourTeamResultsOne) {
    loops.forEach((loop, i) => {
      if (props.coords.yourTeamResultsOne && props.yourTeamResultsValue[i]) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
    
        const font = new FontFaceObserver(props.coords.yourTeamResultsOne.FontFamily);
        font.load().then(() => {
          // if (props.radioValues[i] === "radio1") {
        
            const yourResult = new fabric.Text((props.yourTeamResultsValue[i] ? props.yourTeamResultsValue[i] : "") + ":" + (props.opponentTeamResultsValue[i] ? props.opponentTeamResultsValue[i] : ""), {
              top: props.coords.yourTeamResultsOne.Top + i * props.coords.yourTeamResultsOne.Margin,
              left: props.radioValues[i] === "radio1" ? props.coords.yourTeamResultsOne.Left : props.coords.yourTeamResultsOne.Left2,
              fontFamily: props.coords.yourTeamResultsOne.FontFamily,
              fontSize: props.coords.yourTeamResultsOne.FontSize,
              fill: props.coords.yourTeamResultsOne.Fill,
              width: props.coords.yourTeamResultsOne.ScaleToWidth,
              originX: props.coords.yourTeamResultsOne.OriginX,
              originY: props.coords.yourTeamResultsOne.OriginY,
              selectable: false,
              className: "yourResult",
            });
            
            if (yourResult.width > props.coords.yourTeamResultsOne.ScaleToWidth) {
              yourResult.scaleToWidth(props.coords.yourTeamResultsOne.ScaleToWidth);
            }
        
            fabricRef.current.add(yourResult);
            fabricRef.current.renderAll();
          // }
        });
      }
    })
  }
}

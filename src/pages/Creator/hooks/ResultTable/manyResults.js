import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export const yourTeamResult = (fabricRef, props, loops) => {
  
    if (loops) {
        loops.forEach((loop, i) => {
        if (props.coords.yourTeamResultsOne && props.yourTeamResultsValue[i]) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        
        const font = new FontFaceObserver(props.coords.yourTeamResultsOne.FontFamily);
        font.load().then(() => {
          if (props.radioValues[i] === "radio1") {
            
            const yourResult = new fabric.Text(props.yourTeamResultsValue[i], {
              top: props.coords.yourTeamResultsOne.Top + i * props.coords.yourTeamResultsOne.Margin,
              left: props.coords.yourTeamResultsOne.Left,
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
          } else {
            const yourResult = new fabric.Text(props.yourTeamResultsValue[i], {
              top: props.coords.opponentTeamResultsOne.Top + i * props.coords.opponentTeamResultsOne.Margin,
              left: props.coords.opponentTeamResultsOne.Left,
              fontFamily: props.coords.opponentTeamResultsOne.FontFamily,
              fontSize: props.coords.opponentTeamResultsOne.FontSize,
              fill: props.coords.opponentTeamResultsOne.Fill,
              width: props.coords.opponentTeamResultsOne.ScaleToWidth,
              originX: props.coords.opponentTeamResultsOne.OriginX,
              originY: props.coords.opponentTeamResultsOne.OriginY,
              selectable: false,
              className: "yourResult",
            });
            console.log(yourResult)
            if (yourResult.width > props.coords.yourTeamResultsOne.ScaleToWidth) {
              yourResult.scaleToWidth(props.coords.yourTeamResultsOne.ScaleToWidth);
            }
            fabricRef.current.add(yourResult);
          }
        });
       }   
      });
    
  }
};

export const opponentTeamResult = (fabricRef, props, loops) => {
  if (props.coords.opponentTeamResultsOne && props.opponentTeamResultsValue) {
    if (loops) {
      loops.forEach((loop, i) => {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(props.coords.opponentTeamResultsOne.FontFamily);
        font.load().then(() => {
          if (props.radioValues[i] === "radio1") {
            const opponentResult = new fabric.Text(props.opponentTeamResultsValue[i], {
              top: props.coords.opponentTeamResultsOne.Top + i * props.coords.opponentTeamResultsOne.Margin,
              left: props.coords.opponentTeamResultsOne.Left,
              fontFamily: props.coords.opponentTeamResultsOne.FontFamily,
              fontSize: props.coords.opponentTeamResultsOne.FontSize,
              fill: props.coords.opponentTeamResultsOne.Fill,
              width: props.coords.opponentTeamResultsOne.ScaleToWidth,
              originX: props.coords.opponentTeamResultsOne.OriginX,
              originY: props.coords.opponentTeamResultsOne.OriginY,
              selectable: false,
              className: "opponentResult",
            });
            if (opponentResult.width > props.coords.opponentTeamResultsOne.ScaleToWidth) {
              opponentResult.scaleToWidth(props.coords.opponentTeamResultsOne.ScaleToWidth);
            }
            fabricRef.current.add(opponentResult);
          } else {
            const opponentResult = new fabric.Text(props.opponentTeamResultsValue[i], {
              top: props.coords.yourTeamResultsOne.Top + i * props.coords.yourTeamResultsOne.Margin,
              left: props.coords.yourTeamResultsOne.Left,
              fontFamily: props.coords.yourTeamResultsOne.FontFamily,
              fontSize: props.coords.yourTeamResultsOne.FontSize,
              fill: props.coords.yourTeamResultsOne.Fill,
              width: props.coords.yourTeamResultsOne.ScaleToWidth,
              originX: props.coords.yourTeamResultsOne.OriginX,
              originY: props.coords.yourTeamResultsOne.OriginY,
              selectable: false,
              className: "opponentResult",
            });
            if (opponentResult.width > props.coords.opponentTeamResultsOne.ScaleToWidth) {
              opponentResult.scaleToWidth(props.coords.opponentTeamResultsOne.ScaleToWidth);
            }
            fabricRef.current.add(opponentResult);
          }
        });
      });
    }
  }
};

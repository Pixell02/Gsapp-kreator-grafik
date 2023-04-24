
import { useEffect, useState } from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

const connectedText = (fabricRef, props, loops) => {

    
  if ((props.selectNamesValues) && props.coords.opponentTeamNameOne) {
    let text = Array(5).fill("");
    text.forEach((loop, i) => {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "connectedText") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const font = new FontFaceObserver(props.coords.opponentTeamNameOne.FontFamily)
      if (props.radioValues[i] === "radio1") {
        text[i] = `${props.yourLogo[0].firstName + " " + props.yourLogo[0].secondName} - ${props.selectNamesValues[i]}`
      } else {
        text[i] = `${props.selectNamesValues[i]} - ${props.yourLogo[0].firstName + " " + props.yourLogo[0].secondName} `
      }
      
      font.load().then(() => {
      console.log(props.coords.opponentTeamNameOne)
      const reserveText = new fabric.Text(text[i], {
        selectable: false,
        className: "connectedText",
        textAlign: props.coords.opponentTeamNameOne.TextAlign,
        width: props.coords.opponentTeamNameOne.ScaleToWidth,
        top: props.coords.opponentTeamNameOne.Top + (i * props.coords.opponentTeamNameOne.Margin) ,
        left: props.coords.opponentTeamNameOne.Left,
        originX: props.coords.opponentTeamNameOne.OriginX,
        originY: props.coords.opponentTeamNameOne.OriginY,
        fontFamily: props.coords.opponentTeamNameOne.FontFamily,
        fontSize: props.coords.opponentTeamNameOne.FontSize,
        fill: props.coords.opponentTeamNameOne.Fill,
      })
        if(reserveText.width > props.coords.opponentTeamNameOne.ScaleToWidth)
        reserveText.scaleToWidth(props.coords.opponentTeamNameOne.ScaleToWidth)
        fabricRef.current.add(reserveText);
        
        fabricRef.current.renderAll();
    })
  })
  }
}

export default connectedText;
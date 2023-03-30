import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function selectedTeam(fabricRef, props, loops) {
  
  if (loops && props.coords.type === "league") {
    loops.forEach((loop, i) => {
      if (props.selectTeamValue[i] && props.coords.yourTeamNameOneTop) {
        const font = new FontFaceObserver(props.coords.yourTeamNameOneFontFamily);
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourTeamName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });

        font.load().then(() => {
          const teamName = new fabric.Text(props.selectTeamValue[i].label ? props.selectTeamValue[i].label : null, {
            selectable: false,
            className: "yourTeamName",
            top: props.coords.yourTeamNameOneTop + i * props.coords.yourTeamNameOneMargin,
            left: props.coords.yourTeamNameOneLeft,
            width: props.coords.yourTeamNameScaleToWidth,
            fontFamily: props.coords.yourTeamNameOneFontFamily,
            fontSize: props.coords.yourTeamNameOneFontSize,
            fill: props.coords.yourTeamNameOneFill,
            originX: props.coords.yourTeamNameOneOriginX,
            originY: props.coords.yourTeamNameOneOriginY,
          });
          if (teamName.width > props.coords.yourTeamNameScaleToWidth) {
            teamName.scaleToWidth(props.coords.yourTeamNameScaleToWidth);
          }
          fabricRef.current.add(teamName);
        });
    
      }
    });
  }
}

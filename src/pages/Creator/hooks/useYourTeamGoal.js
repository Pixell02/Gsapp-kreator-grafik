import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

export default function yourTeamGoals(fabricRef, props) {
  if (props.yourTeamGoal && props.yourTeamGoalMinute && props.coords.yourPlayerOneGoal) {
    let text = "";
    props.yourTeamGoal.forEach((yourTeamGoal, i) => {
      if (yourTeamGoal || props.yourTeamGoalMinute[i]) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourTeamGoals") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
          });
          let formatText = "";
        if (props.yourTeamGoalMinute[i] !== undefined) {
          formatText = props.yourTeamGoalMinute[i] + "' " + props.yourTeamGoal[i].split(".")[1] + " ";
        } else {
          formatText = props.yourTeamGoal[i].split(".")[1] + " ";
          }
        text += formatText + "\n";
        
      }
    });
    const font = new FontFaceObserver(props.coords.yourPlayerOneGoal.FontFamily);
    font.load().then(() => {
      const showPlayer = new fabric.Textbox(text, {
        top: props.coords.yourPlayerOneGoal.Top,
        left: props.radioChecked === "radio1" ? props.coords.yourPlayerOneGoal.Left : props.coords.opponentPlayerOneGoal.Left,
        textAlign: props.radioChecked === "radio1" ? props.coords.yourPlayerOneGoal.TextAlign : props.coords.opponentPlayerOneGoal.TextAlign,
        lineHeight: props.coords.yourPlayerOneGoal.LineHeight,
        width: props.coords.yourPlayerOneGoal.ScaleToWidth * 1.4,
        fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
        fontSize: props.coords.yourPlayerOneGoal.FontSize,
        selectable: false,
        fill: props.coords.yourPlayerOneGoal.Fill,
        className: "yourTeamGoals",
        originX: props.radioChecked === "radio1" ? props.coords.yourPlayerOneGoal.OriginX :props.coords.opponentPlayerOneGoal.OriginX,
        originY: "top",
      });

      showPlayer._textLines.forEach((lines, i) => {
        const width = showPlayer.getLineWidth(i);
        if (width >= props.coords.yourPlayerOneGoal.ScaleToWidth) {
          showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
        }
      });

      fabricRef.current.add(showPlayer);
      fabricRef.current.renderAll();
    });
  }
  return { yourTeamGoals };
}

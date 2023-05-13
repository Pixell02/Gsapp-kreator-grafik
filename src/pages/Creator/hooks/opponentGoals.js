import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

export default function opponentGoals(fabricRef, props) {
  if (props.opponentGoal && props.opponentGoalMinute && props.coords.opponentPlayerOneGoal) {
    let text = "";
    props.opponentGoal.forEach((opponentGoal, i) => {
      if (opponentGoal || props.opponentGoalMinute[i]) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentGoals") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        let formatText = "";
        if (props.opponentGoalMinute[i] !== undefined) {
          formatText = props.opponentGoalMinute[i] + "' " + props.opponentGoal[i] + " ";
        } else {
          formatText = props.opponentGoal[i] + " ";
        }
        text += formatText + "\n";
      }
    });
    
    const font = new FontFaceObserver(props.coords.yourPlayerOneGoal.FontFamily);
    font.load().then(() => {
      const showPlayer = new fabric.Textbox(text, {
        top: props.coords.opponentPlayerOneGoal.Top,
        left:
          props.radioChecked === "radio1"
            ? props.coords.opponentPlayerOneGoal.Left
            : props.coords.yourPlayerOneGoal.Left,
        lineHeight: props.coords.yourPlayerOneGoal.LineHeight,
        textAlign: props.radioChecked === "radio1" ? props.coords.opponentPlayerOneGoal.TextAlign : props.coords.yourPlayerOneGoal.TextAlign,
        fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
        fontSize: props.coords.yourPlayerOneGoal.FontSize,
        width: props.coords.yourPlayerOneGoal.ScaleToWidth * 1.2,
        selectable: false,
        fill: props.coords.yourPlayerOneGoal.Fill,
        className: "opponentGoals",
        splitByGrapheme: true,
        originX:
          props.radioChecked === "radio1"
            ? props.coords.opponentPlayerOneGoal.OriginX
            : props.coords.yourPlayerOneGoal.OriginX,
        originY: "top",
      });
      showPlayer._textLines.forEach((lines, i) => {
        const width = showPlayer.getLineWidth(i);
        if (width >= props.coords.yourPlayerOneGoal.ScaleToWidth) {
          showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
        }
      });    
      fabricRef.current.add(showPlayer);
    });
  }
  return { opponentGoals };
}

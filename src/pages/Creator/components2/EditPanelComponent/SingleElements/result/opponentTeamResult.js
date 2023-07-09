import React from 'react'
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from '../functions/themeOption';
export default function opponentTeamResult(props) {
  if (props.opponentGoals) {
   
    let text = "";
    props.opponentGoals.forEach((opponentGoal, i) => {
      if (opponentGoal || props.opponentGoalMinute[i]) {
        props.fabricRef.current._objects.forEach((image, i) => {
          if (props.fabricRef.current.item(i).className === "opponentGoals") {
            props.fabricRef.current.remove(props.fabricRef.current.item(i));
          }
        });
        let formatText = "";
        if (props.opponentGoalMinute[i] !== undefined) {
          formatText = props.opponentGoalMinute[i] + "' " + opponentGoal + " ";
        } else {
          formatText = opponentGoal + " ";
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
        angle: props.coords.yourPlayerOneGoal.Angle ? props.coords.yourPlayerOneGoal.Angle : 0,
        originX:
          props.radioChecked === "radio1"
            ? props.coords.opponentPlayerOneGoal.OriginX
            : props.coords.yourPlayerOneGoal.OriginX,
        originY: "top",
      });
      showPlayer._textLines.forEach((lines, i) => {
        const width = showPlayer.getLineWidth(i);

        while (width > props.coords.yourPlayerOneGoal.ScaleToWidth - 20) {
          const fontSize = showPlayer.get("fontSize");
          showPlayer.set("fontSize", fontSize - 1);
          const newWidth = showPlayer.getLineWidth(i);
          if (newWidth <= props.coords.yourPlayerOneGoal.ScaleToWidth - 20) {
            
            props.fabricRef.current.add(showPlayer);
            props.fabricRef.current.renderAll();
            break;
          }
         
        }
      });     
      props.fabricRef.current.add(showPlayer);
      props.fabricRef.current.renderAll();
    });
  }
}

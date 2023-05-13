import React from 'react'
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import findThemeOption from '../functions/themeOption';
export default function yourTeamResult(props) {
  
  let text = "";
  if (props.yourTeamGoal && props.coords.yourPlayerOneGoal) {
    
    props.yourTeamGoal.forEach((yourTeamGoal, i) => {
      if (yourTeamGoal || props.yourTeamGoalMinute[i]) {
        props.fabricRef.current._objects.forEach((image, i) => {
          if (props.fabricRef.current.item(i).className === "yourTeamGoals") {
            props.fabricRef.current.remove(props.fabricRef.current.item(i));
          }
        });
        console.log(yourTeamGoal)
        let formatText = "";
        if (props.yourTeamGoalMinute[i] !== undefined) {
          formatText = props.yourTeamGoalMinute[i] + "' " + yourTeamGoal.split(" ")[1]+ " ";
        } else {
          formatText = yourTeamGoal.split(" ")[1] + " ";
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
        originX: props.radioChecked === "radio1" ? props.coords.yourPlayerOneGoal.OriginX : props.coords.opponentPlayerOneGoal.OriginX,
        originY: "top",
      });

      showPlayer._textLines.forEach((lines, i) => {
        const width = showPlayer.getLineWidth(i);
        if (width >= props.coords.yourPlayerOneGoal.ScaleToWidth) {
          showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
        }
      });
      if (props.coords.yourPlayerOneGoal.themeOption) {
        findThemeOption(props.coords.yourPlayerOneGoal, props.themeOption, showPlayer)
      }

      props.fabricRef.current.add(showPlayer);
      props.fabricRef.current.renderAll();
    });
  }
}

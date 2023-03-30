import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

export default function yourTeamGoals(fabricRef, props) {
  
  if (props.yourTeamGoal || props.yourTeamGoalMinute) {
    props.yourTeamGoal.forEach((yourTeamGoal, i) => {
      if (yourTeamGoal || props.yourTeamGoalMinute[i]) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourTeamGoals") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      
        const font = new FontFaceObserver(props.coords.yourPlayerOneGoal.FontFamily);
        font.load().then(() => {
          if (props.radioChecked === "radio1") {
            if (yourTeamGoal) {
              const showPlayer = new fabric.Text(
                props.yourTeamGoalMinute[i]
                  ? props.yourTeamGoalMinute[i] + "' " + yourTeamGoal.split(".")[1].toUpperCase()
                  : yourTeamGoal.split(".")[1].toUpperCase(),
                {
                  top: props.coords.yourPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                  left: props.coords.yourPlayerOneGoal.Left,
                  width: props.coords.yourPlayerOneGoal.ScaleToWidth,
                  fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                  fontSize: props.coords.yourPlayerOneGoal.FontSize,
                  selectable: false,
                  fill: props.coords.yourPlayerOneGoal.Fill,
                  className: "yourTeamGoals",
                  originX: props.coords.yourPlayerOneGoal.OriginX,
                  originY: "center",
                }
              );
              
              if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
              }
              fabricRef.current.add(showPlayer);
              fabricRef.current.renderAll();
            } else {
              const showPlayer = new fabric.Text(
                yourTeamGoal
                  ? props.yourTeamGoalMinute[i] + "' " + yourTeamGoal.split(".")[1].toUpperCase()
                  : props.yourTeamGoalMinute[i] + "' ",
                {
                  top: props.coords.yourPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                  left: props.coords.yourPlayerOneGoal.Left,
                  width: props.coords.yourPlayerOneGoal.ScaleToWidth,
                  fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                  fontSize: props.coords.yourPlayerOneGoal.FontSize,
                  selectable: false,
                  fill: props.coords.yourPlayerOneGoal.Fill,
                  className: "yourTeamGoals",
                  originX: props.coords.yourPlayerOneGoal.OriginX,
                  originY: "center",
                }
              );

              if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
              }
              fabricRef.current.add(showPlayer);
              fabricRef.current.renderAll();
            }
          } else {
            if (yourTeamGoal) {
              if (props.id.uid !== "VZtk0ztSsTrfFNtLpvGY") {
                const showPlayer = new fabric.Text(
                  props.yourTeamGoalMinute[i] ? props.yourTeamGoalMinute[i] + "' " + yourTeamGoal.split(".")[1].toUpperCase() : yourTeamGoal.split(".")[1].toUpperCase(),
                  {
                    top: props.coords.opponentPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                    left: props.coords.opponentPlayerOneGoal.Left,
                    width: props.coords.opponentPlayerOneGoal.ScaleToWidth,
                    fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                    fontSize: props.coords.yourPlayerOneGoal.FontSize,
                    selectable: false,
                    fill: props.coords.yourPlayerOneGoal.Fill,
                    className: "yourTeamGoals",
                    originX: props.coords.opponentPlayerOneGoal.OriginX,
                    originY: "center",
                  }
                );
                if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                  showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
                }
                fabricRef.current.add(showPlayer);
              } else {
                const showPlayer = new fabric.Text(
                  props.yourTeamGoalMinute[i] ? props.yourTeamGoalMinute[i] + "' " + yourTeamGoal.split(".")[1].toUpperCase() : yourTeamGoal.split(".")[1].toUpperCase(),
                  {
                    top: props.coords.yourPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                    left: props.coords.yourPlayerOneGoal.Left,
                    width: props.coords.yourPlayerOneGoal.ScaleToWidth,
                    fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                    fontSize: props.coords.yourPlayerOneGoal.FontSize,
                    selectable: false,
                    fill: props.coords.yourPlayerOneGoal.Fill,
                    className: "yourTeamGoals",
                    originX: props.coords.yourPlayerOneGoal.OriginX,
                    originY: "center",
                  }
                );
                if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                  showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
                }
                fabricRef.current.add(showPlayer);
              }
            } else {
              if (props.id.uid !== "VZtk0ztSsTrfFNtLpvGY") {
                const showPlayer = new fabric.Text(
                  yourTeamGoal ? props.yourTeamGoalMinute[i] + "' " + yourTeamGoal.split(".")[1].toUpperCase() : props.yourTeamGoalMinute[i] + "' ",
                  {
                    top: props.coords.opponentPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                    left: props.coords.opponentPlayerOneGoal.Left,
                    width: props.coords.opponentPlayerOneGoal.ScaleToWidth,
                    fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                    fontSize: props.coords.yourPlayerOneGoal.FontSize,
                    selectable: false,
                    fill: props.coords.yourPlayerOneGoal.Fill,
                    className: "yourTeamGoals",
                    originX: props.coords.opponentPlayerOneGoal.OriginX,
                    originY:"center",
                  }
                );
                if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                  showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
                }
                fabricRef.current.add(showPlayer);
              } else {
                const showPlayer = new fabric.Text(
                  yourTeamGoal ? props.yourTeamGoalMinute[i] + "' " + yourTeamGoal.split(".")[1].toUpperCase() : props.yourTeamGoalMinute[i] + "' ",
                  {
                    top: props.coords.yourPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                    left: props.coords.yourPlayerOneGoal.Left,
                    width: props.coords.yourPlayerOneGoal.ScaleToWidth,
                    fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                    fontSize: props.coords.yourPlayerOneGoal.FontSize,
                    selectable: false,
                    fill: props.coords.yourPlayerOneGoal.Fill,
                    className: "yourTeamGoals",
                    originX: props.coords.yourPlayerOneGoal.OriginX,
                    originY: "center",
                  }
                );
                if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                  showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
                }
                fabricRef.current.add(showPlayer);
                fabricRef.current.renderAll();
              }
            }
          }
        });
      }
    });
  }
  return { yourTeamGoals };
}

import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

export default function opponentGoals(fabricRef, props) {
  if (props.opponentGoal || props.opponentGoalMinute) {
    props.opponentGoal.forEach((opponentGoal, i) => {
      if (opponentGoal || props.opponentGoalMinute[i]) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentGoals") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(props.coords.yourPlayerOneGoal.FontFamily);
        font.load().then(() => {
          if (props.radioChecked === "radio1") {
            if (opponentGoal) {
              const showPlayer = new fabric.Text(
                props.opponentGoalMinute[i] ? props.opponentGoalMinute[i] + "' " + opponentGoal : opponentGoal,
                {
                  top: props.coords.opponentPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                  left: props.coords.opponentPlayerOneGoal.Left,
                  fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                  fontSize: props.coords.yourPlayerOneGoal.FontSize,
                  selectable: false,
                  fill: props.coords.yourPlayerOneGoal.Fill,
                  className: "opponentGoals",
                  originX: props.coords.opponentPlayerOneGoal.OriginX,
                  originY: props.coords.opponentPlayerOneGoal.OriginY,
                }
              );

              if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
              }
              fabricRef.current.add(showPlayer);
            } else {
              const showPlayer = new fabric.Text(
                opponentGoal ? props.opponentGoalMinute[i] + "' " + opponentGoal : props.opponentGoalMinute[i] + "' ",
                {
                  top: props.coords.opponentPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                  left: props.coords.opponentPlayerOneGoal.Left,
                  fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                  fontSize: props.coords.yourPlayerOneGoal.FontSize,
                  selectable: false,
                  fill: props.coords.yourPlayerOneGoal.Fill,
                  className: "opponentGoals",
                  originX: props.coords.opponentPlayerOneGoal.OriginX,
                  originY: props.coords.opponentPlayerOneGoal.OriginY,
                }
              );

              if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
              }
              fabricRef.current.add(showPlayer);
            }
          } else {
            if (opponentGoal) {
              const showPlayer = new fabric.Text(props.opponentGoalMinute[i] + "' " + opponentGoal, {
                top: props.coords.opponentPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                left: props.coords.yourPlayerOneGoal.Left,
                fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                fontSize: props.coords.yourPlayerOneGoal.FontSize,
                selectable: false,
                fill: props.coords.yourPlayerOneGoal.Fill,
                className: "opponentGoals",
                originX: props.coords.yourPlayerOneGoal.OriginX,
                originY: props.coords.opponentPlayerOneGoal.OriginY,
              });
              if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
              }
              fabricRef.current.add(showPlayer);
            } else {
              const showPlayer = new fabric.Text(
                opponentGoal ? props.opponentGoalMinute[i] + "' " + opponentGoal : props.opponentGoalMinute[i] + "' ",
                {
                  top: props.coords.opponentPlayerOneGoal.Top + i * props.coords.yourPlayerOneGoal.Margin,
                  left: props.coords.yourPlayerOneGoal.Left,
                  fontFamily: props.coords.yourPlayerOneGoal.FontFamily,
                  fontSize: props.coords.yourPlayerOneGoal.FontSize,
                  selectable: false,
                  fill: props.coords.yourPlayerOneGoal.Fill,
                  className: "opponentGoals",
                  originX: props.coords.yourPlayerOneGoal.OriginX,
                  originY: props.coords.yourPlayerOneGoal.OriginY,
                }
              );

              if (showPlayer.width > props.coords.yourPlayerOneGoal.ScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.yourPlayerOneGoal.ScaleToWidth);
              }
              fabricRef.current.add(showPlayer);
            }
          }
        });
      }
    });
  }
  return { opponentGoals };
}

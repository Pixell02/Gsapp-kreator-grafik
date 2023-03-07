import React, { useEffect } from "react";
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
        const font = new FontFaceObserver(props.coords.yourPlayerGoalFontFamily);
        font.load().then(() => {
          if (props.radioChecked === "radio1") {
            if (opponentGoal) {
              const showPlayer = new fabric.Text(
                props.opponentGoalMinute[i] ? props.opponentGoalMinute[i] + "' " + opponentGoal : opponentGoal,
                {
                  top: props.coords.opponentPlayerOneGoalTop + i * props.coords.yourPlayerGoalMargin,
                  left: props.coords.opponentPlayerOneGoalLeft,
                  width: props.coords.opponentPlayerOneGoalWidth,
                  fontFamily: props.coords.yourPlayerGoalFontFamily,
                  fontSize: props.coords.yourPlayerGoalFontSize,
                  selectable: false,
                  fill: props.coords.yourPlayerGoalFill,
                  className: "opponentGoals",
                  originX: props.coords.opponentPlayerGoalOriginX,
                  originY: props.coords.opponentPlayerGoalOriginY,
                }
              );

              if (showPlayer.width > props.coords.yourPlayerGoalScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.yourPlayerGoalScaleToWidth);
              }
              fabricRef.current.add(showPlayer);
            } else {
              const showPlayer = new fabric.Text(
                opponentGoal ? props.opponentGoalMinute[i] + "' " + opponentGoal : props.opponentGoalMinute[i] + "' ",
                {
                  top: props.coords.opponentPlayerOneGoalTop + i * props.coords.yourPlayerGoalMargin,
                  left: props.coords.opponentPlayerOneGoalLeft,
                  width: props.coords.opponentPlayerOneGoalWidth,
                  fontFamily: props.coords.yourPlayerGoalFontFamily,
                  fontSize: props.coords.yourPlayerGoalFontSize,
                  selectable: false,
                  fill: props.coords.yourPlayerGoalFill,
                  className: "opponentGoals",
                  originX: props.coords.opponentPlayerGoalOriginX,
                  originY: props.coords.opponentPlayerGoalOriginY,
                }
              );

              if (showPlayer.width > props.coords.yourPlayerGoalScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.yourPlayerGoalScaleToWidth);
              }
              fabricRef.current.add(showPlayer);
            }
          } else {
            const showPlayer = new fabric.Text(opponentGoal, {
              top: props.coords.opponentPlayerOneGoalTop + i * props.coords.yourPlayerGoalMargin,
              left: props.coords.yourPlayerOneGoalLeft,
              width: props.coords.opponentPlayerOneGoalWidth,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoals",
              originX: props.coords.yourPlayerGoalOriginX,
              originY: props.coords.opponentPlayerGoalOriginY,
            });
            if (showPlayer.width > props.coords.yourPlayerGoalScaleToWidth) {
              showPlayer.scaleToWidth(props.coords.yourPlayerGoalScaleToWidth);
            }
            fabricRef.current.add(showPlayer);
          }
        });
      }
    });
  }
  return { opponentGoals };
}

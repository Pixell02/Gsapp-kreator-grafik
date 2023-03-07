import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function usePlayerName(fabricRef, props) {
  const squadPlayer = (props) => {
    if (props.players) {
      
      props.players.forEach((player, i) => {
        if (player) {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "player") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          if (props.goalKeeper === player) {
            player += " (gk)";
          } else if (props.capitan === player) {
            player += " (c)";
          } else {
            player = player;
          }
          const font = new FontFaceObserver(props.coords.playerOneFontFamily);
          font.load().then(() => {
            const showPlayer = new fabric.Text(player, {
              selectable: false,
              top: props.coords.playerOneTop + props.coords.playerOneMargin * i,
              left: props.coords.playerOneLeft,
              originX: props.coords.playerOneOriginX,
              originY: props.coords.playerOneOriginY,
              fontSize: props.coords.playerOneFontSize,
              width: props.coords.playerOneWidth,
              fill: props.coords.playerOneFill,
              className: "player",
              fontFamily: props.coords.playerOneFontFamily,
            });
            if (props.themeOption) {
              if (
                props.themeOption.label.split("-")[0] === "biało" ||
                props.themeOption.label.split("-")[0] === "żółto" ||
                props.themeOption.label === "biały"
              ) {
                showPlayer.set({
                  fill: "black",
                });
              }
              if (
                props.id.theme === "motyw 2" &&
                props.themeOption.label === "żółto-czarny"
              ) {
                showPlayer.set({
                  fill: "white",
                });
              }
              if (
                props.id.theme === "motyw 3" &&
                props.themeOption.label === "czarno-biały"
              ) {
                showPlayer.set({
                  fill: "black",
                });
              }
              if (props.id.theme === "motyw 3" && props.themeOption.label === "zielony") {
                showPlayer.set({
                  fill: "black",
                });
              }
              if (
                props.id.theme === "motyw 5" &&
                props.themeOption.label === "biało-niebieski"
              ) {
                showPlayer.set({ fill: "white" });
              }
              if (
                props.id.theme === "motyw 5" &&
                props.themeOption.label === "żółto-czarny"
              ) {
                showPlayer.set({ fill: "white" });
              }
            }
            if (props.coords.playerOneLeft) {
              showPlayer.set({
                left: props.coords.playerOneLeft,
              });
            } else {
              showPlayer.set({
                left: props.coords.playerOneWidth / 2,
              });
            }
            if (props.coords.playersScaleToWidth) {
              if (showPlayer.width >= props.coords.playersScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.playersScaleToWidth);
              }
            }
            fabricRef.current.add(showPlayer);
          });
        }
      });
    }
  };
  return { squadPlayer };
}

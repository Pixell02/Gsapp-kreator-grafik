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
          let formatPlayer;
          
          if (props.coords.playerOne.format === "NumDotSurName") {
            formatPlayer = player.split(".")[0] + "." + player.split(".")[2];
          } else if (props.coords.playerOne.format === "NumSurName") {
            formatPlayer = player.split(".")[0] + " " + player.split(".")[2];
            
          } else if (props.coords.playerOne.format === "dotted") {
            formatPlayer = player.split(".")[0] + "." + player.split(".")[1][0] + "." + player.split(".")[2]; 
          } else if (props.coords.playerOne.format === "oneDot") {
            formatPlayer = player.split(".")[0] + " " + player.split(".")[1][0] + "." + player.split(".")[2];
          } else {
            formatPlayer = player.split(".")[2]
          }
          
          if (props.goalKeeper === player) {
            formatPlayer += " (gk)";
          } else if (props.capitan === player) {
            formatPlayer += " (c)";
          } else {
            formatPlayer = formatPlayer;
          }
          
          
          if (props.coords.playerOne.textType === "upper") {
            formatPlayer = formatPlayer.toUpperCase();
          }
          const font = new FontFaceObserver(props.coords.playerOne.FontFamily);
          font.load().then(() => {
            const showPlayer = new fabric.Text(formatPlayer, {
              selectable: false,
              top: props.coords.playerOne.Top + props.coords.playerOne.Margin * i,
              left: props.coords.playerOne.Left,
              originX: props.coords.playerOne.OriginX,
              originY: "center",
              fontSize: props.coords.playerOne.FontSize,
              fill: props.coords.playerOne.Fill,
              className: "player",
              fontFamily: props.coords.playerOne.FontFamily,
            });
            if (props.coords.playerOne.CharSpacing) {
              showPlayer.set({
                charSpacing: props.coords.playerOne.CharSpacing
              })
            }
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
            if (props.coords.playerOne.Left) {
              showPlayer.set({
                left: props.coords.playerOne.Left,
              });
            } else {
              showPlayer.set({
                left: props.coords.playerOne.Width / 2,
              });
            }
            
              if (showPlayer.width >= props.coords.playerOne.ScaleToWidth) {
                showPlayer.scaleToWidth(props.coords.playerOne.ScaleToWidth);
              }
            
            fabricRef.current.add(showPlayer);
          });
        }
      });
    }
  };
  return { squadPlayer };
}

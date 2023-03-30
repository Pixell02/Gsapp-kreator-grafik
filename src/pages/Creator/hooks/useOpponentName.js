import React from 'react'
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

export default function useOpponentName(fabricRef) {
    
  const opponentsName = (props, poster) => {
      
        if (props.opponentName && (props.coords.opponentFirstName || props.coords.opponentName)) {
          if (props.radioChecked === "radio1") {
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "opponentsFirstName") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "opponentsSecondName") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "opponentsName") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
            if (props.coords.opponentFirstName) {
              const opponentFirstName = props.opponentName.split(" ")[0];
    
              const opponentSecondName = props.opponentName.split(" ")[1];
              const font = new FontFaceObserver(
                props.coords.opponentFirstName.FontFamily
              );
              font.load().then(() => {
                const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
                  selectable: false,
                  top: props.coords.opponentFirstName.Top,
                  left: props.coords.opponentFirstName.Left,
                  originY: props.coords.opponentFirstName.OriginY,
                  originX: props.coords.opponentFirstName.OriginX,
                  fontSize: props.coords.opponentFirstName.FontSize,
                  fill: props.coords.opponentFirstName.Fill,
                  className: "opponentsFirstName",
                  fontFamily: props.coords.opponentFirstName.FontFamily,
                });
                               
                if (firstName.width > props.coords.opponentFirstName.ScaleToWidth) {
                  firstName.scaleToWidth(
                    props.coords.opponentFirstName.ScaleToWidth
                  );
                }
                if (props.themeOption) {
                  if (
                    props.themeOption.label.split("-")[0] === "biało" ||
                    props.themeOption.label.split("-")[0] === "żółto" ||
                    props.themeOption.label === "biały"
                  ) {
                    firstName.set({
                      fill: "black",
                    });
                  }
                }
                fabricRef.current.add(firstName);
              });
              if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
              const fontTwo = new FontFaceObserver(
                props.coords.opponentSecondName.FontFamily
              );
              fontTwo.load().then(() => {
                
                  const secondName = new fabric.Text(
                    opponentSecondName.toUpperCase(),
                    {
                      selectable: false,
                      top: props.coords.opponentSecondName.Top,
                      left: props.coords.opponentSecondName.Left,
                      originY: props.coords.opponentSecondName.OriginY,
                      originX: props.coords.opponentSecondName.OriginX,
                      fontSize: props.coords.opponentSecondName.FontSize,
                      fill: props.coords.opponentSecondName.Fill,
                      className: "opponentsSecondName",
                      fontFamily: props.coords.opponentSecondName.FontFamily,
                    }
                  );
    
                 
                  if (secondName.width > props.coords.opponentSecondName.ScaleToWidth) {
                    secondName.scaleToWidth(
                      props.coords.opponentSecondName.ScaleToWidth
                    );
                  }
                  if (props.themeOption) {
                    if (
                      props.themeOption.label.split("-")[0] === "biało" ||
                      props.themeOption.label.split("-")[0] === "żółto" ||
                      props.themeOption.label === "biały"
                    ) {
                      secondName.set({
                        fill: "black",
                      });
                    }
                  }
    
                fabricRef.current.add(secondName);
                fabricRef.current.renderAll();
                }
             ); }
            } else {
              const fontOpponent = new FontFaceObserver(
                props.coords.opponentName.FontFamily
              );
              fontOpponent.load().then(() => {
                if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
                  const opponentsName = new fabric.Text(
                    props.opponentName.toUpperCase(),
                    {
                      selectable: false,
                      top: props.coords.opponentName.Top,
                      left: props.coords.opponentName.Left,
                      originY: props.coords.opponentName.OriginY,
                      originX: props.coords.opponentName.OriginX,
                      fontSize: props.coords.opponentName.FontSize,
                      fill: props.coords.opponentName.Fill,
                      className: "opponentsName",
                      fontFamily: props.coords.opponentName.FontFamily,
                    }
                  );
                  if (opponentsName.width > props.coords.opponentName.ScaleToWidth) {
                    opponentsName.scaleToWidth(
                      props.coords.opponentName.ScaleToWidth
                    );
                  }
                  if (props.themeOption) {
                    if (
                      props.themeOption.label.split("-")[0] === "biało" ||
                      props.themeOption.label.split("-")[0] === "żółto" ||
                      props.themeOption.label === "biały"
                    ) {
                      opponentsName.set({
                        fill: "black",
                      });
                    }
                    if (
                      poster === "FkbRjeu4p2PvRryL8byB" ||
                      poster === "PmoRESwg91LxFAGFObbZ" ||
                      props.themeOption.label === "żółto-czarny"
                    ) {
                      opponentsName.set({
                        fill: "white",
                      });
                    }
                    if (
                      props.id.theme === "motyw 5" &&
                      (props.themeOption.label === "żółto-czarny" ||
                        props.themeOption.label === "biało-niebieski")
                    ) {
                      opponentsName.set({
                        fill: "white",
                      });
                    }
                  }
    
                  fabricRef.current.add(opponentsName);
                  fabricRef.current.renderAll();
                }
              });
            }
          } else if (props.radioChecked === "radio2") {
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "opponentsFirstName") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "opponentsSecondName") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "opponentsName") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
            if (props.coords.opponentFirstName) {
              const opponentFirstName = props.opponentName.split(" ")[0];
    
              const opponentSecondName = props.opponentName.split(" ")[1];
    
              const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
                selectable: false,
                top: props.coords.yourTeamFirstName.Top,
                left: props.coords.yourTeamFirstName.Left,
                originY: props.coords.yourTeamFirstName.OriginY,
                originX: props.coords.yourTeamFirstName.OriginX,
                fontSize: props.coords.yourTeamFirstName.FontSize,
                fill: props.coords.yourTeamFirstName.Fill,
                className: "opponentsFirstName",
                fontFamily: props.coords.yourTeamFirstName.FontFamily,
              });
    
              
              if (firstName.width > props.coords.yourTeamFirstName.ScaleToWidth) {
                firstName.scaleToWidth(props.coords.yourTeamFirstName.ScaleToWidth);
              }
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  firstName.set({
                    fill: "black",
                  });
                }
              }
              fabricRef.current.add(firstName);
              fabricRef.current.renderAll();
              if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
                const fontTwo = new FontFaceObserver(
                  props.coords.yourTeamSecondName.FontFamily
                );
    
                fontTwo.load().then(() => {
                  const secondName = new fabric.Text(
                    opponentSecondName.toUpperCase(),
                    {
                      selectable: false,
                      top: props.coords.yourTeamSecondName.Top,
                      left: props.coords.yourTeamSecondName.Left,
                      originY: props.coords.yourTeamSecondName.OriginY,
                      originX: props.coords.yourTeamSecondName.OriginX,
                      fontSize: props.coords.yourTeamSecondName.FontSize,
                      fill: props.coords.yourTeamSecondName.Fill,
                      className: "opponentsSecondName",
                      fontFamily: props.coords.yourTeamSecondName.FontFamily,
                    }
                  );
    
                  if (secondName.width > props.coords.yourTeamSecondName.ScaleToWidth) {
                    secondName.scaleToWidth(
                      props.coords.yourTeamSecondName.ScaleToWidth
                    );
                  }
                  if (props.themeOption) {
                    if (
                      props.themeOption.label.split("-")[0] === "biało" ||
                      props.themeOption.label.split("-")[0] === "żółto" ||
                      props.themeOption.label === "biały"
                    ) {
                      secondName.set({
                        fill: "black",
                      });
                    }
                  }
    
                  fabricRef.current.add(secondName);
                });
              }
            } else {
              const fontOpponent = new FontFaceObserver(
                props.coords.opponentName.FontFamily
              );
    
              fontOpponent.load().then(() => {
                const opponentsName = new fabric.Text(
                  props.opponentName.toUpperCase(),
                  {
                    selectable: false,
                    top: props.coords.yourTeamName.Top,
                    left: props.coords.yourTeamName.Left,
                    originY: props.coords.yourTeamName.OriginY,
                    originX: props.coords.yourTeamName.OriginX,
                    fontSize: props.coords.yourTeamName.FontSize,
                    fill: props.coords.yourTeamName.Fill,
                    className: "opponentsName",
                    fontFamily: props.coords.yourTeamName.FontFamily,
                  }
                );
    
                if (opponentsName.width > props.coords.yourTeamName.ScaleToWidth) {
                  opponentsName.scaleToWidth(props.coords.yourTeamName.ScaleToWidth);
                }
                if (props.themeOption) {
                  if (
                    props.themeOption.label.split("-")[0] === "biało" ||
                    props.themeOption.label.split("-")[0] === "żółto" ||
                    props.themeOption.label === "biały"
                  ) {
                    opponentsName.set({
                      fill: "black",
                    });
                  }
                  if (
                    props.id.theme === "motyw 2" &&
                    props.themeOption.label === "żółto-czarny"
                  ) {
                    opponentsName.set({
                      fill: "white",
                    });
                  }
                  if (
                    props.id.theme === "motyw 5" &&
                    (props.themeOption.label === "żółto-czarny" ||
                      props.themeOption.label === "biało-niebieski")
                  ) {
                    opponentsName.set({
                      fill: "white",
                    });
                  }
                }
    
                fabricRef.current.add(opponentsName);
                fabricRef.current.renderAll();
              });
            }
          }
        }
      };
  const opponentLogo = (props) => {
        
        if (props.opponent) {
          if (props.radioChecked === "radio1") {
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "opponentImage") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
            const opponentImg = new Image();
            opponentImg.src = props.opponent;
            opponentImg.onload = () => {
              fabric.Image.fromURL(opponentImg.src, function (img) {
                
                img.set({
                  selectable: false,
                  top: parseInt(props.coords.opponentImage.Top),
                  left: parseInt(props.coords.opponentImage.Left),
                  className: "opponentImage",
                  originX: "center",
                  originY: "center",
                });
                
                img.scaleToHeight(parseInt(props.coords.opponentImage.ScaleToHeight));
                
                if(img.width * img.ScaleX > props.coords.opponentImage.ScaleToWidth) {
                  img.scaleToWidth(props.coords.opponentImage.ScaleToWidth);
                }
                fabricRef.current.add(img);
                fabricRef.current.renderAll();
              });
            };
          } else {
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "opponentImage") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
            const opponentImg = new Image();
            opponentImg.src = props.opponent;
            opponentImg.onload = () => {
              fabric.Image.fromURL(opponentImg.src, function (img) {
                img.set({
                  selectable: false,
                  top: props.coords.yourTeamLogo.Top,
                  left: props.coords.yourTeamLogo.Left,
                  className: "opponentImage",
                  originX: "center",
                  originY: "center",
                });
    
                img.scaleToHeight(props.coords.yourTeamLogo.ScaleToHeight);
                if(img.width * img.ScaleX > props.coords.yourTeamLogo.ScaleToWidth) {
                  img.scaleToWidth(props.coords.yourTeamLogo.ScaleToWidth);
                }
                fabricRef.current.add(img);
                fabricRef.current.renderAll();
              });
            };
          }
        }
      };

    return{opponentsName, opponentLogo} 
}

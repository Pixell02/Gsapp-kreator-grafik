import React from 'react'
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

export default function useOpponentName(fabricRef) {
    
    const opponentsName = (props, poster) => {
        if (props.opponentName) {
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
            if (props.coords.opponentFirstNameFontFamily) {
              const opponentFirstName = props.opponentName.split(" ")[0];
    
              const opponentSecondName = props.opponentName.split(" ")[1];
              const font = new FontFaceObserver(
                props.coords.opponentFirstNameFontFamily
              );
              font.load().then(() => {
                const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
                  selectable: false,
                  top: props.coords.opponentFirstNameTop,
                  left: props.coords.opponentFirstNameLeft,
                  originY: props.coords.opponentFirstNameOriginY,
                  originX: props.coords.opponentFirstNameOriginX,
                  fontSize: props.coords.opponentFirstNameFontSize,
                  width: props.coords.opponentFirstNameWidth,
                  fill: props.coords.opponentFirstNameFill,
                  className: "opponentsFirstName",
                  fontFamily: props.coords.opponentFirstNameFontFamily,
                });
                if (props.coords.opponentFirstNameScaleToWidth) {
                  firstName.scaleToWidth(
                    props.coords.opponentFirstNameScaleToWidth
                  );
                }
                if (props.coords.opponentFirstNameScaleToHeight) {
                  firstName.scaleToHeight(
                    props.coords.opponentFirstNameScaleToHeight
                  );
                }
                if (firstName.width > props.coords.opponentFirstNameWidth) {
                  firstName.scaleToWidth(
                    props.coords.opponentFirstNameScaleToWidth
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
              const fontTwo = new FontFaceObserver(
                props.coords.opponentSecondNameFontFamily
              );
              fontTwo.load().then(() => {
                if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
                  const secondName = new fabric.Text(
                    opponentSecondName.toUpperCase(),
                    {
                      selectable: false,
                      top: props.coords.opponentSecondNameTop,
                      left: props.coords.opponentSecondNameLeft,
                      originY: props.coords.opponentSecondNameOriginY,
                      originX: props.coords.opponentSecondNameOriginX,
                      fontSize: props.coords.opponentSecondNameFontSize,
                      width: props.coords.opponentSecondNameWidth,
                      fill: props.coords.opponentSecondNameFill,
                      className: "opponentsSecondName",
                      fontFamily: props.coords.opponentSecondNameFontFamily,
                    }
                  );
    
                  secondName.scaleToHeight(
                    props.coords.opponentSecondNameScaleToHeight
                  );
                  if (secondName.width > props.coords.opponentSecondNameWidth) {
                    secondName.scaleToWidth(
                      props.coords.opponentSecondNameScaleToWidth
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
                }
              });
            } else {
              const fontOpponent = new FontFaceObserver(
                props.coords.opponentNameFontFamily
              );
    
              fontOpponent.load().then(() => {
                if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
                  const opponentsName = new fabric.Text(
                    props.opponentName.toUpperCase(),
                    {
                      selectable: false,
                      top: props.coords.opponentNameTop,
                      left: props.coords.opponentNameLeft,
                      originY: props.coords.opponentNameOriginY,
                      originX: props.coords.opponentNameOriginX,
                      fontSize: props.coords.opponentNameFontSize,
                      width: props.coords.opponentNameWidth,
                      fill: props.coords.opponentNameFill,
                      className: "opponentsName",
                      fontFamily: props.coords.opponentNameFontFamily,
                    }
                  );
                  if (opponentsName.width > props.coords.opponentNameScaleToWidth) {
                    opponentsName.scaleToWidth(
                      props.coords.opponentNameScaleToWidth
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
            if (props.coords.opponentFirstNameFontFamily) {
              const opponentFirstName = props.opponentName.split(" ")[0];
    
              const opponentSecondName = props.opponentName.split(" ")[1];
    
              const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
                selectable: false,
                top: props.coords.yourTeamFirstNameTop,
                left: props.coords.yourTeamFirstNameLeft,
                originY: props.coords.yourTeamFirstNameOriginY,
                originX: props.coords.yourTeamFirstNameOriginX,
                fontSize: props.coords.yourTeamFirstNameFontSize,
                width: props.coords.yourTeamFirstNameWidth,
                fill: props.coords.yourTeamFirstNameFill,
                className: "opponentsFirstName",
                fontFamily: props.coords.yourTeamFirstNameFontFamily,
              });
    
              if (props.coords.yourTeamFirstNameScaleToWidth) {
                firstName.scaleToWidth(props.coords.yourTeamFirstNameScaleToWidth);
              }
              if (props.coords.yourTeamFirstNameScaleToHeight) {
                firstName.scaleToHeight(
                  props.coords.yourTeamFirstNameScaleToHeight
                );
              }
              if (firstName.width > props.coords.yourTeamFirstNameWidth) {
                firstName.scaleToWidth(props.coords.yourTeamFirstNameScaleToWidth);
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
    
              if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
                const fontTwo = new FontFaceObserver(
                  props.coords.yourTeamSecondNameFontFamily
                );
    
                fontTwo.load().then(() => {
                  const secondName = new fabric.Text(
                    opponentSecondName.toUpperCase(),
                    {
                      selectable: false,
                      top: props.coords.yourTeamSecondNameTop,
                      left: props.coords.yourTeamSecondNameLeft,
                      originY: props.coords.yourTeamSecondNameOriginY,
                      originX: props.coords.yourTeamSecondNameOriginX,
                      fontSize: props.coords.yourTeamSecondNameFontSize,
                      width: props.coords.yourTeamSecondNameWidth,
                      fill: props.coords.yourTeamSecondNameFill,
                      className: "opponentsSecondName",
                      fontFamily: props.coords.yourTeamSecondNameFontFamily,
                    }
                  );
    
                  secondName.scaleToHeight(
                    props.coords.yourTeamSecondNameScaleToHeight
                  );
                  if (secondName.width > props.coords.yourTeamSecondNameWidth) {
                    secondName.scaleToWidth(
                      props.coords.yourTeamSecondNameScaleToWidth
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
                props.coords.opponentNameFontFamily
              );
    
              fontOpponent.load().then(() => {
                const opponentsName = new fabric.Text(
                  props.opponentName.toUpperCase(),
                  {
                    selectable: false,
                    top: props.coords.yourTeamNameTop,
                    left: props.coords.yourTeamNameLeft,
                    originY: props.coords.yourTeamNameOriginY,
                    originX: props.coords.yourTeamNameOriginX,
                    fontSize: props.coords.yourTeamNameFontSize,
                    width: props.coords.yourTeamNameWidth,
                    fill: props.coords.yourTeamNameFill,
                    className: "opponentsName",
                    fontFamily: props.coords.yourTeamNameFontFamily,
                  }
                );
    
                if (opponentsName.width > props.coords.opponentNameScaleToWidth) {
                  opponentsName.scaleToWidth(props.coords.opponentNameScaleToWidth);
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
                  top: props.coords.opponentImageTop,
                  left: props.coords.opponentImageLeft,
                  className: "opponentImage",
                  originX: "center",
                  originY: "center",
                });
    
                img.scaleToHeight(props.coords.opponentImageScaleToHeight);
                // if(img.width > props.coords.opponentImageScaleToHeight) {
                //   img.scaleToWidth(props.coords.opponentImageScaleToWidth);
                // }
                fabricRef.current.add(img);
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
                  top: props.coords.yourTeamLogoTop,
                  left: props.coords.yourTeamLogoLeft,
                  className: "opponentImage",
                  originX: "center",
                  originY: "center",
                });
    
                img.scaleToHeight(props.coords.yourTeamLogoScaleToHeight);
    
                fabricRef.current.add(img);
              });
            };
          }
        }
      };

    return{opponentsName, opponentLogo} 
}

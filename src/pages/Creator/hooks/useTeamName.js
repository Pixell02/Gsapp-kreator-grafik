import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function useTeamName(fabricRef, props) {
  const teamLogo = () => {
    if (props.yourTeamImage && props.coords.yourTeamLogoTop) {
      if (props.radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "teamLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const secondImg = new Image();
        secondImg.src = props.yourTeamImage;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function (img) {
            img.set({
              selectable: false,
              top: props.coords.yourTeamLogoTop,
              left: props.coords.yourTeamLogoLeft,
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(props.coords.yourTeamLogoScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        };
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "teamLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const secondImg = new Image();
        secondImg.src = props.yourTeamImage;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function (img) {
            img.set({
              selectable: false,
              top: props.coords.opponentImageTop,
              left: props.coords.opponentImageLeft,
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(props.coords.opponentImageScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        };
      }
    }
  };
  const secondTeamLogo = (yourTeamLogo) => {
    if (yourTeamLogo[0].img && props.coords.yourTeamSecondLogoTop) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "teamSecondLogo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const secondImg = new Image();
      secondImg.src = yourTeamLogo[0].img;
      secondImg.onload = () => {
        fabric.Image.fromURL(secondImg.src, function (img) {
          img.set({
            selectable: false,
            top: props.coords.yourTeamSecondLogoTop,
            left: props.coords.yourTeamSecondLogoLeft,
            originX: "center",
            originY: "center",
            className: "teamSecondLogo",
          });
          img.scaleToHeight(props.coords.yourTeamSecondLogoScaleToHeight);
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        });
      };
    }
  };
  const teamName = (yourTeamLogo, poster) => {
   
    if (yourTeamLogo[0].firstName) {
      if (
        props.coords.yourTeamFirstNameTop ||
        props.coords.yourTeamNameTop ||
        props.coords.yourTeamSecondNameTop
      ) {
         fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourFirstName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourSecondName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
        if (props.radioChecked === "radio1") {
         
          let yourTeamName;
          if (poster === "23b5ff36a490e8f93breae34") {
            yourTeamName = yourTeamLogo[0].firstName;
          } else if (poster === "PmoRESwg91LxFAGFObbZ") {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          } else {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          }
          if (props.coords.yourTeamFirstNameFontFamily) {
            const firstTeamName = yourTeamLogo[0].firstName.toUpperCase();

            const secondTeamName = yourTeamLogo[0].secondName.toUpperCase();
            const firstFont = new FontFaceObserver(
              props.coords.yourTeamFirstNameFontFamily
            );
            firstFont.load().then(() => {
              const firstName = new fabric.Text(firstTeamName, {
                selectable: false,
                top: props.coords.yourTeamFirstNameTop,
                left: props.coords.yourTeamFirstNameLeft,
                width: props.coords.yourTeamFirstNameWidth,
                fill: props.coords.yourTeamFirstNameFill,
                fontFamily: props.coords.yourTeamFirstNameFontFamily,
                originX: props.coords.yourTeamFirstNameOriginX,
                originY: props.coords.yourTeamFirstNameOriginY,
                className: "yourFirstName",
              });
              if (props.coords.yourTeamFirstNameScaleToWidth) {
                firstName.scaleToWidth(
                  props.coords.yourTeamFirstNameScaleToWidth
                );
              }
              if (props.coords.yourTeamFirstNameScaleToHeight) {
                firstName.scaleToHeight(
                  props.coords.yourTeamFirstNameScaleToHeight
                );
              }
              if (firstName.width > props.coords.yourTeamFirstNameWidth) {
                firstName.scaleToWidth(
                  props.coords.yourTeamFirstNameScaleToWidth
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
              const secondFont = new FontFaceObserver(
                props.coords.yourTeamSecondNameFontFamily
              );
              secondFont.load().then(() => {
                const secondName = new fabric.Text(secondTeamName, {
                  selectable: false,
                  originX: props.coords.yourTeamSecondNameOriginX,
                  originY: props.coords.yourTeamSecondNameOriginY,
                  top: props.coords.yourTeamSecondNameTop,
                  width: props.coords.yourTeamSecondNameWidth,
                  left: props.coords.yourTeamSecondNameLeft,
                  fill: props.coords.yourTeamSecondNameFill,
                  fontFamily: props.coords.yourTeamSecondNameFontFamily,
                  className: "yourSecondName",
                });
                if (props.coords.yourTeamSecondNameScaleToHeight) {
                  secondName.scaleToHeight(
                    props.coords.yourTeamSecondNameScaleToHeight
                  );
                }
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
            const font = new FontFaceObserver(
              props.coords.yourTeamNameFontFamily
            );
            font.load().then(() => {
              const name = new fabric.Text(yourTeamName.toUpperCase(), {
                selectable: false,
                originX: props.coords.yourTeamNameOriginX,
                originY: props.coords.yourTeamNameOriginY,
                top: props.coords.yourTeamNameTop,
                left: props.coords.yourTeamNameLeft,
                fill: props.coords.yourTeamNameFill,
                fontFamily: props.coords.yourTeamNameFontFamily,
                className: "yourName",
              });
              if (props.coords.yourTeamNameCharSpacing) {
                name.charSpacing = props.coords.yourTeamNameCharSpacing;
              }
              if (props.coords.yourTeamNameWidth) {
                name.width = props.coords.yourTeamNameWidth;
              }

              name.scaleToWidth(props.coords.yourTeamNameScaleToWidth);
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  name.set({
                    fill: "black",
                  });
                }
                if (
                  poster === "FkbRjeu4p2PvRryL8byB" ||
                  poster === "PmoRESwg91LxFAGFObbZ" ||
                  props.themeOption.label === "żółto-czarny"
                ) {
                  name.set({
                    fill: "white",
                  });
                }
                if (
                  props.id.theme === "motyw 5" &&
                  (props.themeOption.label === "żółto-czarny" ||
                    props.themeOption.label === "biało-niebieski")
                ) {
                  name.set({
                    fill: "white",
                  });
                }
              }
              fabricRef.current.add(name);
            });
          }
        } else if (props.radioChecked === "radio2") {
      
          let yourTeamName;
          if (poster === "23b5ff36a490e8f93breae34") {
            yourTeamName = yourTeamLogo[0].firstName;
          } else if (poster === "PmoRESwg91LxFAGFObbZ") {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          } else {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          }
          if (props.coords.yourTeamFirstNameFontFamily) {
            const firstTeamName = yourTeamLogo[0].firstName.toUpperCase();

            const secondTeamName = yourTeamLogo[0].secondName.toUpperCase();
            const font = new FontFaceObserver(
              props.coords.yourTeamFirstNameFontFamily
            );
            font.load().then(() => {
              const firstName = new fabric.Text(firstTeamName, {
                selectable: false,
                originX: props.coords.opponentFirstNameOriginX,
                originY: props.coords.opponentFirstNameOriginY,
                top: props.coords.opponentFirstNameTop,
                left: props.coords.opponentFirstNameLeft,
                width: props.coords.opponentFirstNameWidth,
                fill: props.coords.opponentFirstNameFill,
                fontFamily: props.coords.opponentFirstNameFontFamily,
                className: "yourFirstName",
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
            const secondFont = new FontFaceObserver(
              props.coords.yourTeamSecondNameFontFamily
            );
            secondFont.load().then(() => {
              const secondName = new fabric.Text(secondTeamName, {
                selectable: false,
                originX: props.coords.opponentSecondNameOriginX,
                originY: props.coords.opponentSecondNameOriginY,
                top: props.coords.opponentSecondNameTop,
                width: props.coords.opponentSecondNameWidth,
                left: props.coords.opponentSecondNameLeft,
                fill: props.coords.opponentSecondNameFill,
                fontFamily: props.coords.opponentSecondNameFontFamily,
                className: "yourSecondName",
              });
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
            });
          } else {
            const font = new FontFaceObserver(
              props.coords.yourTeamNameFontFamily
            );
            font.load().then(() => {
              const name = new fabric.Text(yourTeamName, {
                selectable: false,
                originX: props.coords.opponentNameOriginX,
                originY: props.coords.opponentNameOriginY,
                top: props.coords.opponentNameTop,
                left: props.coords.opponentNameLeft,
                fill: props.coords.opponentNameFill,
                fontFamily: props.coords.opponentNameFontFamily,
                className: "yourName",
              });
              if (props.coords.yourTeamNameCharSpacing) {
                name.charSpacing = props.coords.yourTeamNameCharSpacing;
              }
              if (props.coords.yourTeamNameWidth) {
                name.width = props.coords.yourTeamNameWidth;
              }

              name.scaleToWidth(props.coords.yourTeamNameScaleToWidth);
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  name.set({
                    fill: "black",
                  });
                }
                if (
                  poster === "FkbRjeu4p2PvRryL8byB" ||
                  props.themeOption.label === "żółto-czarny"
                ) {
                  name.set({
                    fill: "white",
                  });
                }
                if (
                  props.id.theme === "motyw 5" &&
                  (props.themeOption.label === "żółto-czarny" ||
                    props.themeOption.label === "biało-niebieski")
                ) {
                  name.set({
                    fill: "white",
                  });
                }
              }
              fabricRef.current.add(name);
            });
          }
        }
      }
    }
  };

  return { teamLogo, secondTeamLogo, teamName };
}

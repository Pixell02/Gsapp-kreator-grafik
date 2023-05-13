import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function useTeamName(fabricRef, props) {
  const teamLogo = () => {
    if (props.yourTeamImage && props.coords.yourTeamLogo) {
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
              top: parseInt(props.coords.yourTeamLogo.Top),
              left: parseInt(props.coords.yourTeamLogo.Left),
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(props.coords.yourTeamLogo.ScaleToHeight);

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
              top: parseInt(props.coords.opponentImage.Top),
              left: parseInt(props.coords.opponentImage.Left),
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(parseInt(props.coords.opponentImage.ScaleToHeight));
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        };
      }
    }
  };
  const secondTeamLogo = (yourTeamLogo) => {
    if (yourTeamLogo && props.coords.yourTeamSecondLogoTop) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "teamSecondLogo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const secondImg = new Image();
      secondImg.src = yourTeamLogo;
      secondImg.onload = () => {
        fabric.Image.fromURL(secondImg.src, function (img) {
          img.set({
            selectable: false,
            top: parseInt(props.coords.yourTeamSecondLogo.Top),
            left: parseInt(props.coords.yourTeamSecondLogo.Left),
            originX: "center",
            originY: "center",
            className: "teamSecondLogo",
          });
          img.scaleToHeight(parseInt(props.coords.yourTeamSecondLogo.ScaleToHeight));
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        });
      };
    }
  };
  const teamName = (yourTeamLogo, poster) => {
    if (yourTeamLogo) {
      if (props.coords.yourTeamFirstName || props.coords.yourTeamName || props.coords.yourTeamSecondName) {
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
            yourTeamName = yourTeamLogo.split(".")[0];
          } else if (poster === "PmoRESwg91LxFAGFObbZ") {
            yourTeamName = yourTeamLogo.split(".")[0].toUpperCase() + " " + yourTeamLogo.split(".")[1].toUpperCase();
          } else {
            yourTeamName = yourTeamLogo.split(".")[0].toUpperCase() + " " + yourTeamLogo.split(".")[1].toUpperCase();
          }
          if (props.coords.yourTeamFirstName) {
            const firstTeamName = yourTeamLogo.split(".")[0].toUpperCase();
            const firstFont = new FontFaceObserver(props.coords.yourTeamFirstName.FontFamily);
            firstFont.load().then(() => {
              const firstName = new fabric.Text(firstTeamName, {
                selectable: false,
                top: props.coords.yourTeamFirstName.Top,
                left: props.coords.yourTeamFirstName.Left,
                fill: props.coords.yourTeamFirstName.Fill,
                fontFamily: props.coords.yourTeamFirstName.FontFamily,
                fontSize: props.coords.yourTeamFirstName.FontSize,
                originX: props.coords.yourTeamFirstName.OriginX,
                originY: props.coords.yourTeamFirstName.OriginY,
                className: "yourFirstName",
              });

              if (firstName.width > props.coords.yourTeamFirstName.ScaleToWidth) {
                firstName.scaleToWidth(props.coords.yourTeamFirstName.ScaleToWidth);
              }
              if (props.coords.yourTeamFirstName.FontStyle) {
                firstName.set({
                  fontStyle: props.coords.yourTeamFirstName.FontStyle,
                });
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
            });
            if (props.coords.yourTeamSecondName) {
              const secondTeamName = yourTeamLogo.split(".")[1].toUpperCase();
              const secondFont = new FontFaceObserver(props.coords.yourTeamSecondName.FontFamily);
              secondFont.load().then(() => {
                const secondName = new fabric.Text(secondTeamName, {
                  selectable: false,
                  originX: props.coords.yourTeamSecondName.OriginX,
                  originY: props.coords.yourTeamSecondName.OriginY,
                  top: props.coords.yourTeamSecondName.Top,
                  left: props.coords.yourTeamSecondName.Left,
                  fill: props.coords.yourTeamSecondName.Fill,
                  fontSize: props.coords.yourTeamSecondName.FontSize,
                  fontFamily: props.coords.yourTeamSecondName.FontFamily,
                  className: "yourSecondName",
                });

                if (secondName.width > props.coords.yourTeamSecondName.ScaleToWidth) {
                  secondName.scaleToWidth(props.coords.yourTeamSecondName.ScaleToWidth);
                }
                if (props.coords.yourTeamFirstName.FontStyle) {
                  secondName.set({
                    fontStyle: props.coords.yourTeamFirstName.FontStyle,
                  });
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
              });
            }
          } else {
            const font = new FontFaceObserver(props.coords.yourTeamName.FontFamily);
            font.load().then(() => {
              const name = new fabric.Text(yourTeamName.toUpperCase(), {
                selectable: false,
                originX: props.coords.yourTeamName.OriginX,
                originY: props.coords.yourTeamName.OriginY,
                top: props.coords.yourTeamName.Top,
                left: props.coords.yourTeamName.Left,
                fill: props.coords.yourTeamName.Fill,
                fontSize: props.coords.yourTeamName.FontSize,
                fontFamily: props.coords.yourTeamName.FontFamily,
                className: "yourName",
              });
              if (props.coords.yourTeamName.CharSpacing) {
                name.charSpacing = props.coords.yourTeamName.CharSpacing;
              }
              if (props.coords.yourTeamName.FontStyle) {
                name.set({
                  fontStyle: props.coords.yourTeamName.FontStyle,
                });
              }
              if (name.width > props.coords.yourTeamName.ScaleToWidth) {
                name.scaleToWidth(props.coords.yourTeamName.ScaleToWidth);
              }
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
                  (props.themeOption.label === "żółto-czarny" || props.themeOption.label === "biało-niebieski")
                ) {
                  name.set({
                    fill: "white",
                  });
                }
              }

              fabricRef.current.add(name);
              fabricRef.current.renderAll();
            });
          }
        } else if (props.radioChecked === "radio2") {
          let yourTeamName;
          yourTeamName = yourTeamLogo.split(".")[0].toUpperCase() + " " + yourTeamLogo.split(".")[1].toUpperCase();
          if (props.coords.yourTeamFirstName) {
            const firstTeamName = yourTeamLogo.split(".")[0].toUpperCase();

            const font = new FontFaceObserver(props.coords.yourTeamFirstName.FontFamily);

            font.load().then(() => {
              const firstName = new fabric.Text(firstTeamName, {
                selectable: false,
                originX: props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.OriginX
                  : props.coords.opponentName.OriginX,
                originY: props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.OriginY
                  : props.coords.opponentName.OriginY,
                top: props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.Top
                  : props.coords.yourTeamFirstName.Top2,
                left: props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.Left
                  : props.coords.yourTeamFirstName.Left,
                fill: props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.Fill
                  : props.coords.opponentName.Fill,
                fontFamily: props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.FontFamily
                  : props.coords.opponentName.FontFamily,
                fontSize: props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.FontSize
                  : props.coords.yourTeamFirstName.FontSize,
                className: "yourFirstName",
              });

              if (
                firstName.width >
                (props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.ScaleToWidth
                  : props.coords.opponentName.ScaleToWidth)
              ) {
                firstName.scaleToWidth(
                  props.coords.opponentFirstName
                    ? props.coords.opponentFirstName.ScaleToWidth
                    : props.coords.yourTeamFirstName.ScaleToWidth
                );
              }
              if (
                props.coords.opponentFirstName
                  ? props.coords.opponentFirstName.FontStyle
                  : props.coords.opponentName.FontStyle
              ) {
                firstName.set({
                  fontStyle: props.coords.opponentFirstName
                    ? props.coords.opponentFirstName.FontStyle
                    : props.coords.opponentName.FontStyle,
                });
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
            if (props.coords.yourTeamSecondName) {
              const secondTeamName = yourTeamLogo.split(".")[1].toUpperCase();
              const secondFont = new FontFaceObserver(props.coords.yourTeamSecondName.FontFamily);
              secondFont.load().then(() => {
                const secondName = new fabric.Text(secondTeamName, {
                  selectable: false,
                  originX: props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.OriginX
                    : props.coords.yourTeamSecondName.OriginX,
                  originY: props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.OriginY
                    : props.coords.yourTeamSecondName.OriginY,
                  top: props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.Top
                    : props.coords.yourTeamSecondName.Top2,
                  left: props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.Left
                    : props.coords.yourTeamSecondName.Left,
                  fill: props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.Fill
                    : props.coords.yourTeamSecondName.Fill,
                  fontFamily: props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.FontFamily
                    : props.coords.yourTeamSecondName.FontFamily,
                  fontSize: props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.FontSize
                    : props.coords.yourTeamSecondName.FontSize,
                  className: "yourSecondName",
                });

                if (
                  secondName.width >
                  (props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.ScaleToWidth
                    : props.coords.yourTeamSecondName.ScaleToWidth)
                ) {
                  secondName.scaleToWidth(
                    props.coords.opponentSecondName
                      ? props.coords.opponentSecondName.ScaleToWidth
                      : props.coords.yourTeamSecondName.ScaleToWidth
                  );
                }
                if (
                  props.coords.opponentSecondName
                    ? props.coords.opponentSecondName.FontStyle
                    : props.coords.yourTeamSecondName.FontStyle
                ) {
                  secondName.set({
                    fontStyle: props.coords.opponentSecondName
                      ? props.coords.opponentSecondName.FontStyle
                      : props.coords.yourTeamSecondName.FontStyle,
                  });
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
              });
            }
          } else {
            const font = new FontFaceObserver(props.coords.yourTeamName.FontFamily);
            font.load().then(() => {
              const name = new fabric.Text(yourTeamName, {
                selectable: false,
                originX: props.coords.opponentName.OriginX,
                originY: props.coords.opponentName.OriginY,
                top: props.coords.opponentName.Top,
                left: props.coords.opponentName.Left,
                fill: props.coords.opponentName.Fill,
                fontSize: props.coords.opponentName.FontSize,
                fontFamily: props.coords.opponentName.FontFamily,
                className: "yourName",
              });
              if (props.coords.yourTeamName.CharSpacing) {
                name.charSpacing = props.coords.yourTeamName.CharSpacing;
              }

              if (name.width > props.coords.opponentName.ScaleToWidth) {
                name.scaleToWidth(props.coords.opponentName.ScaleToWidth);
              }
              if (props.coords.opponentName.FontStyle) {
                name.set({
                  fontStyle: props.coords.opponentName.FontStyle,
                });
              }
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
                if (poster === "FkbRjeu4p2PvRryL8byB" || props.themeOption.label === "żółto-czarny") {
                  name.set({
                    fill: "white",
                  });
                }
                if (
                  props.id.theme === "motyw 5" &&
                  (props.themeOption.label === "żółto-czarny" || props.themeOption.label === "biało-niebieski")
                ) {
                  name.set({
                    fill: "white",
                  });
                }
              }

              fabricRef.current.add(name);
              fabricRef.current.renderAll();
            });
          }
        }
      }
    }
  };

  return { teamLogo, secondTeamLogo, teamName };
}

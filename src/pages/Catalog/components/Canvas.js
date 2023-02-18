import "../../../fonts/Russo_One.ttf";
import "../../../fonts/Poppins-BoldItalic.ttf";
import "../../../fonts/Goldman-Bold.ttf";
import "../../../fonts/Goldman-Regular.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import FontFaceObserver from "fontfaceobserver";

function MatchPoster({
  posterBackGround,
  selectedPlayer,
  opponent,
  yourLogo,
  date,
  opponentName,
  coords,
  place,
  id,
  yourTeamResult,
  yourOpponentResult,
  radioChecked,
  themeOption,
  league,
  kolejka,
}) {
  const [isPoster, setIsPoster] = useState(null);
  const { poster } = useParams();
  const backImg = new Image();
  backImg.src = posterBackGround;
  const [yourTeamLogo, setYourTeamLogo] = useState(yourLogo);
  const { user } = useAuthContext();
  const canvasRef = useRef();
  const fabricRef = useRef();

  const [logo, setLogo] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const yourKolejka = () => {
    if (kolejka) {
      if (fabricRef.current && kolejka === "") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourKolejka") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      }
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourKolejka") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const font = new FontFaceObserver(coords.yourKolejkaFontFamily);
      font.load().then(() => {
        if (poster === "wsAn3pPtaand0xDdNZ5S") {
          kolejka = kolejka.toUpperCase();
        }
        const yourKolejka = new fabric.Text(kolejka, {
          top: coords.yourKolejkaTop,
          left: coords.yourKolejkaLeft,
          fontFamily: coords.yourKolejkaFontFamily,
          selectable: false,
          fill: coords.yourKolejkaFill,
          className: "yourKolejka",
          originX: coords.yourKolejkaOriginX,
          originY: coords.yourKolejkaOriginY,
        });
        if (coords.yourKolejkaCharSpacing) {
          yourKolejka.set({
            charSpacing: coords.yourKolejkaCharSpacing,
          });
        }

        if (coords.yourKolejkaWidth) {
          yourKolejka.set({
            width: coords.yourKolejkaWidth,
          });
        }
        if (coords.yourKolejkaScaleToHeight) {
          yourKolejka.scaleToHeight(coords.yourKolejkaScaleToHeight);
        }
        if (coords.yourKolejkaFontSize) {
          yourKolejka.set({
            fontSize: coords.yourKolejkaFontSize,
          });
        }
        if (yourKolejka.width > coords.yourKolejkaScaleToWidth) {
          yourKolejka.scaleToWidth(coords.yourKolejkaScaleToWidth);
        }
        fabricRef.current.add(yourKolejka);
      });
    }
  };
  yourKolejka();
  const yourLeague = () => {
    if (league) {
      if (fabricRef.current && league === "") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourLeague") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      }
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourLeague") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });

      const font = new FontFaceObserver(coords.yourLeagueFontFamily);
      font.load().then(() => {
        if (poster === "mvzttPwmXvDWCz4vJefn") {
          league = league.toUpperCase();
        }
        const yourLeague = new fabric.Text(league, {
          top: coords.yourLeagueTop,
          left: coords.yourLeagueLeft,
          fontFamily: coords.yourLeagueFontFamily,
          selectable: false,
          fill: coords.yourLeagueFill,
          className: "yourLeague",
          originX: coords.yourLeagueOriginX,
          originY: coords.yourLeagueOriginY,
        });

        if (coords.yourLeagueWidth) {
          yourLeague.set({
            width: coords.yourLeagueWidth,
          });
        }
        if (coords.yourLeagueScaleToHeight) {
          yourLeague.scaleToHeight(coords.yourLeagueScaleToHeight);
        }
        if (coords.yourLeagueFontSize) {
          yourLeague.set({
            fontSize: coords.yourLeagueFontSize,
          });
        }
        if (yourLeague.width > coords.yourLeagueScaleToWidth) {
          yourLeague.scaleToWidth(coords.yourLeagueScaleToWidth);
        }
        fabricRef.current.add(yourLeague);
      });
    }
  };
  useEffect(() => {
    yourLeague();
  }, [league, themeOption]);

  const yourResult = () => {
    if (yourTeamResult) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourTeamResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(coords.yourTeamResultFontFamily);
        font.load().then(() => {
          const result = new fabric.Text(yourTeamResult, {
            top: coords.yourTeamResultTop,
            left: coords.yourTeamResultLeft,
            fontFamily: coords.yourTeamResultFontFamily,
            selectable: false,
            fill: coords.yourTeamResultFill,
            className: "yourTeamResult",
            originX: coords.yourTeamResultOriginX,
            originY: coords.yourTeamResultOriginY,
          });
          result.scaleToHeight(coords.yourTeamResultScaleToHeight);
          if (themeOption) {
            if (
              themeOption.label.split("-")[0] === "biało" ||
              themeOption.label.split("-")[0] === "żółto" ||
              themeOption.label === "biały"
            ) {
              result.set({
                fill: "black",
              });
            }
            if (
              poster === "PmoRESwg91LxFAGFObbZ" ||
              themeOption.label === "biało-czerwono-niebiesko-zielony"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "biało-niebieski"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "żółto-czarny"
            ) {
              result.set({
                fill: "white",
              });
            }
          }

          fabricRef.current.add(result);
        });
      } else if (radioChecked === "radio2") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourTeamResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(coords.yourOpponentResultFontFamily);
        font.load().then(() => {
          const result = new fabric.Text(yourTeamResult, {
            top: coords.yourOpponentResultTop,
            left: coords.yourOpponentResultLeft,
            fontFamily: coords.yourOpponentResultFontFamily,
            selectable: false,
            fill: coords.yourOpponentResultFill,
            className: "yourTeamResult",
            originX: coords.yourOpponentResultOriginX,
            originY: coords.yourOpponentResultOriginY,
          });
          result.scaleToHeight(coords.yourOpponentResultScaleToHeight);
          if (themeOption) {
            if (
              themeOption.label.split("-")[0] === "biało" ||
              themeOption.label.split("-")[0] === "żółto" ||
              themeOption.label === "biały"
            ) {
              result.set({
                fill: "black",
              });
            }
            if (
              poster === "PmoRESwg91LxFAGFObbZ" ||
              themeOption.label === "biało-czerwono-niebiesko-zielony"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "biało-niebieski"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              id.theme === "motyw 3" &&
              themeOption.label === "żółto-czarny"
            ) {
              result.set({
                fill: "white",
              });
            }
          }
          fabricRef.current.add(result);
        });
      }
    }
  };
  const opponentResult = () => {
    if (yourOpponentResult) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const result = new fabric.Text(yourOpponentResult, {
          top: coords.yourOpponentResultTop,
          left: coords.yourOpponentResultLeft,
          fontFamily: coords.yourOpponentResultFontFamily,
          selectable: false,
          fill: coords.yourOpponentResultFill,
          className: "yourOpponentResult",
          originX: coords.yourOpponentResultOriginX,
          originY: coords.yourOpponentResultOriginY,
        });
        result.scaleToHeight(coords.yourOpponentResultScaleToHeight);
        if (themeOption) {
          if (
            themeOption.label.split("-")[0] === "biało" ||
            themeOption.label.split("-")[0] === "żółto" ||
            themeOption.label === "biały"
          ) {
            result.set({
              fill: "black",
            });
          }
          if (
            poster === "PmoRESwg91LxFAGFObbZ" ||
            themeOption.label === "biało-czerwono-niebiesko-zielony"
          ) {
            result.set({
              fill: "white",
            });
          }
          if (
            id.theme === "motyw 3" &&
            themeOption.label === "biało-niebieski"
          ) {
            result.set({
              fill: "white",
            });
          }
          if (id.theme === "motyw 3" && themeOption.label === "żółto-czarny") {
            result.set({
              fill: "white",
            });
          }
        }

        fabricRef.current.add(result);
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const result = new fabric.Text(yourOpponentResult, {
          top: coords.yourTeamResultTop,
          left: coords.yourTeamResultLeft,
          fontFamily: coords.yourTeamResultFontFamily,
          selectable: false,
          fill: coords.yourTeamResultFill,
          className: "yourOpponentResult",
          originX: coords.yourTeamResultOriginX,
          originY: coords.yourTeamResultOriginY,
        });
        result.scaleToHeight(coords.yourTeamResultScaleToHeight);
        if (themeOption) {
          if (
            themeOption.label.split("-")[0] === "biało" ||
            themeOption.label.split("-")[0] === "żółto" ||
            themeOption.label === "biały"
          ) {
            result.set({
              fill: "black",
            });
          }
          if (
            poster === "PmoRESwg91LxFAGFObbZ" ||
            themeOption.label === "biało-czerwono-niebiesko-zielony"
          ) {
            result.set({
              fill: "white",
            });
          }
          if (
            id.theme === "motyw 3" &&
            themeOption.label === "biało-niebieski"
          ) {
            result.set({
              fill: "white",
            });
          }
          if (id.theme === "motyw 3" && themeOption.label === "żółto-czarny") {
            result.set({
              fill: "white",
            });
          }
        }

        fabricRef.current.add(result);
      }
    }
  };

  const typePlace = () => {
    if (place) {
      if (fabricRef.current && place === "") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "typePlace") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      }

      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typePlace") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });

      const typePlace = new fabric.Text(place.toUpperCase(), {
        selectable: false,
        charSpacing: coords.typePlaceCharSpacing,
        height: coords.typePlaceHeight,
        textAlign: "center",
        top: coords.typePlaceTop,
        left: coords.typePlaceLeft,
        width: coords.typePlaceWidth,
        className: "typePlace",
        fontSize: coords.typePlaceFontSize,
        fill: coords.typePlaceFill,
        originX: coords.typePlaceOriginX,
        originY: coords.typePlaceOriginY,
        fontFamily: coords.typePlaceFontFamily,
      });
      if (coords.typePlaceScaleToHeight) {
        typePlace.scaleToHeight(coords.typePlaceScaleToHeight);
      }

      if (typePlace.width >= coords.typePlaceScaleToWidth) {
        typePlace.scaleToWidth(coords.typePlaceScaleToWidth);
      }
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          typePlace.set({
            fill: "black",
          });
        } else {
          typePlace.set({
            fill: coords.typePlaceFill,
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          typePlace.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3") {
          typePlace.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "żółto-czarny") {
          typePlace.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "czarno-biały") {
          typePlace.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "niebieski") {
          typePlace.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "zielony") {
          typePlace.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "biało-niebieski") {
          typePlace.set({
            fill: "white",
          });
        }
      }
      fabricRef.current.add(typePlace);
    }
  };

  const typeDate = () => {
    if (fabricRef.current && date === "") {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typeDate") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }
    if (date) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typeDate") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const typeDate = new fabric.Text(date.toUpperCase(), {
        selectable: false,
        height: coords.typeDataHeight,
        top: coords.typeDataTop,
        left: coords.typeDataLeft,
        className: "typeDate",
        fontSize: coords.typeDataFontSize,
        fill: coords.typeDataFill,
        originX: coords.typeDataOriginX,
        originY: coords.typeDataOriginY,
        fontFamily: coords.typeDataFontFamily,
        charSpacing: coords.typeDataCharSpacing,
      });

      if (typeDate.width >= coords.typeDataWidth) {
        typeDate.scaleToWidth(coords.typeDataScaleToWidth);
      }
      if (themeOption) {
        if (
          themeOption.label.split("-")[0] === "biało" ||
          themeOption.label.split("-")[0] === "żółto" ||
          themeOption.label === "biały"
        ) {
          typeDate.set({
            fill: "black",
          });
        } else {
          typeDate.set({
            fill: coords.typeDataFill,
          });
        }
        if (id.theme === "motyw 2" && themeOption.label === "żółto-czarny") {
          typeDate.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 3") {
          typeDate.set({
            fill: "white",
          });
        }

        if (id.theme === "motyw 4" && themeOption.label === "żółto-czarny") {
          typeDate.set({
            fill: "white",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "czarno-biały") {
          typeDate.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "niebieski") {
          typeDate.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "zielony") {
          typeDate.set({
            fill: "black",
          });
        }
        if (id.theme === "motyw 4" && themeOption.label === "biało-niebieski") {
          typeDate.set({
            fill: "white",
          });
        }
      }

      fabricRef.current.add(typeDate);
    }
  };

  const opponentLogo = () => {
    if (opponent) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentImage") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const opponentImg = new Image();
        opponentImg.src = opponent;
        opponentImg.onload = () => {
          fabric.Image.fromURL(opponentImg.src, function (img) {
            img.set({
              selectable: false,
              top: coords.opponentImageTop,
              left: coords.opponentImageLeft,
              className: "opponentImage",
              originX: "center",
              originY: "center",
            });

            img.scaleToHeight(coords.opponentImageScaleToHeight);

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
        opponentImg.src = opponent;
        opponentImg.onload = () => {
          fabric.Image.fromURL(opponentImg.src, function (img) {
            img.set({
              selectable: false,
              top: coords.yourTeamLogoTop,
              left: coords.yourTeamLogoLeft,
              className: "opponentImage",
              originX: "center",
              originY: "center",
            });
            img.scaleToHeight(coords.yourTeamLogoScaleToHeight);
            fabricRef.current.add(img);
          });
        };
      }
    }
  };
  const opponentsName = () => {
    if (opponentName) {
      if (radioChecked === "radio1") {
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
        if (coords.opponentFirstNameFontFamily) {
          const opponentFirstName = opponentName.split(" ")[0];

          const opponentSecondName = opponentName.split(" ")[1];
          const font = new FontFaceObserver(coords.opponentFirstNameFontFamily);
          font.load().then(() => {
            const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
              selectable: false,
              top: coords.opponentFirstNameTop,
              left: coords.opponentFirstNameLeft,
              originY: coords.opponentFirstNameOriginY,
              originX: coords.opponentFirstNameOriginX,
              fontSize: coords.opponentFirstNameFontSize,
              width: coords.opponentFirstNameWidth,
              fill: coords.opponentFirstNameFill,
              className: "opponentsFirstName",
              fontFamily: coords.opponentFirstNameFontFamily,
            });
            if (coords.opponentFirstNameScaleToWidth) {
              firstName.scaleToWidth(coords.opponentFirstNameScaleToWidth);
            }
            if (coords.opponentFirstNameScaleToHeight) {
              firstName.scaleToHeight(coords.opponentFirstNameScaleToHeight);
            }
            if (firstName.width > coords.opponentFirstNameWidth) {
              firstName.scaleToWidth(coords.opponentFirstNameScaleToWidth);
            }
            if (themeOption) {
              if (
                themeOption.label.split("-")[0] === "biało" ||
                themeOption.label.split("-")[0] === "żółto" ||
                themeOption.label === "biały"
              ) {
                firstName.set({
                  fill: "black",
                });
              }
            }
            fabricRef.current.add(firstName);
          });
          const fontTwo = new FontFaceObserver(
            coords.opponentSecondNameFontFamily
          );
          fontTwo.load().then(() => {
            if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
              const secondName = new fabric.Text(
                opponentSecondName.toUpperCase(),
                {
                  selectable: false,
                  top: coords.opponentSecondNameTop,
                  left: coords.opponentSecondNameLeft,
                  originY: coords.opponentSecondNameOriginY,
                  originX: coords.opponentSecondNameOriginX,
                  fontSize: coords.opponentSecondNameFontSize,
                  width: coords.opponentSecondNameWidth,
                  fill: coords.opponentSecondNameFill,
                  className: "opponentsSecondName",
                  fontFamily: coords.opponentSecondNameFontFamily,
                }
              );

              secondName.scaleToHeight(coords.opponentSecondNameScaleToHeight);
              if (secondName.width > coords.opponentSecondNameWidth) {
                secondName.scaleToWidth(coords.opponentSecondNameScaleToWidth);
              }
              if (themeOption) {
                if (
                  themeOption.label.split("-")[0] === "biało" ||
                  themeOption.label.split("-")[0] === "żółto" ||
                  themeOption.label === "biały"
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
            coords.opponentNameFontFamily
          );
          if (poster === "qyCYooseTtFZ4WnXNcxf") {
            opponentName = opponentName.toUpperCase();
          }

          fontOpponent.load().then(() => {
            if (
              poster === "mvzttPwmXvDWCz4vJefn" ||
              poster === "wsAn3pPtaand0xDdNZ5S"
            ) {
              opponentName = opponentName.toUpperCase();
            }
            if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
              const opponentsName = new fabric.Text(opponentName, {
                selectable: false,
                top: coords.opponentNameTop,
                left: coords.opponentNameLeft,
                originY: coords.opponentNameOriginY,
                originX: coords.opponentNameOriginX,
                fontSize: coords.opponentNameFontSize,
                width: coords.opponentNameWidth,
                fill: coords.opponentNameFill,
                className: "opponentsName",
                fontFamily: coords.opponentNameFontFamily,
              });
              if (opponentsName.width > coords.opponentNameScaleToWidth) {
                opponentsName.scaleToWidth(coords.opponentNameScaleToWidth);
              }
              if (themeOption) {
                if (
                  themeOption.label.split("-")[0] === "biało" ||
                  themeOption.label.split("-")[0] === "żółto" ||
                  themeOption.label === "biały"
                ) {
                  opponentsName.set({
                    fill: "black",
                  });

                  if (
                    poster === "FkbRjeu4p2PvRryL8byB" ||
                    poster === "PmoRESwg91LxFAGFObbZ" ||
                    themeOption.label === "żółto-czarny"
                  ) {
                    opponentsName.set({
                      fill: "white",
                    });
                  }
                }
              }

              fabricRef.current.add(opponentsName);
            }
          });
        }
      } else if (radioChecked === "radio2") {
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
        if (coords.opponentFirstNameFontFamily) {
          const opponentFirstName = opponentName.split(" ")[0];

          const opponentSecondName = opponentName.split(" ")[1];

          const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
            selectable: false,
            top: coords.yourTeamFirstNameTop,
            left: coords.yourTeamFirstNameLeft,
            originY: coords.yourTeamFirstNameOriginY,
            originX: coords.yourTeamFirstNameOriginX,
            fontSize: coords.yourTeamFirstNameFontSize,
            width: coords.yourTeamFirstNameWidth,
            fill: coords.yourTeamFirstNameFill,
            className: "opponentsFirstName",
            fontFamily: coords.yourTeamFirstNameFontFamily,
          });

          if (coords.yourTeamFirstNameScaleToWidth) {
            firstName.scaleToWidth(coords.yourTeamFirstNameScaleToWidth);
          }
          if (coords.yourTeamFirstNameScaleToHeight) {
            firstName.scaleToHeight(coords.yourTeamFirstNameScaleToHeight);
          }
          if (firstName.width > coords.yourTeamFirstNameWidth) {
            firstName.scaleToWidth(coords.yourTeamFirstNameScaleToWidth);
          }
          if (themeOption) {
            if (
              themeOption.label.split("-")[0] === "biało" ||
              themeOption.label.split("-")[0] === "żółto" ||
              themeOption.label === "biały"
            ) {
              firstName.set({
                fill: "black",
              });
            }
          }
          fabricRef.current.add(firstName);

          if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
            const fontTwo = new FontFaceObserver(
              coords.yourTeamSecondNameFontFamily
            );

            fontTwo.load().then(() => {
              const secondName = new fabric.Text(
                opponentSecondName.toUpperCase(),
                {
                  selectable: false,
                  top: coords.yourTeamSecondNameTop,
                  left: coords.yourTeamSecondNameLeft,
                  originY: coords.yourTeamSecondNameOriginY,
                  originX: coords.yourTeamSecondNameOriginX,
                  fontSize: coords.yourTeamSecondNameFontSize,
                  width: coords.yourTeamSecondNameWidth,
                  fill: coords.yourTeamSecondNameFill,
                  className: "opponentsSecondName",
                  fontFamily: coords.yourTeamSecondNameFontFamily,
                }
              );

              secondName.scaleToHeight(coords.yourTeamSecondNameScaleToHeight);
              if (secondName.width > coords.yourTeamSecondNameWidth) {
                secondName.scaleToWidth(coords.yourTeamSecondNameScaleToWidth);
              }
              if (themeOption) {
                if (
                  themeOption.label.split("-")[0] === "biało" ||
                  themeOption.label.split("-")[0] === "żółto" ||
                  themeOption.label === "biały"
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
            coords.opponentNameFontFamily
          );
          if (poster === "qyCYooseTtFZ4WnXNcxf") {
            opponentName = opponentName.toUpperCase();
          }
          if (poster === "mvzttPwmXvDWCz4vJefn") {
            opponentName = opponentName.toUpperCase();
          }
          fontOpponent.load().then(() => {
            const opponentsName = new fabric.Text(opponentName, {
              selectable: false,
              top: coords.yourTeamNameTop,
              left: coords.yourTeamNameLeft,
              originY: coords.yourTeamNameOriginY,
              originX: coords.yourTeamNameOriginX,
              fontSize: coords.yourTeamNameFontSize,
              width: coords.yourTeamNameWidth,
              fill: coords.yourTeamNameFill,
              className: "opponentsName",
              fontFamily: coords.yourTeamNameFontFamily,
            });

            if (opponentsName.width > coords.yourTeamNameScaleToWidth) {
              opponentsName.scaleToWidth(coords.yourTeamNameScaleToWidth);
            }
            if (themeOption) {
              if (
                themeOption.label.split("-")[0] === "biało" ||
                themeOption.label.split("-")[0] === "żółto" ||
                themeOption.label === "biały"
              ) {
                opponentsName.set({
                  fill: "black",
                });
              }
              if (
                id.theme === "motyw 2" &&
                themeOption.label === "żółto-czarny"
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
  useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: false,
        width: backImg.width,
        height: backImg.height,
      });
      const img = new Image();
      img.crossOrigin = "Anonymous";

      img.src = posterBackGround;

      img.onload = () => {
        const newImg = new fabric.Image.fromURL(img.src, function (img) {
          img.set({
            crossOrigin: "anonymous",
          });
          fabricRef.current.setBackgroundImage(
            img,
            fabricRef.current.renderAll.bind(fabricRef.current, {
              crossOrigin: "anonymous",
            })
          );
        });

        setIsPoster(newImg);
        document.querySelector(".lower-canvas").style.width = img.width + "px";
        document.querySelector(".lower-canvas").style.height =
          img.height + "px";
        document.querySelector(".lower-canvas").width = img.width;
        document.querySelector(".lower-canvas").height = img.height;
        document.querySelector(".upper-canvas").width = img.width;
        document.querySelector(".upper-canvas").height = img.height;
        document.querySelector(".upper-canvas").style.width = img.width + "px";
        document.querySelector(".upper-canvas").style.height =
          img.height + "px";
        document.querySelector(".canvas-container").style.width =
          img.width + "px";
        document.querySelector(".canvas-container").style.height =
          img.height + "px";
      };
    };

    initFabric();
  }, [posterBackGround]);
  const teamLogo = () => {
    if (yourTeamLogo[0].img && coords.yourTeamLogoTop) {
      if (radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "teamLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const secondImg = new Image();
        secondImg.src = yourTeamLogo[0].img;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function (img) {
            img.set({
              selectable: false,
              top: coords.yourTeamLogoTop,
              left: coords.yourTeamLogoLeft,
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(coords.yourTeamLogoScaleToHeight);
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
        secondImg.src = yourTeamLogo[0].img;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function (img) {
            img.set({
              selectable: false,
              top: coords.opponentImageTop,
              left: coords.opponentImageLeft,
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(coords.opponentImageScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        };
      }
    }
  };
  useEffect(() => {
    teamLogo();
  }, [radioChecked, posterBackGround]);
  const secondTeamLogo = () => {
    if (yourTeamLogo[0].img && coords.yourTeamSecondLogoTop) {
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
            top: coords.yourTeamSecondLogoTop,
            left: coords.yourTeamSecondLogoLeft,
            originX: "center",
            originY: "center",
            className: "teamSecondLogo",
          });
          img.scaleToHeight(coords.yourTeamSecondLogoScaleToHeight);
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        });
      };
    }
  };
  useEffect(() => {
    secondTeamLogo();
  }, [posterBackGround]);

  const teamName = () => {
    if (yourTeamLogo[0].firstName) {
      if (
        coords.yourTeamFirstNameTop ||
        coords.yourTeamNameTop ||
        coords.yourTeamSecondNameTop
      ) {
        if (radioChecked === "radio1") {
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
          let yourTeamName;
          if (poster === "23b5ff36a490e8f93breae34") {
            yourTeamName = yourTeamLogo[0].firstName;
          } else if (poster === "PmoRESwg91LxFAGFObbZ") {
            yourTeamName =
              yourTeamLogo[0].firstName + " " + yourTeamLogo[0].secondName;
          } else {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          }
          if (coords.yourTeamFirstNameFontFamily) {
            const firstTeamName = yourTeamLogo[0].firstName.toUpperCase();

            const secondTeamName = yourTeamLogo[0].secondName.toUpperCase();
            const firstFont = new FontFaceObserver(
              coords.yourTeamFirstNameFontFamily
            );
            firstFont.load().then(() => {
              const firstName = new fabric.Text(firstTeamName, {
                selectable: false,
                top: coords.yourTeamFirstNameTop,
                left: coords.yourTeamFirstNameLeft,
                width: coords.yourTeamFirstNameWidth,
                fill: coords.yourTeamFirstNameFill,
                fontFamily: coords.yourTeamFirstNameFontFamily,
                originX: coords.yourTeamFirstNameOriginX,
                originY: coords.yourTeamFirstNameOriginY,
                className: "yourFirstName",
              });
              if (coords.yourTeamFirstNameScaleToWidth) {
                firstName.scaleToWidth(coords.yourTeamFirstNameScaleToWidth);
              }
              if (coords.yourTeamFirstNameScaleToHeight) {
                firstName.scaleToHeight(coords.yourTeamFirstNameScaleToHeight);
              }
              if (firstName.width > coords.yourTeamFirstNameWidth) {
                firstName.scaleToWidth(coords.yourTeamFirstNameScaleToWidth);
              }
              if (themeOption) {
                if (
                  themeOption.label.split("-")[0] === "biało" ||
                  themeOption.label.split("-")[0] === "żółto" ||
                  themeOption.label === "biały"
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
                coords.yourTeamSecondNameFontFamily
              );
              secondFont.load().then(() => {
                const secondName = new fabric.Text(secondTeamName, {
                  selectable: false,
                  originX: coords.yourTeamSecondNameOriginX,
                  originY: coords.yourTeamSecondNameOriginY,
                  top: coords.yourTeamSecondNameTop,
                  width: coords.yourTeamSecondNameWidth,
                  left: coords.yourTeamSecondNameLeft,
                  fill: coords.yourTeamSecondNameFill,
                  fontFamily: coords.yourTeamSecondNameFontFamily,
                  className: "yourSecondName",
                });
                if (coords.yourTeamSecondNameScaleToHeight) {
                  secondName.scaleToHeight(
                    coords.yourTeamSecondNameScaleToHeight
                  );
                }
                if (secondName.width > coords.yourTeamSecondNameWidth) {
                  secondName.scaleToWidth(
                    coords.yourTeamSecondNameScaleToWidth
                  );
                }
                if (themeOption) {
                  if (
                    themeOption.label.split("-")[0] === "biało" ||
                    themeOption.label.split("-")[0] === "żółto" ||
                    themeOption.label === "biały"
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
            const font = new FontFaceObserver(coords.yourTeamNameFontFamily);
            font.load().then(() => {
              const name = new fabric.Text(yourTeamName, {
                selectable: false,
                originX: coords.yourTeamNameOriginX,
                originY: coords.yourTeamNameOriginY,
                top: coords.yourTeamNameTop,
                left: coords.yourTeamNameLeft,
                fill: coords.yourTeamNameFill,
                fontFamily: coords.yourTeamNameFontFamily,
                className: "yourName",
              });
              if (coords.yourTeamNameCharSpacing) {
                name.charSpacing = coords.yourTeamNameCharSpacing;
              }
              if (coords.yourTeamNameWidth) {
                name.width = coords.yourTeamNameWidth;
              }

              name.scaleToWidth(coords.yourTeamNameScaleToWidth);
              if (themeOption) {
                if (
                  themeOption.label.split("-")[0] === "biało" ||
                  themeOption.label.split("-")[0] === "żółto" ||
                  themeOption.label === "biały"
                ) {
                  name.set({
                    fill: "black",
                  });
                }
                if (
                  poster === "FkbRjeu4p2PvRryL8byB" ||
                  poster === "PmoRESwg91LxFAGFObbZ" ||
                  themeOption.label === "żółto-czarny"
                ) {
                  name.set({
                    fill: "white",
                  });
                }
              }
              fabricRef.current.add(name);
            });
          }
        } else if (radioChecked === "radio2") {
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
          let yourTeamName;
          if (poster === "23b5ff36a490e8f93breae34") {
            yourTeamName = yourTeamLogo[0].firstName;
          } else if (poster === "PmoRESwg91LxFAGFObbZ") {
            yourTeamName =
              yourTeamLogo[0].firstName + " " + yourTeamLogo[0].secondName;
          } else {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          }
          if (coords.yourTeamFirstNameFontFamily) {
            const firstTeamName = yourTeamLogo[0].firstName.toUpperCase();

            const secondTeamName = yourTeamLogo[0].secondName.toUpperCase();
            const font = new FontFaceObserver(
              coords.yourTeamFirstNameFontFamily
            );
            font.load().then(() => {
              const firstName = new fabric.Text(firstTeamName, {
                selectable: false,
                originX: coords.opponentFirstNameOriginX,
                originY: coords.opponentFirstNameOriginY,
                top: coords.opponentFirstNameTop,
                left: coords.opponentFirstNameLeft,
                width: coords.opponentFirstNameWidth,
                fill: coords.opponentFirstNameFill,
                fontFamily: coords.opponentFirstNameFontFamily,
                className: "yourFirstName",
              });
              if (coords.opponentFirstNameScaleToWidth) {
                firstName.scaleToWidth(coords.opponentFirstNameScaleToWidth);
              }
              if (coords.opponentFirstNameScaleToHeight) {
                firstName.scaleToHeight(coords.opponentFirstNameScaleToHeight);
              }

              if (firstName.width > coords.opponentFirstNameWidth) {
                firstName.scaleToWidth(coords.opponentFirstNameScaleToWidth);
              }
              if (themeOption) {
                if (
                  themeOption.label.split("-")[0] === "biało" ||
                  themeOption.label.split("-")[0] === "żółto" ||
                  themeOption.label === "biały"
                ) {
                  firstName.set({
                    fill: "black",
                  });
                }
              }
              fabricRef.current.add(firstName);
            });
            const secondFont = new FontFaceObserver(
              coords.yourTeamSecondNameFontFamily
            );
            secondFont.load().then(() => {
              const secondName = new fabric.Text(secondTeamName, {
                selectable: false,
                originX: coords.opponentSecondNameOriginX,
                originY: coords.opponentSecondNameOriginY,
                top: coords.opponentSecondNameTop,
                width: coords.opponentSecondNameWidth,
                left: coords.opponentSecondNameLeft,
                fill: coords.opponentSecondNameFill,
                fontFamily: coords.opponentSecondNameFontFamily,
                className: "yourSecondName",
              });
              secondName.scaleToHeight(coords.opponentSecondNameScaleToHeight);
              if (secondName.width > coords.opponentSecondNameWidth) {
                secondName.scaleToWidth(coords.opponentSecondNameScaleToWidth);
              }
              if (themeOption) {
                if (
                  themeOption.label.split("-")[0] === "biało" ||
                  themeOption.label.split("-")[0] === "żółto" ||
                  themeOption.label === "biały"
                ) {
                  secondName.set({
                    fill: "black",
                  });
                }
              }

              fabricRef.current.add(secondName);
            });
          } else {
            const font = new FontFaceObserver(coords.yourTeamNameFontFamily);
            font.load().then(() => {
              const name = new fabric.Text(yourTeamName, {
                selectable: false,
                originX: coords.opponentNameOriginX,
                originY: coords.opponentNameOriginY,
                top: coords.opponentNameTop,
                left: coords.opponentNameLeft,
                fill: coords.opponentNameFill,
                fontFamily: coords.opponentNameFontFamily,
                className: "yourName",
              });
              if (coords.opponentNameCharSpacing) {
                name.charSpacing = coords.opponentNameCharSpacing;
              }
              if (coords.opponentNameWidth) {
                name.width = coords.opponentNameWidth;
              }

              name.scaleToWidth(coords.opponentNameScaleToWidth);
              if (themeOption) {
                if (
                  themeOption.label.split("-")[0] === "biało" ||
                  themeOption.label.split("-")[0] === "żółto" ||
                  themeOption.label === "biały"
                ) {
                  name.set({
                    fill: "black",
                  });
                }
                if (
                  poster === "FkbRjeu4p2PvRryL8byB" ||
                  themeOption.label === "żółto-czarny"
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
  useEffect(() => {
    setTimeout(() => {
      teamName();
    }, [1]);
  }, [radioChecked, themeOption, posterBackGround]);

  opponentLogo();

  opponentsName();
  typeDate();
  useEffect(() => {
    typePlace();
  }, [place, posterBackGround]);

  yourResult();
  opponentResult();

  return (
    <>
      <canvas
        id="canvas"
        className="resposive-canvas"
        crossOrigin="anonymous"
        ref={fabricRef}
      />
      <button className="preview-button">Podgląd</button>
    </>
  );
}

export default MatchPoster;

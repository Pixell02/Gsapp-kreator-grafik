import "../../../fonts/Russo_One.ttf";
import "../../../fonts/Poppins-BoldItalic.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export default function MonthlySummary({
  posterBackGround,
  coords,
  dateOne,
  dateTwo,
  dateThree,
  dateFour,
  hourOne,
  hourTwo,
  hourThree,
  hourFour,
  opponentOne,
  opponentTwo,
  opponentThree,
  opponentFour,
  yourResultOne,
  yourResultTwo,
  yourResultThree,
  yourResultFour,
  opponentResultOne,
  opponentResultTwo,
  opponentResultThree,
  opponentResultFour,
  yourTeamName,
  month,
  league,
  radioOne,
  radioTwo,
  radioThree,
  radioFour
}) {
  const [isPoster, setIsPoster] = useState(null);
  const backImg = new Image();
  backImg.src = posterBackGround.src;
  const fabricRef = useRef();

  useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: false,
        width: backImg.width,
        height: backImg.height,
      });
      const img = new Image();
      img.src = posterBackGround.src;
      img.onload = () => {
        const newImg = new fabric.Image.fromURL(img.src, function (img) {
          fabricRef.current.setBackgroundImage(
            img,
            fabricRef.current.renderAll.bind(fabricRef.current)
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
  }, []);

  useEffect(() => {
    const yourTeamNameOne = () => {
      if (yourTeamName) {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "yourTeamNameOne") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const name = new fabric.Text(
          yourTeamName[0].firstName + " " + yourTeamName[0].secondName,
          {
            selectable: false,
            className: "yourTeamNameOne",
            fontFamily: "Baron-Neue-Black",
            fill: "#003981",
            originX: "left",
            originY: "center",
            top: 215,
            left: 220,
          }
        );
        name.scaleToWidth(140);
        fabricRef.current.add(name);
      }
    };
    const yourTeamNameTwo = () => {
      if (yourTeamName) {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "yourTeamNameTwo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const name = new fabric.Text(
          yourTeamName[0].firstName + " " + yourTeamName[0].secondName,
          {
            selectable: false,
            className: "yourTeamNameTwo",
            fontFamily: "Baron-Neue-Black",
            fill: "#003981",
            originX: "left",
            originY: "center",
            top: 290,
            left: 220,
          }
        );
        name.scaleToWidth(140);
        fabricRef.current.add(name);
      }
    };
    const yourTeamNameThree = () => {
      if (yourTeamName) {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "yourTeamNameThree") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const name = new fabric.Text(
          yourTeamName[0].firstName + " " + yourTeamName[0].secondName,
          {
            selectable: false,
            className: "yourTeamNameThree",
            fontFamily: "Baron-Neue-Black",
            fill: "#003981",
            originX: "left",
            originY: "center",
            top: 360,
            left: 220,
          }
        );
        name.scaleToWidth(140);
        fabricRef.current.add(name);
      }
    };

    const yourTeamNameFour = () => {
      if (yourTeamName) {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "yourTeamNameFour") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const name = new fabric.Text(
          yourTeamName[0].firstName + " " + yourTeamName[0].secondName,
          {
            selectable: false,
            className: "yourTeamNameFour",
            fontFamily: "Baron-Neue-Black",
            fill: "#003981",
            originX: "left",
            originY: "center",
            top: 430,
            left: 220,
          }
        );
        name.scaleToWidth(140);
        fabricRef.current.add(name);
      }
    };

    setTimeout(() => {
      yourTeamNameOne();
      yourTeamNameTwo();
      yourTeamNameThree();
      yourTeamNameFour();
    }, 500);
  }, [isPoster]);

  const changeCoordsOne = () => {
    if (fabricRef.current && radioOne === "gospodarz") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourTeamNameOne") {
          const obj = fabricRef.current.item(i);
          obj.set({
            selectable: false,
            top: 215,
            left: 220,
          });
          fabricRef.current.renderAll();
        }
      });
    }
    if (fabricRef.current && radioOne === "gosc") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourTeamNameOne") {
          const obj = fabricRef.current.item(i);
          obj.set({
            selectable: false,
            top: 245,
            left: 220,
          });
          fabricRef.current.renderAll();
        }
      });
    }
  };
  changeCoordsOne();

  const changeCoordsTwo = () => {
    if (fabricRef.current && radioTwo === "gospodarz") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourTeamNameTwo") {
          const obj = fabricRef.current.item(i);
          obj.set({
            selectable: false,
            top: 290,
            left: 220,
          });
          fabricRef.current.renderAll();
        }
      });
    }
    if (fabricRef.current && radioTwo === "gosc") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourTeamNameTwo") {
          const obj = fabricRef.current.item(i);
          obj.set({
            selectable: false,
            top: 310,
            left: 220,
          });
          fabricRef.current.renderAll();
        }
      });
    }
  };
  changeCoordsTwo();

  const changeCoordsThree = () => {
    if (fabricRef.current && radioThree === "gospodarz") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourTeamNameThree") {
          const obj = fabricRef.current.item(i);
          obj.set({
            selectable: false,
            top: 360,
            left: 220,
          });
          fabricRef.current.renderAll();
        }
      });
    }
    if (fabricRef.current && radioThree === "gosc") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourTeamNameThree") {
          const obj = fabricRef.current.item(i);
          obj.set({
            selectable: false,
            top: 390,
            left: 220,
          });
          fabricRef.current.renderAll();
        }
      });
    }
  };
  changeCoordsThree();

  const changeCoordsFour = () => {
    if (fabricRef.current && radioFour === "gospodarz") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourTeamNameFour") {
          const obj = fabricRef.current.item(i);
          obj.set({
            selectable: false,
            top: 430,
            left: 220,
          });
          fabricRef.current.renderAll();
        }
      });
    }
    if (fabricRef.current && radioFour === "gosc") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourTeamNameFour") {
          const obj = fabricRef.current.item(i);
          obj.set({
            selectable: false,
            top: 460,
            left: 220,
          });
          fabricRef.current.renderAll();
        }
      });
    }
  };
  changeCoordsFour();

  const matchDateOne = () => {
    if (fabricRef.current && dateOne === "") {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "dateOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }
    if (dateOne) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "dateOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(dateOne, {
        selectable: false,
        className: "dateOne",
        top: 215,
        left: 90,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      fabricRef.current.add(date);
    }
  };
  const matchHourOne = () => {
    if (hourOne) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "hourOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(hourOne, {
        selectable: false,
        className: "hourOne",
        top: 245,
        left: 90,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
        charSpacing: 300,
        fontSize: 28,
      });
      fabricRef.current.add(date);
    }
  };
  const matchOpponentOne = () => {
    if (opponentOne) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "opponentOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(opponentOne, {
        selectable: false,
        className: "opponentOne",
        top: 245,
        left: 220,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      date.scaleToWidth(140);
      fabricRef.current.add(date);
      if (fabricRef.current && radioOne == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "opponentOne") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 220,
              left: 220,
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchYourResultOne = () => {
    if (yourResultOne) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourResultOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(yourResultOne, {
        selectable: false,
        className: "yourResultOne",
        top: 225,
        left: 520,
        fontFamily: "Baron-Neue-Black",
        fill: "white",
        originX: "center",
        originY: "center",
      });
      date.scaleToHeight(90);
      if (date.width > 25) {
        date.scaleToWidth(50);
      }
      fabricRef.current.add(date);
      if (fabricRef.current && radioOne == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "yourResultOne") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 225,
              left: 590,
              originX: "center",
              originY: "center",
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchOpponentResultOne = () => {
    if (opponentResultOne) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "opponentResultOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(opponentResultOne, {
        selectable: false,
        className: "opponentResultOne",
        top: 225,
        left: 590,
        fontFamily: "Baron-Neue-Black",
        fill: "white",
        originX: "center",
        originY: "center",
      });
      date.scaleToHeight(90);
      if (date.width > 30) {
        date.scaleToWidth(50);
      }
      fabricRef.current.add(date);
      if (fabricRef.current && radioOne == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "opponentResultOne") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 225,
              left: 520,
              originX: "center",
              originY: "center",
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchDateTwo = () => {
    if (dateTwo) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "dateTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(dateTwo, {
        selectable: false,
        className: "dateTwo",
        top: 290,
        left: 90,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      fabricRef.current.add(date);
    }
  };
  const matchHourTwo = () => {
    if (hourTwo) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "hourTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(hourTwo, {
        selectable: false,
        className: "hourTwo",
        top: 320,
        left: 90,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
        charSpacing: 300,
        fontSize: 28,
      });
      fabricRef.current.add(date);
    }
  };
  const matchOpponentTwo = () => {
    if (opponentTwo) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "opponentTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(opponentTwo, {
        selectable: false,
        className: "opponentTwo",
        top: 320,
        left: 220,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      date.scaleToWidth(140);
      fabricRef.current.add(date);
      if (fabricRef.current && radioTwo == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "opponentTwo") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 290,
              left: 220,
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchYourResultTwo = () => {
    if (yourResultTwo) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourResultTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(yourResultTwo, {
        selectable: false,
        className: "yourResultTwo",
        top: 300,
        left: 520,
        fontFamily: "Baron-Neue-Black",
        fill: "white",
        originX: "center",
        originY: "center",
      });
      date.scaleToHeight(90);
      if (date.width > 25) {
        date.scaleToWidth(50);
      }
      fabricRef.current.add(date);
      if (fabricRef.current && radioTwo == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "yourResultTwo") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 300,
              left: 590,
              originX: "center",
              originY: "center",
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchOpponentResultTwo = () => {
    if (opponentResultTwo) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "opponentResultTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(opponentResultTwo, {
        selectable: false,
        className: "opponentResultTwo",
        top: 300,
        left: 590,
        fontFamily: "Baron-Neue-Black",
        fill: "white",
        originX: "center",
        originY: "center",
      });
      date.scaleToHeight(90);
      if (date.width > 30) {
        date.scaleToWidth(50);
      }
      fabricRef.current.add(date);
      if (fabricRef.current && radioTwo == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "opponentResultTwo") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 300,
              left: 520,
              originX: "center",
              originY: "center",
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchDateThree = () => {
    if (dateThree) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "dateThree") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(dateThree, {
        selectable: false,
        className: "dateThree",
        top: 360,
        left: 90,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      fabricRef.current.add(date);
    }
  };
  const matchHourThree = () => {
    if (hourThree) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "hourThree") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(hourThree, {
        selectable: false,
        className: "hourThree",
        top: 390,
        left: 90,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
        charSpacing: 300,
        fontSize: 28,
      });
      fabricRef.current.add(date);
    }
  };
  const matchOpponentThree = () => {
    if (opponentThree) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "opponentThree") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(opponentThree, {
        selectable: false,
        className: "opponentThree",
        top: 390,
        left: 220,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      date.scaleToWidth(140);
      fabricRef.current.add(date);
      if (fabricRef.current && radioThree == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "opponentThree") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 360,
              left: 220,
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchYourResultThree = () => {
    if (yourResultThree) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourResultThree") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(yourResultThree, {
        selectable: false,
        className: "yourResultThree",
        top: 370,
        left: 520,
        fontFamily: "Baron-Neue-Black",
        fill: "white",
        originX: "center",
        originY: "center",
      });
      date.scaleToHeight(90);
      if (date.width > 25) {
        date.scaleToWidth(50);
      }
      fabricRef.current.add(date);
      if (fabricRef.current && radioThree == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "yourResultThree") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 370,
              left: 590,
              originX: "center",
              originY: "center",
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchOpponentResultThree = () => {
    if (opponentResultThree) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "opponentResultThree") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(opponentResultThree, {
        selectable: false,
        className: "opponentResultThree",
        top: 370,
        left: 590,
        fontFamily: "Baron-Neue-Black",
        fill: "white",
        originX: "center",
        originY: "center",
      });
      date.scaleToHeight(90);
      if (date.width > 30) {
        date.scaleToWidth(50);
      }
      fabricRef.current.add(date);
      if (fabricRef.current && radioThree == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "opponentResultThree") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 370,
              left: 520,
              originX: "center",
              originY: "center",
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchDateFour = () => {
    if (dateFour) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "dateFour") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(dateFour, {
        selectable: false,
        className: "dateFour",
        top: 430,
        left: 90,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      fabricRef.current.add(date);
    }
  };
  const matchHourFour = () => {
    if (hourFour) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "hourFour") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(hourFour, {
        selectable: false,
        className: "hourFour",
        top: 460,
        left: 90,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
        charSpacing: 300,
        fontSize: 28,
      });
      fabricRef.current.add(date);
    }
  };
  const matchOpponentFour = () => {
    if (opponentFour) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "opponentFour") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(opponentFour, {
        selectable: false,
        className: "opponentFour",
        top: 460,
        left: 220,
        fontFamily: "Baron-Neue-Black",
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      date.scaleToWidth(140);
      fabricRef.current.add(date);
      if (fabricRef.current && radioFour == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "opponentFour") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 430,
              left: 220,
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };
  const matchYourResultFour = () => {
    if (yourResultFour) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "yourResultFour") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(yourResultFour, {
        selectable: false,
        className: "yourResultFour",
        top: 450,
        left: 520,
        fontFamily: "Baron-Neue-Black",
        fill: "white",
        originX: "center",
        originY: "center",
      });
      date.scaleToHeight(90);
      if (date.width > 25) {
        date.scaleToWidth(50);
      }
      fabricRef.current.add(date);
      if (fabricRef.current && radioFour == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "yourResultFour") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 450,
              left: 590,
              originX: "center",
              originY: "center",
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
    
  };
  const matchOpponentResultFour = () => {
    if (opponentResultFour) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "opponentResultFour") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const date = new fabric.Text(opponentResultFour, {
        selectable: false,
        className: "opponentResultFour",
        top: 450,
        left: 590,
        fontFamily: "Baron-Neue-Black",
        fill: "white",
        originX: "center",
        originY: "center",
      });
      date.scaleToHeight(90);
      if (date.width > 30) {
        date.scaleToWidth(50);
      }
      fabricRef.current.add(date);
      if (fabricRef.current && radioFour == "gosc") {
        fabricRef.current._objects.forEach((item, i) => {
          if (fabricRef.current.item(i).className == "opponentResultFour") {
            const obj = fabricRef.current.item(i);
            obj.set({
              selectable: false,
              top: 450,
              left: 520,
              originX: "center",
              originY: "center",
            });
            fabricRef.current.renderAll();
          }
        });
      }
    }
  };

  const getMonth = () => {
    if (month) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "month") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const setMonth = new fabric.Text(month.toUpperCase(), {
        selectable: false,
        className: "month",
        top: 120,
        left: 415,
        charSpacing: 150,
        fontFamily: "Baron-Neue-Black",
        fontSize: 25,
        fill: "#003981",
        originX: "right",
        originY: "center",
      });
      setMonth.scaleToHeight(30);
      fabricRef.current.add(setMonth);
    }
  };
  const getLeague = () => {
    if (fabricRef.current && league === "") {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "league") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }
    if (league) {
      fabricRef.current._objects.forEach((item, i) => {
        if (fabricRef.current.item(i).className == "league") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });

      const showLeague = new fabric.Text(league, {
        selectable: false,
        className: "league",
        width: 450,
        height: 50,
        top: 55,
        left: 250,
        charSpacing: 150,
        fontFamily: "Baron-Neue-Black",

        fontSize: 20,
        fill: "#003981",
        originX: "center",
        originY: "center",
      });
      if (showLeague.width > 250) {
        showLeague.scaleToWidth(250);
      }

      fabricRef.current.add(showLeague);
    }
  };

  getLeague();
  matchDateOne();
  matchDateTwo();
  matchDateThree();
  matchDateFour();
  matchHourOne();
  matchHourTwo();
  matchHourThree();
  matchHourFour();
  matchOpponentOne();
  matchOpponentTwo();
  matchOpponentThree();
  matchOpponentFour();
  matchYourResultOne();
  matchYourResultTwo();
  matchYourResultThree();
  matchYourResultFour();
  matchOpponentResultOne();
  matchOpponentResultTwo();
  matchOpponentResultThree();
  matchOpponentResultFour();
  getMonth();

  return <canvas id="canvas" ref={fabricRef}></canvas>;
}

import { useState, useRef, useEffect } from "react";
import { fabric } from "fabric";

export default function EventAnnouncement({
  posterBackGround,
  opponent,
  opponentName,
  yourLogo,
  league,
  date,
  place,
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
      const secondImg = new Image();
      secondImg.src = yourLogo[0].img;
      secondImg.onload = () => {
        fabric.Image.fromURL(secondImg.src, function (img) {
          img.set({
            selectable: false,
            top: 250,
            left: 200,
            originX: "center",
            originY: "center",
          });
          img.scaleToHeight(100);
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        });
      };
    };

    initFabric();
  }, []);
  useEffect(() => {
    const teamName = () => {
      if (yourLogo) {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        let yourTeamName;

        yourTeamName = yourLogo[0].firstName + " " + yourLogo[0].secondName;

        const name = new fabric.Text(yourTeamName, {
          selectable: false,
          originX: "left",
          originY: "center",
          top: 90,
          left: 150,
          fontFamily: "Baron-Neue-Black",
          fill: "#003981",
          className: "yourLogo",
        });
        name.width = 400;
        if(fabricRef.current.item(0).className == "yourLogo") {
            fabricRef.current.remove(fabricRef.current.item(0));
          }
        name.scaleToWidth(280);
        fabricRef.current.add(name);
      }
    };
    setTimeout(() => {
      teamName();
    }, 1500);
  }, [isPoster]);

  const opponentsName = () => {
    if (opponentName) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "opponentsName") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const opponentsName = new fabric.Text(opponentName, {
        selectable: false,
        top: 140,
        left: 150,
        originY: "center",
        originX: "left",
        fontSize: 25,
        fill: "#003981",
        className: "opponentsName",
        fontFamily: "Baron-Neue-Black",
      });
      opponentsName.width = 400;

      opponentsName.scaleToWidth(300);
      fabricRef.current.add(opponentsName);
    }
  };
  opponentsName();

  const opponentLogo = () => {
    if (opponent) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "opponentImage") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const opponentImg = new Image();
      opponentImg.src = opponent;
      opponentImg.onload = () => {
        fabric.Image.fromURL(opponentImg.src, function (img) {
          img.set({
            selectable: false,
            top: 250,
            left: 300,
            className: "opponentImage",
            originX: "center",
            originY: "center",
          });

          img.scaleToHeight(100);

          fabricRef.current.add(img);
        });
      };
    }
  };
  opponentLogo();

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
      const typeDate = new fabric.Text(date, {
        selectable: false,
        height: 50,
        top: 50,
        left: 155,
        originY: "center",
        originX: "left",
        fontSize: 20,
        fill: "#003981",
        className: "typeDate",
        fontFamily: "Baron-Neue-Black",
      });

      if (typeDate.width > 200) {
        typeDate.scaleToWidth(200);
      }
      fabricRef.current.add(typeDate);
    }
  };

  typeDate();

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
        width: 250,
        height: 50,
        top: 30,
        left: 160,
        charSpacing: 170,
        fontFamily: "Baron-Neue-Black",

        fontSize: 10,
        fill: "#003981",
        originX: "left",
        originY: "center",
      });
      if (showLeague.width > 250) {
        showLeague.scaleToWidth(250);
      }
      showLeague.charSpacing = 170;

      fabricRef.current.add(showLeague);
    }
  };

  getLeague();

  const typePlace = () => {
    if (fabricRef.current && place === "") {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typePlace") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }
    if (place) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typePlace") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const typePlace = new fabric.Text(place, {
        selectable: false,
        height: 50,
        charSpacing: 150,
        textAlign: "center",
        top: 170,
        left: 150,
        width: 200,
        className: "typePlace",
        fontSize: 20,
        fill: "#cdb953",
        originX: "left",
        originY: "center",
        fontFamily: "Baron-Neue-Black",
      });

      if (typePlace.width > 250) {
        typePlace.scaleToWidth(250);
      }
      fabricRef.current.add(typePlace);
    }
  };

  typePlace();

  return <canvas id="canvas" ref={fabricRef}></canvas>;
}

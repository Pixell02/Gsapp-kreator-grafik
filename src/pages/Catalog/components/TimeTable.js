import {useState, useEffect, useRef} from 'react'
import { fabric } from "fabric";

export default function TimeTable({ 
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
  yourTeamName,
  month,
  league,
  radioOne,
  radioTwo,
  radioThree,
  radioFour}) {
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
            top: 140,
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
            top: 210,
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
            top: 140,
            left: 520,
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
            top: 210,
            left: 520,
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


    return <canvas id="canvas" ref={fabricRef}></canvas>;
  
}

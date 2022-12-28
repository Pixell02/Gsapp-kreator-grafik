import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";

function FabricCanvas({ poster, selectedPlayer, opponent, yourLogo, date, opponentName, Sponsors }) {
  const [isPoster, setIsPoster] = useState();
  const backImg = new Image();
  backImg.src = poster[0].background;
  
  const { id } = useParams();
  const canvasRef = useRef();
  const fabricRef = useRef();
  const [width, setWidth] = useState(backImg.width);
  const [height, setHeight] = useState(backImg.height);
  const [logo, setLogo] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  useEffect(() => {});

  

  const typeDate = () => {
    if (date) {
      console.log(date);
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typeDate") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const typeDate = new fabric.Textbox(date, {
        selectable: false,
        width: 50,
        textAlign: "center",
        top: 235,
        left: 295,
        className: "typeDate",
        fontSize: 20,
        fill: "white",
        originX: "center",
        originY: "center",
      });

      fabricRef.current.add(typeDate);
    }
  };

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
        const opponentImage = new fabric.Image(opponentImg, {
          selectable: false,
          top: 460,
          left: 450,
          className: "opponentImage",
          originX: "center",
          originY: "center",
        });
        opponentImage.scaleToHeight(100);

        fabricRef.current.add(opponentImage);
      };
      
    }
  };
  const opponentsName = () => {
    if(opponentName) {
    fabricRef.current._objects.forEach((image, i) => {
    if(fabricRef.current.item(i).className == "opponentsName") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
        const opponentsName = new fabric.Textbox(opponentName, {
          selectable: false,
        top: 470,
        left: 120,
        width: 200,
        fontSize: 30,
        fill: "yellow",
        className: "opponentsName",
      })
      fabricRef.current.add(opponentsName);
    }
  }

  useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: false,
        width: width,
      });
      poster.map((poster) => {
        const img = new Image();
        img.src = poster.background;
        img.onload = () => {
          const newImg = new fabric.Image(img);
          fabricRef.current.width = img.width;
          fabricRef.current.setBackgroundImage(
            newImg,
            fabricRef.current.renderAll.bind(fabricRef.current)
          );
          setIsPoster(newImg);
          document.querySelector(".lower-canvas").style.width =
            img.width + "px";
          document.querySelector(".lower-canvas").style.height =
            img.height + "px";
          document.querySelector(".lower-canvas").width = img.width;
          document.querySelector(".lower-canvas").height = img.height;
          document.querySelector(".upper-canvas").width = img.width;
          document.querySelector(".upper-canvas").height = img.height;
          document.querySelector(".upper-canvas").style.width =
            img.width + "px";
          document.querySelector(".upper-canvas").style.height =
            img.height + "px";
          document.querySelector(".canvas-container").style.width =
            img.width + "px";
          document.querySelector(".canvas-container").style.height =
            img.height + "px";
        };
        fabricRef.current.width = img.width;
        fabricRef.current.height = img.height;
        const canvasBlock = document.querySelector(".canvas-container");
        const sponsorBlock = document.createElement("div");
        sponsorBlock.className = "sponsor-container";
        sponsorBlock.style.width = img.width + "px";
        canvasBlock.appendChild(sponsorBlock);
        Sponsors.forEach((sponsor) => {
          let img = document.createElement("img");
          img.className = "sponsor-image"
          img.src =sponsor.img
          sponsorBlock.appendChild(img)
        })
      });
    };
    initFabric();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "Teams", id);
    getDoc(docRef).then((doc) => {
      let result = doc.data();
      setLogo(result.img);

      const yourLogo = new Image();
      yourLogo.src = result.img;
      yourLogo.onload = () => {
        const fabricImage = new fabric.Image(yourLogo, {
          selectable: false,
          top: 460,
          left: 330,
          originX: "center",
          originY: "center",
        });
        fabricImage.scaleToWidth(100);
        fabricRef.current.add(fabricImage);
      };
    });
  }, [isPoster]);
useEffect(() => {
const teamName = () => {
    const name = new fabric.Textbox(yourLogo.firstName, {
      selectable: false,
      top: 400,
      left: 50,
      fill: "white",
      fontSize: 55
    })
    fabricRef.current.add(name)
  }
  teamName()
},[isPoster]);

useEffect(() => {
const vs = () => {
  const vs = new fabric.Text("VS", {
    selectable: false,
    top:470,
    left:50,
    fill: "yellow"
  })
  fabricRef.current.add(vs)
}
  vs()
},[isPoster])

  opponentLogo();
  opponentsName();
  typeDate();

  return (
    <canvas id="canvas" ref={fabricRef} width={width} height={height}></canvas>
  );
}

export default FabricCanvas;

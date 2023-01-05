import '../../../fonts/Russo_One.ttf';
import '../../../fonts/Poppins-BoldItalic.ttf';
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";

function FabricCanvas({poster,selectedPlayer,opponent,yourLogo,date,opponentName}) {
  
  const [isPoster, setIsPoster] = useState(null);
  const backImg = new Image();
  backImg.src = poster.background;
  const [yourTeamLogo, setYourTeamLogo] = useState(yourLogo)
  const { user } = useAuthContext();
  const canvasRef = useRef();
  const fabricRef = useRef();
  
  const [logo, setLogo] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  

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
        charSpacing: 200,
        height: 50,
        textAlign: "center",
        top: 238,
        left: 305,
        width: 450,
        className: "typeDate",
        fontSize: 20,
        fill: "white",
        originX: "center",
        originY: "center",
        fontFamily: "Poppins-italic"
      });
      
      if(typeDate.width > 450) {
        typeDate.scaleToWidth(450)
      }
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
        fabric.Image.fromURL(opponentImg.src, function(img) {
          img.set({
          selectable: false,
          top: 460,
          left: 470,
          className: "opponentImage",
          originX: "center",
          originY: "center",
          })
          
          img.scaleToHeight(150);
          
        fabricRef.current.add(img);
        });
        
      };
    }
  };
  const opponentsName = () => {
    if (opponentName) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "opponentsName") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const opponentsName = new fabric.Text(opponentName, {
        selectable: false,
        top: 483,
        left: 90,
        originY: "center",
        originX: "left",
        fontSize: 30,
        width: 200,
        fill: "#d1a75f",
        className: "opponentsName",
        fontFamily: "Poppins-italic"
      });
      
      opponentsName.scaleToWidth(140);
      fabricRef.current.add(opponentsName);
    }
  };

  useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: false,
        width: backImg.width,
        height: backImg.height
      });
        const img = new Image();
        img.src = poster.background;
        img.onload = () => {
          const newImg = new fabric.Image.fromURL(img.src, function (img) {
            
            fabricRef.current.setBackgroundImage(
              img,
              fabricRef.current.renderAll.bind(fabricRef.current)
            );
          });

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
        }
        const secondImg = new Image();
        secondImg.src = yourTeamLogo[0].img;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function(img) {
            img.set({
            selectable: false,
            top: 460,
            left: 330,
            originX: "center",
            originY: "center",
            })
            img.scaleToHeight(150);
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
          });
          
        }
        const thirdImg = new Image();
        thirdImg.src = yourTeamLogo[0].img;
        thirdImg.onload = () => {
          fabric.Image.fromURL(thirdImg.src, function(img) {
            img.set({
              selectable: false,
              originX: "center",
              originY: "center",
              top: 50,
              left: 50
            })
            img.scaleToHeight(70);
            fabricRef.current.add(img);
          fabricRef.current.renderAll();
          })
        }
        
    };
    initFabric();
  }, []);
  
  
  useEffect(() => {
    const teamName = () => {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "yourLogo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      
      const name = new fabric.Text(yourLogo[0].firstName, {
        selectable: false,
        originX: "left",
        originY: "center",
        top: 440,
        left: 30,
        fill: "white",
        fontFamily: "Poppins-italic",
        className:"yourLogo"
      });
      console.log(name)
      // if(fabricRef.current.item(0).className == "yourLogo") {
      //   fabricRef.current.remove(fabricRef.current.item(0));
      // }
      
      name.scaleToWidth(150);
      fabricRef.current.add(name);
      
    };
    setTimeout(() => {
      teamName();
    },100)
    
  }, [isPoster]);

 

  opponentLogo();
  opponentsName();
  typeDate();
  return (
    <canvas id="canvas" ref={fabricRef} width={backImg.width} height={backImg.height}></canvas>
  );
}

export default FabricCanvas;

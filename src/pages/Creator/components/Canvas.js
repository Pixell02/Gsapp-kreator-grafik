import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";

function FabricCanvas({poster, selectedPlayer, opponent, sponsors}) {
  
    const { id } = useParams()
    const canvasRef = useRef()
    const fabricRef = useRef()
    
    const [logo, setLogo] = useState({});

        const addYourTeamLogo = () => {
        const docRef =  doc(db, "Teams", id)
         getDoc(docRef) 
         .then((doc) => {
          let result = doc.data();
          const yourTeamImg = new Image();
          yourTeamImg.src = result.img;
          yourTeamImg.onload = () => {
           const fabricImage = new fabric.Image(yourTeamImg, {
            selectable: false,
            left: 300,
            top: 320
           })
           fabricImage.scaleToHeight(100)
            fabricRef.current.add(fabricImage)
            fabricRef.current.renderAll();
            }
         })
         
       }
    useEffect(() => {
      
      const initFabric = () => {
        fabricRef.current = new fabric.Canvas(canvasRef.current, {
          selection: false
        });
         poster.map((poster) => {
        
        const img = new Image()
        img.src = poster.background;
        img.onload = () => {
          const newImg = new fabric.Image(img);
          fabricRef.current.setBackgroundImage(newImg, fabricRef.current.renderAll.bind(fabricRef.current))
          document.querySelector('.lower-canvas').style.width = img.width + "px";
          document.querySelector('.lower-canvas').style.height = img.height + "px";
          document.querySelector('.lower-canvas').width = img.width ;
          document.querySelector('.lower-canvas').height = img.height ;
          document.querySelector('.upper-canvas').width = img.width;
          document.querySelector('.upper-canvas').height = img.height;
          document.querySelector('.upper-canvas').style.width = img.width + "px";
          document.querySelector('.upper-canvas').style.height = img.height + "px";
          document.querySelector('.canvas-container').style.width = img.width + "px";
          document.querySelector('.canvas-container').style.height = img.height + "px";
          const canvasBlock = document.querySelector('.canvas-container')
        const sponsorBlock = document.createElement("div");
        sponsorBlock.className = "sponsor-container";
        sponsorBlock.style.width = img.width + "px";
        canvasBlock.appendChild(sponsorBlock);
          
       }         
      })      
      }
     
        
      initFabric();
       
     
      addYourTeamLogo();
      
    },[])
    
    
    
    
    return (
        <canvas  ref={canvasRef}></canvas>
        
    )
}

export default FabricCanvas;
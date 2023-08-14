import { addDoc, collection, deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import html2canvas from "html2canvas";
import { db } from "../../../firebase/config";
import watermarkImg from "../../../img/2.svg";
import { fabric } from "fabric";

export const exportImg = (Licenses, posters, user, poster,type) => {
  const image = document.querySelector(".canvas-container");
  const canvasRes = document.querySelector("#canvas");
  const transform = document.querySelector(".react-transform-component");
  transform.style.transform = 'scale(1)';
  const resCanv = document.querySelector(".resposive-canvas");
  if (Licenses[0].license === "free-trial") {
    const watermarkPlace = document.querySelectorAll(".canvas-container")[0];
    const watermark = document.createElement("img");
    watermark.className = "watermark-img";
    watermark.src = watermarkImg;
    image.appendChild(watermark);
  }
  
 
    html2canvas(image, { scale: 1 }).then((canvas) => {
    
      const dataURL = canvas.toDataURL("image/jpeg", 1.0);

      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = dataURL;
      link.click();
    

      const docRef = doc(db, "user", Licenses[0].id);
      if (Licenses[0].license === "free-trial") {
        updateDoc(docRef, {
          numberOfFreeUse: Licenses[0].numberOfFreeUse - 1,
        });
      }
      let checkLicense = [];
      const colRef = doc(db, "user", Licenses[0].id);
      getDoc(colRef).then((doc) => {
        checkLicense.push(doc.data());
        if (checkLicense[0].license === "free-trial") {
          if (checkLicense[0].numberOfFreeUse < 1) {
            updateDoc(docRef, {
              license: "no-license",
              numberOfFreeUse: deleteField(),
            });
          }
        }
      });
      if (Licenses[0].license === "free-trial") {
        document.querySelector(".watermark-img").remove();
      }
      
      posters.createdDate = Date.now();
      posters.posterId = poster;
      posters.user = user.uid;
      const generatorRef = collection(db, "generated");
      addDoc(generatorRef, posters);
    });
 
  
  
};

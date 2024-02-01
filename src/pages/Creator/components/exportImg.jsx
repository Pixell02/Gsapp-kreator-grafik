import { addDoc, collection, deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import html2canvas from "html2canvas";
import { db } from "../../../firebase/config";
import watermarkImg from "../../../img/2.svg";

export const exportImg = (Licenses, posters, user, poster) => {
  const image = document.querySelector(".canvas-container");
  const transform = document.querySelector(".react-transform-component");
  transform.style.transform = "scale(1)";
  if (Licenses.license === "free-trial") {
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

    const docRef = doc(db, "user", Licenses.id);
    if (Licenses.license === "free-trial") {
      updateDoc(docRef, {
        numberOfFreeUse: Licenses.numberOfFreeUse - 1,
      });
    }
    const colRef = doc(db, "user", Licenses.id);
    getDoc(colRef).then((doc) => {
      const license = doc.data();
      console.log(license);
      if (license.license === "free-trial") {
        if (license.numberOfFreeUse < 1) {
          updateDoc(docRef, {
            license: "no-license",
            numberOfFreeUse: deleteField(),
          });
        }
      }
    });
    if (Licenses.license === "free-trial") {
      document.querySelector(".watermark-img").remove();
    }

    const generatorRef = collection(db, "generated");
    addDoc(generatorRef, {
      createdDate: Date.now(),
      posterId: poster,
      user: user.uid,
    });
  });
};

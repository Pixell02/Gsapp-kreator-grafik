import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const AdditionalImageLayer = ({ additionalLayer, fabricRef }) => {

  const imageRef = useRef(null)
  
  useEffect(() => {
      if (additionalLayer) {
      const img = new Image();
      img.src = additionalLayer;
         img.onload = () => {
           fabric.Image.fromURL(img.src, function (img) {
             img.set({
               selectable: false,
               className: "additionalLayer"
          })
             fabricRef.current.add(img);
             fabricRef.current.bringToFront();
          fabricRef.current.renderAll();
        });
      };
    }
   console.log(fabricRef.current)
  }, [additionalLayer, fabricRef.current._objects]);

  return <div></div>;
};

export default AdditionalImageLayer;

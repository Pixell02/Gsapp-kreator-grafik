
import { fabric } from "fabric";
import useImageRefProvider from "./useImageRefProvider";

const useFabricCanvas = () => {
  
  const { imageRef } = useImageRefProvider();
  const initFabric = (fabricRef, image) => {
    if (!fabricRef.current?._objects) {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: true,
        width: image.width,
        height: image.height,
      });
    }
    if (imageRef.current) {
      imageRef.current.setSrc(image.src, () => {
        fabricRef.current.renderAll();
      });
      
    } else {
        fabric.Image.fromURL(image.src, function (img) {
        img.set({
          selectable: false,
        })
        
        fabricRef.current.add(img);
        fabricRef.current.renderAll();
        imageRef.current = img;
      });
    }
    
  };
  
  return { initFabric };
}

export default useFabricCanvas;
import { useEffect } from "react";
import useCanvasPropertiesContext from "./hooks/useCanvasPropertiesContext";
import useFabricCanvas from "./hooks/useFabricCanvas";

function Canvas({ dataURL, fabricRef }) {
  const { width, setWidth, height, setHeight } = useCanvasPropertiesContext();
  const { initFabric } = useFabricCanvas();
  // const { documents: sponsors } = useCollection("Sponsors", ["uid", "==", user.uid])
  useEffect(() => {
    const img = new Image();
    img.src = dataURL;
    if (!dataURL) return;
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      const image = {
        src: img.src,
        width: img.width,
        height: img.height,
      };
      initFabric(fabricRef, image);
    };
  }, [dataURL, fabricRef]);

  return (
    <>
      {/* <div className="sponsors-container" style={{height: "150px", width: "250px"}}>
      {sponsors?.map((image, index) => (
        <img key={index} src={image.img} alt={`Img ${index + 1}`} />
      ))}
    </div> */}
      <canvas id="canvas" className="resposive-canvas" ref={fabricRef} width={width} height={height} />
    </>
  );
}

export default Canvas;

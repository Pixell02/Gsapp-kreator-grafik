import { useEffect } from "react";
import useCanvasPropertiesContext from "./hooks/useCanvasPropertiesContext";
import useFabricCanvas from "./hooks/useFabricCanvas";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import useSponsors from "./hooks/useSponsors";

function Canvas({ dataURL, fabricRef, coords }) {
  const { width, setWidth, height, setHeight } = useCanvasPropertiesContext();
  const { initFabric } = useFabricCanvas();
  const { user } = useAuthContext();
  const { documents: sponsors } = useCollection("Sponsors", ["uid", "==", user.uid]);
  const { sponsorsArray, sponsorHeight } = useSponsors(sponsors, coords);

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
    <div className="render-container">
      <div
        id="sponsors-container"
        className="sponsors-container"
        style={{
          height: `${coords?.Height}px`,
          width: `${coords?.Width}px`,
          backgroundColor: `${coords?.Fill}`,
          top: `${coords?.Top}px`,
          left: `${coords?.Left}px`,
        }}
      >
        {sponsorsArray?.map((image) => (
          <img src={image?.img} style={{ height: `${sponsorHeight}px` }} alt="Img ${i + 1}" />
        ))}
      </div>
      <canvas id="canvas" className="resposive-canvas" ref={fabricRef} width={width} height={height} />
    </div>
  );
}

export default Canvas;

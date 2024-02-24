import { LegacyRef, useEffect } from "react";
import useFabricCanvas from "./hooks/useFabricCanvas";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import useSponsors from "./hooks/useSponsors";
import { useCanvasPropertiesContext } from "./context/CanvasPropertiesContext";
import { Sponsor } from "../../types/teamTypes";
import { SponsorBlock } from "../../types/creatorComponentsTypes";

type props = {
  dataURL: string | ArrayBuffer;
  fabricRef: LegacyRef<HTMLCanvasElement>;
  coords?: SponsorBlock;
};

function Canvas({ dataURL, fabricRef, coords }: props) {
  const { resolution, setResolution } = useCanvasPropertiesContext();
  const { initFabric } = useFabricCanvas();
  const { user } = useAuthContext();
  const { documents: sponsors } = useCollection<Sponsor>("Sponsors", ["uid", "==", user.uid]);
  const { sponsorsArray, sponsorHeight } = useSponsors(sponsors, coords);

  useEffect(() => {
    const img = new Image();
    img.src = dataURL as string;
    if (!dataURL) return;
    img.onload = () => {
      setResolution({ width: img.width, height: img.height });
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
      <canvas
        id="canvas"
        className="resposive-canvas"
        ref={fabricRef}
        width={resolution.width}
        height={resolution.height}
      />
    </div>
  );
}

export default Canvas;

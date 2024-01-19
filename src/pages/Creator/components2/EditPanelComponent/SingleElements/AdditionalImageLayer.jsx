import { fabric } from "fabric";
import { useEffect } from "react";
import { useThemeContext } from "../../../context/ThemeContext";

const AdditionalImageLayer = ({ fabricRef }) => {
  const { additionalLayer } = useThemeContext();

  useEffect(() => {
    if (additionalLayer) {
      const img = new Image();
      img.src = additionalLayer;
      img.onload = () => {
        fabric.Image.fromURL(img.src, function (img) {
          img.set({
            selectable: false,
            className: "additionalLayer",
          });
          fabricRef.current.add(img);
          fabricRef.current.bringToFront();
          fabricRef.current.renderAll();
        });
      };
    }
  }, [additionalLayer, fabricRef.current?._objects]);

  return <div></div>;
};

export default AdditionalImageLayer;

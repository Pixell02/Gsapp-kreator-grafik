import React, { useState } from "react";

import { useRef } from "react";
import useFile from "../../../hooks/useFile";
import useIsActive from "../../../hooks/useIsActive";
import { fabric } from "fabric";

const Images = ({ coords, fabricRef, filters }) => {
  const fileInputRef = useRef(null);
  const { isActive, handleActiveObject, handleDeActiveObject } = useIsActive(fabricRef);
  const { handleFileChange, isImage, handleDeleteImage } = useFile(fabricRef, coords, filters);

  const [isClipped, setIsClipped] = useState(false);
  const handleClipPath = (image) => {
    var topValue = coords.Top;
    var leftValue = coords.Left;
    var widthValue = coords.Width;
    var heightValue = coords.Height;
    const pathDefinition = `M ${leftValue} ${topValue} L ${leftValue + widthValue} ${topValue} L ${
      leftValue + widthValue
    } ${topValue + heightValue} L ${leftValue} ${topValue + heightValue} Z`;
    const shell = new fabric.Path(pathDefinition, {
      fill: "",
      originX: "center",
      originY: "center",
    });

    var clipPath = new fabric.Path(pathDefinition, {
      absolutePositioned: true,
    });
    shell.on("moving", () => {
      clipPath.setPositionByOrigin(shell.getCenterPoint(), "center", "center");
      image.set("dirty", true);
    });
    image.set({
      clipPath: clipPath,
    });

    setIsClipped(true);
    fabricRef.current.add(shell);
    fabricRef.current.renderAll();
  };
  const handleDeleteClipPath = (image) => {
    delete image.clipPath;
    fabricRef.current.renderAll();
    setIsClipped(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="d-flex mt-5">
      {!isImage && (
        <>
          <button className="btn" onClick={handleButtonClick} disabled={isImage}>
            Dodaj zdjęcie
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </>
      )}

      {isImage && (
        <button onClick={() => handleDeleteImage()} className="btn ml-5">
          Usuń
        </button>
      )}
      {isImage && !isActive && (
        <div>
          <button className="btn" onClick={() => handleActiveObject(isImage)}>
            Wybierz
          </button>
          {!isClipped ? (
            <button onClick={() => handleClipPath(isImage)} className="btn">
              Kadruj
            </button>
          ) : (
            <button className="btn" onClick={() => handleDeleteClipPath(isImage)}>
              Wył kadr
            </button>
          )}
        </div>
      )}
      {isImage && isActive && (
        <div className="d-flex flex-column">
          <button className="btn ml-5" onClick={() => handleDeActiveObject(isImage)}>
            Ustaw
          </button>
          {/* <ImageProperties /> */}
        </div>
      )}
    </div>
  );
};

export default Images;

import React from "react";

import { useRef } from "react";
import useFile from "../../../hooks/useFile";
import useIsActive from "../../../hooks/useIsActive";
import ImageProperties from "./ImageProperties";

const Images = ({ coords, fabricRef, filters }) => {
  const fileInputRef = useRef(null);
  const { isActive, handleActiveObject, handleDeActiveObject } = useIsActive(fabricRef);
  const { handleFileChange, isImage, handleDeleteImage } = useFile(fabricRef, coords, filters);

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
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
        </>
      )}

      {isImage && (
        <button onClick={() => handleDeleteImage()} className="btn ml-5">
          Usuń
        </button>
      )}
      {isImage && !isActive && (
        <button className="btn ml-5" onClick={() => handleActiveObject(isImage)}>
          Wybierz
        </button>
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

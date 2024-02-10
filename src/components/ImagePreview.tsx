import React, { Dispatch, SetStateAction } from "react";
import bin from "../img/binIcon.png";
import "./imagePreview.css";

type props<T> = {
  preview: string | null | undefined;
  setState: Dispatch<SetStateAction<T>>;
};

const ImagePreview = <T,>({ preview, setState }: props<T>) => {
  return (
    <div className="add-logo-window">
      {preview && (
        <>
          <div className="image-container">
            <img src={preview} className="image" alt="preview" />
          </div>
          <div className="bin-container">
            <img src={bin} onClick={() => setState((prev) => ({ ...prev, img: "" }))} alt="bin" />
          </div>
        </>
      )}
    </div>
  );
};

export default ImagePreview;

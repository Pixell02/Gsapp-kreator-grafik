import React from "react";
import bin from "../img/binIcon.png";
import "./imagePreview.css";
const ImagePreview = ({ preview, setPreview }) => {
  return (
    <div className="add-logo-window">
      <div className="image-container">
        {preview && <img src={preview} className="image" alt="preview" />}
      </div>
      <div className="bin-container">
        {preview && (
          <img src={bin} onClick={() => setPreview(null)} alt="bin" />
        )}
      </div>
    </div>
  );
};

export default ImagePreview;

import React, { useContext, useState } from "react";
import { ManyBackgroundsContext } from "../../posterCreator/Context/ManyBackgroundsContext";
import Draggable from "react-draggable";
import { BackgroundContext } from "../../posterCreator/Context/BackgroundContext";
import { fabric } from "fabric";
import { useEffect } from "react";
import useDefaultBackgrounds from "../hooks/useDefaultBackgrounds";

export default function ThemeBackgroundWindow({ backgrounds, fabricRef }) {
  const [position, setPosition] = useState({ x: 0, y: -300 });
 
  const { defaultBackgrounds, handleDefaultBackgroundChangeName } = useDefaultBackgrounds(backgrounds?backgrounds:null);

  const { manyBackgrounds, setManyBackgrounds } = useContext(ManyBackgroundsContext);
  const { image, setImage, setColor } = useContext(BackgroundContext);

  function handleFileUpload(e) {
    const files = e.target.files;
    const fileList = Array.from(files);
    const updatedBackgrounds = fileList.map((file) => ({
      file,
      name: file.name.split(".")[0],
      preview: URL.createObjectURL(file), // Create preview URL
    }));
    setManyBackgrounds([...manyBackgrounds, ...updatedBackgrounds]);
  }

  const handleMainNameChange = (e) => {
    const newName = e.target.value;
    setImage((prev) => ({
      ...prev,
      name: newName,
    }));
  };

  function handleNameChange(e, i) {
    const newName = e.target.value;
    const updatedManyBackgrounds = [...manyBackgrounds];
    updatedManyBackgrounds[i] = {
      ...updatedManyBackgrounds[i],
      name: newName,
    };
    setManyBackgrounds(updatedManyBackgrounds);
  }
  const handleSelectColor = (color) => {
    setColor(color);
    fabric.Image.fromURL(color.preview ? color.preview : color.src, function (img) {
      fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
    });
  };

  function handleDrag(e, ui) {
    const { x, y } = ui;
    setPosition({ x, y });
  }

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={position}
      position={null}
      grid={[10, 1]}
      scale={1}
      onDrag={handleDrag}
    >
      <div className="window">
        <div className="handle d-flex flex-row">
          <div className="d-flex align-items-center">tła</div>
          <div className="w-100 d-flex justify-content-end">
            <label htmlFor="file-input" className="file-input-label">
              Dodaj tła
            </label>
            <input id="file-input" type="file" multiple onChange={handleFileUpload} className="file-input" />
          </div>
        </div>
        <div className="content w-100 d-flex flex-column justify-content-center">
          {defaultBackgrounds &&
            defaultBackgrounds.map((image, i) => (
              <div className="d-flex w-100 flex-row" key={image.name}>
                <div className="w-25">
                  <img src={image.src} style={{ maxWidth: "50px" }} alt="Background" />
                </div>
                <input value={image.color} onChange={(e) => handleDefaultBackgroundChangeName(e, i)} />
                <button onClick={() => handleSelectColor(image)} className="btn">
                    wybierz
                  </button>
              </div>
            ))}

          {image && (
            <div className="d-flex w-100 flex-row h-100" key={image.name}>
              <div className="w-25">
                <img src={image.preview} style={{ maxWidth: "50px" }} alt="Background" />
              </div>
              <input type="text" value={image.name} onChange={handleMainNameChange} className="w-50" />
              <button onClick={() => handleSelectColor(image)} className="btn">
                wybierz
              </button>
            </div>
          )}
          <hr />
          {manyBackgrounds &&
            manyBackgrounds.map((image, i) => (
              <div className="d-flex w-100 flex-row" key={i}>
                <div className="w-25">
                  {image.preview && (
                      <img src={image.preview} style={{ maxWidth: "50px" }} alt="Background" />
                 
                  )}
                  {!image.preview && (
                    <div className="preview-placeholder" style={{ width: "50px" }}>
                      Brak podglądu
                    </div>
                  )}
                </div>
                <input type="text" value={image.name} onChange={(e) => handleNameChange(e, i)} />

                  <button onClick={() => handleSelectColor(image)} className="btn">
                    wybierz
                  </button>
              </div>
            ))}
        </div>
      </div>
    </Draggable>
  );
}

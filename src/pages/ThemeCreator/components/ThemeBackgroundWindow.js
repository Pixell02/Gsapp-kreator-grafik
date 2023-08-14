import React, { useContext, useState } from "react";
import { ManyBackgroundsContext } from "../../posterCreator/Context/ManyBackgroundsContext";
import Draggable from "react-draggable";
import { BackgroundContext } from "../../posterCreator/Context/BackgroundContext";
import { fabric } from "fabric";
import  BackgroundItem  from "./ThemeBackgroundWindow/BackgroundItem";
import useDefaultBackgrounds from "../hooks/useDefaultBackgrounds";
import "./themeBackgroundWindow.css";
import useFileDelete from "../hooks/useFileDelete";

export default function ThemeBackgroundWindow({ backgrounds, fabricRef }) {
  const [position, setPosition] = useState({ x: 0, y: -300 });

  const { defaultBackgrounds, handleDefaultBackgroundChangeName } = useDefaultBackgrounds(
    backgrounds || null
  );
  const { manyBackgrounds, setManyBackgrounds } = useContext(ManyBackgroundsContext);
  const { handleDeleteFile, handleDeleteLinkFile } = useFileDelete(backgrounds || null);
  
  const { image, setImage, setColor } = useContext(BackgroundContext);
  function handleFileUpload(e) {
    const files = e.target.files;
    const fileList = Array.from(files);
    const updatedBackgrounds = fileList.map((file) => ({
      file,
      color: file.name.split(".")[0],
      src: URL.createObjectURL(file), // Create preview URL
    }));
    setManyBackgrounds([...manyBackgrounds, ...updatedBackgrounds]);
  }

  const handleMainNameChange = (e) => {
    const newName = e.target.value;

    setImage((prev) => ({
      ...prev,
      color: newName,
    }));
  };

  function handleNameChange(e, i) {
    const newName = e.target.value;
    const updatedManyBackgrounds = [...manyBackgrounds];
    updatedManyBackgrounds[i] = {
      ...updatedManyBackgrounds[i],
      color: newName,
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
          <div className="d-flex align-items-center">
            <label htmlFor="layers" className="file-input-label">
              tła
            </label>
          </div>
          <label htmlFor="layers" className="file-input-label">
            Warstwy
          </label>{" "}
          <span className="d-flex w-100">nie działa jeszcze</span>
          <div className="w-100 d-flex justify-content-end">
            <label htmlFor="file-input" className="file-input-label">
              Dodaj tła
            </label>
            <input id="file-input" type="file" multiple onChange={handleFileUpload} className="file-input" />
          </div>
        </div>
        <div className="content w-100 d-flex flex-column overflow-scroll">
          {defaultBackgrounds?.map((item, i) => (
            <BackgroundItem
              item={item}
              i={i}
              handleNameChange={handleDefaultBackgroundChangeName}
              handleSelectColor={handleSelectColor}
              handleDeleteItem={handleDeleteLinkFile}
            />
            // <div className="d-flex w-100 flex-row" key={item.name}>
            //   <div className="w-25">
            //     <img src={item.src} style={{ maxWidth: "50px" }} alt="Background" />
            //   </div>
            //   <input value={item.color} onChange={(e) => handleDefaultBackgroundChangeName(e, i)} />
            //   <button onClick={() => handleSelectColor(item)} className="btn">
            //     wybierz
            //   </button>
            // </div>
          ))}

          {image && (
            <div className="d-flex w-100 flex-row">
              <div className="w-25">
                <img src={image.src} style={{ maxWidth: "50px" }} alt="Background" />
              </div>
              <input value={image.color} onChange={(e) => handleMainNameChange(e)} className="w-50" />
              <button onClick={() => handleSelectColor(image)} className="btn">
                wybierz
              </button>
            </div>
          )}
          <hr />
          {manyBackgrounds?.map((item, i) => (
            <BackgroundItem
              item={item}
              i={i}
              handleNameChange={handleNameChange}
              handleSelectColor={handleSelectColor}
              handleDeleteItem={handleDeleteFile}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
}

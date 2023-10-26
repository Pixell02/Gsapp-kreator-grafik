import { fabric } from "fabric";
import React, { useContext } from "react";
import useImageRefProvider from "../../../Creator/hooks/useImageRefProvider";
import { BackgroundContext } from "../../../posterCreator/Context/BackgroundContext";
import { ManyBackgroundsContext } from "../../../posterCreator/Context/ManyBackgroundsContext";
import useDefaultBackgrounds from "../../hooks/useDefaultBackgrounds";
import useFileDelete from "../../hooks/useFileDelete";
import BackgroundItem from "./BackgroundItem";

const BackgroundScreen = ({ backgrounds, fabricRef }) => {
  const { imageRef } = useImageRefProvider();
  const { image, setImage, setColor } = useContext(BackgroundContext);
  const { manyBackgrounds, setManyBackgrounds } = useContext(ManyBackgroundsContext);
  const { handleDefaultBackgroundChangeName } = useDefaultBackgrounds(backgrounds);
  const { handleDeleteFile, handleDeleteLinkFile, handleDeleteImage } = useFileDelete(setImage);

  const handleSelectColor = (color) => {
    setColor(color.color);
    fabric.Image.fromURL(color.preview ? color.preview : color.src, function (img) {
      imageRef.current.setSrc(color.preview ? color.preview : color.src, () => {
        fabricRef.current.renderAll();
      });
    });
  };

  const handleAddAdditionalLayer = (file) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      fabric.Image.fromURL(image.src, function (img) {
        img.set({ selectable: false });
        fabricRef.current.add(img);
        fabricRef.current.bringForward(img);
        fabricRef.current.renderAll();
      });
    };
    setImage((prev) => ({
      ...prev,
      additionalLayer: file,
    }));
  };

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

  return (
    <>
      {backgrounds?.map((item, i) => (
        <>
          {item.src !== image.src && (
            <BackgroundItem
              key={i}
              item={item}
              i={i}
              handleNameChange={handleDefaultBackgroundChangeName}
              handleSelectColor={handleSelectColor}
              handleDeleteItem={handleDeleteLinkFile}
            />
          )}
        </>
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
          <button onClick={() => handleDeleteImage(image)} className="btn">
            usuń
          </button>
          <label
            style={{
              width: "80px",
              height: "36px",
              backgroundColor: "#444444",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="file"
              accept="image"
              style={{ opacity: 0 }}
              onChange={(e) => handleAddAdditionalLayer(e.target.files[0])}
            />
            <span>Dodaj warstwę</span>
          </label>
        </div>
      )}
      <hr />
      {manyBackgrounds?.map((item, i) => (
        <BackgroundItem
          key={i}
          item={item}
          i={i}
          handleNameChange={handleNameChange}
          handleSelectColor={handleSelectColor}
          handleDeleteItem={handleDeleteFile}
        />
      ))}
    </>
  );
};

export default BackgroundScreen;

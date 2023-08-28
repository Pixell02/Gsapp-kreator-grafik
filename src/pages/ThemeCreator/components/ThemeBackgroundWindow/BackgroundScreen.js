import React, { useContext } from "react";
import BackgroundItem from "./BackgroundItem";
import { BackgroundContext } from "../../../posterCreator/Context/BackgroundContext";
import { ManyBackgroundsContext } from "../../../posterCreator/Context/ManyBackgroundsContext";
import useImageRefProvider from "../../../Creator/hooks/useImageRefProvider";
import { fabric } from "fabric";
import useDefaultBackgrounds from "../../hooks/useDefaultBackgrounds";
import useFileDelete from "../../hooks/useFileDelete";

const BackgroundScreen = ({ backgrounds, fabricRef }) => {
  const { imageRef } = useImageRefProvider();
  const { image, setImage, setColor } = useContext(BackgroundContext);
  const { manyBackgrounds, setManyBackgrounds } = useContext(ManyBackgroundsContext);
  const { handleDefaultBackgroundChangeName } = useDefaultBackgrounds();
  const { handleDeleteFile, handleDeleteLinkFile } = useFileDelete();

  const handleSelectColor = (color) => {
    setColor(color);
    fabric.Image.fromURL(color.preview ? color.preview : color.src, function (img) {
      imageRef.current.setSrc(color.preview ? color.preview : color.src, () => {
        fabricRef.current.renderAll();
      });
    });
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

import React, { useContext, useState } from "react";
import { ManyBackgroundsContext } from "../../posterCreator/Context/ManyBackgroundsContext";
import Draggable from "react-draggable";
// import { BackgroundContext } from "../../posterCreator/Context/BackgroundContext";
// import { fabric } from "fabric";
// import BackgroundItem from "./ThemeBackgroundWindow/BackgroundItem";
// import useDefaultBackgrounds from "../hooks/useDefaultBackgrounds";
import "./themeBackgroundWindow.css";
// import useFileDelete from "../hooks/useFileDelete";
// import useImageRefProvider from "../../Creator/hooks/useImageRefProvider";
import TopBar from "./ThemeBackgroundWindow/TopBar";
import BackgroundScreen from "./ThemeBackgroundWindow/BackgroundScreen";
import LayerScreen from "./ThemeBackgroundWindow/LayerScreen";

export default function ThemeBackgroundWindow({ backgrounds, fabricRef }) {
  const [position, setPosition] = useState({ x: 0, y: -300 });
  const [selectedWindow, setSelectedWindow] = useState(1);
  const { manyBackgrounds, setManyBackgrounds } = useContext(ManyBackgroundsContext);
  
  function handleFileUpload(e) {
    const files = e.target.files;
    const fileList = Array.from(files);
    const updatedBackgrounds = fileList.map((file) => ({
      file,
      color: file.name.split(".")[0],
      src: URL.createObjectURL(file),
    }));
    setManyBackgrounds([...manyBackgrounds, ...updatedBackgrounds]);
  }

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
        <TopBar handleFileUpload={handleFileUpload} setSelectedWindow={setSelectedWindow} />
        <div className="content w-100 d-flex flex-column overflow-scroll">
          {selectedWindow === 1 && <BackgroundScreen backgrounds={backgrounds} fabricRef={fabricRef} />}
          {selectedWindow === 2 && <LayerScreen fabricRef={fabricRef} />}
        </div>
      </div>
    </Draggable>
  );
}

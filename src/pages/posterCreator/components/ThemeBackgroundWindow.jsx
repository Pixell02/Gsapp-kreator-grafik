import { useState } from "react";

import Draggable from "react-draggable";
import "./themeBackgroundWindow.css";
import TopBar from "./ThemeBackgroundWindow/TopBar";
import BackgroundScreen from "./ThemeBackgroundWindow/BackgroundScreen";
import LayerScreen from "./ThemeBackgroundWindow/LayerScreen";
import { useBackgroundContext } from "../Context/BackgroundContext";

export default function ThemeBackgroundWindow({ fabricRef }) {
  const [position, setPosition] = useState({ x: 0, y: -300 });
  const [selectedWindow, setSelectedWindow] = useState(1);
  const { newBackgrounds: manyBackgrounds, setNewBackgrounds: setManyBackgrounds } = useBackgroundContext();

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
          {selectedWindow === 1 && <BackgroundScreen fabricRef={fabricRef} />}
          {selectedWindow === 2 && <LayerScreen fabricRef={fabricRef} />}
        </div>
      </div>
    </Draggable>
  );
}

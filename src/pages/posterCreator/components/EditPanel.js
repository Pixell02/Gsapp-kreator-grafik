import React from "react";
import "../WorkSpace.css"
import Layers from "./Layers";
export default function EditPanel(props) {
  return (
    <div className="ml-5 mt-3 h-100 w-100">
      <div className="add-properties-container">
        <p>Właściwości</p>
      </div>
      <div className="add-layers-container">
        <p>Warstwy</p>
        <Layers />
      </div>
    </div>
  );
}

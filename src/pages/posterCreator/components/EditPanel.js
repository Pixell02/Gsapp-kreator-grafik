import React from "react";
import "../WorkSpace.css"
import Layers from "./Layers";
export default function EditPanel(props) {
  return (
    <div className=" mt-3 h-100 w-100">
      <button className="btn ml-5">Dodaj tło</button>
      <div className="add-properties-container ml-5 pt-2">
        <p>Właściwości</p>
      </div>
      <div className="add-layers-container ml-5">
        <p>Warstwy</p>
        <Layers />
      </div>
    </div>
  );
}

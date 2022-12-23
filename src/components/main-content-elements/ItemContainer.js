import React from "react";
import "./ItemContainer.css";
import Block from "./CatalogBlock";
function ItemContainer(props) {
  return (
    <div className="Item-container">
      {props.element}
    </div>
  );
}

export default ItemContainer;

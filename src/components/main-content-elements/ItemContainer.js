import React from "react";
import "./ItemContainer.css";
import Block from "../../pages/Catalog/components/CatalogBlock";
function ItemContainer({children}) {
  
  return (
    <div className="Item-container">
      {children}
    </div>
  );
}

export default ItemContainer;

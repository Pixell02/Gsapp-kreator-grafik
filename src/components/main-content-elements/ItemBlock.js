import { db } from "../../firebase/config";
import { useState, useRef, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";

// Styling
import * as Icon from "react-bootstrap-icons";
import "./ItemBlock.css";

import Options from "./Options";

export default function ItemBlock({ items }) {
  const [itemToEdit, setItemToEdit] = useState(null);
  const hideElement = useRef(null);

  const handleClickOutside = (e) => {
    if (!hideElement.current.contains(e.target)) {
      setItemToEdit(null);
    }
  };
  useEffect(() => {
    document.body.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setItemToEdit]);

  const handleClick = (e, item) => {
    setItemToEdit(item);
  };

  return (
    <div ref={hideElement} className="catalog-container">
      {items.map((item) => (
        <div key={item.id} className="item-window">
          <div className="name-content">
            <span key={item.id} className="name-content">
              {item.firstName + " "}
              {item.secondName ? item.secondName : null}
            </span>
            <div className="option-container">
              <button
                key={item.id}
                onClick={(e) => {
                  handleClick(e, item);
                }}
              >
                <Icon.ThreeDotsVertical style={{ margin: "5px 0 0 0" }} />
              </button>
              {itemToEdit === item && <Options team={item} />}
            </div>
            
          </div>
          <div className="image-content">
            <img src={item.img} alt={item.firstName + " " + item.secondName} />
          </div>
        </div>
      ))}
    </div>
  );
}

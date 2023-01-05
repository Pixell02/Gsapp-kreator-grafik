import { db } from "../../../firebase/config";
import { useState, useRef, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

// Styling
import * as Icon from "react-bootstrap-icons";
import "../../../components/main-content-elements/Block.css";

import Options from "../../../components/main-content-elements/Options";

export default function YourTeamsBlock({ items }) {
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
                {item.firstName + " " + item.secondName}
              </span>
            </div>
            <div className="image-content">
              <img
                src={item.img}
                alt={item.firstName + " " + item.secondName}
              />
            </div>
          
        </div>
      ))}
    </div>
  );
}

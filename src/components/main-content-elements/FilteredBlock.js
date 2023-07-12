
import React, { useEffect, useRef, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "./ItemBlock.css";
export default function FilteredBlock({type, item, Teams, handleDeleteClick, openEditModal, editClick }) {
  
  console.log(type);
  
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
    <>
      <div key={item.id} ref={hideElement} className="item-window">
        <div className="name-content">
          <span key={item.id} className="name-content">
            {item.firstName ? (
           <>
            {item.firstName + " "}
            {item.secondName ? item.secondName : null} 
            </>
            )
           : item.name}
          </span>
          <div className="option-container">
            <button
              className="button"
              key={item.id}
              onClick={(e) => {
                handleClick(e, item);
              }}
            >
              <Icon.ThreeDotsVertical style={{ margin: "5px 0 0 0", zIndex: "-1" }} />
            </button>
            {itemToEdit === item && (
              <div className="show-list">
                <div className="edit-element">
                  <button
                    key={item.id}
                    onClick={(e) => {
                      editClick(e, item, type);
                    }}
                  >
                    Edytuj
                  </button>
                </div>
                <div className="delete-element">
                  <button key={item.id} onClick={() => handleDeleteClick(item.id, type)}>
                    Usuń
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="image-content">
          {item.img !== null && item.img !== "" && <img src={item.img ? item.img : (item.src && item.src) ? item.src : null } alt={item.firstName + " " + item.secondName} />}
        </div>
      </div>

    </>
  );
}

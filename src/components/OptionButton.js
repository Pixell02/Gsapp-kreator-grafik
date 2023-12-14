import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { db } from "../firebase/config";

const OptionButton = ({ item, editClick, type, hideElement }) => {
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!hideElement.current.contains(e.target)) {
        setItemToEdit(null);
      }
    };
    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setItemToEdit]);

  const handleDeleteClick = async (id, location) => {
    const ref = doc(db, location, id);
    await deleteDoc(ref);
    // }
  };
  return (
    <div className="option-container">
      <button className="button" key={item.id} onClick={() => setItemToEdit(item)}>
        <Icon.ThreeDotsVertical style={{ margin: "5px 0 0 0", zIndex: "1" }} />
      </button>
      {itemToEdit === item && (
        <div className="show-list">
          <div className="edit-element">
            <button
              key={item.id}
              onClick={() => {
                editClick(item, type);
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
  );
};

export default OptionButton;

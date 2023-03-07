import { db } from "../../firebase/config";
import { useState, useRef, useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import useEditModal from "../../hooks/useEditModal";
import { useLocation } from "react-router-dom";
import EditPlayerWindow from "../../pages/Players/components/EditPlayerWindow";
import EditSponsorWindow from "../../pages/Sponsors/components/EditSponsorWindow";
import EditOpponentWindow from "../../pages/Opponents/components/EditOpponentWindow";

// Styling
import * as Icon from "react-bootstrap-icons";
import "./ItemBlock.css";

import Options from "./Options";

export default function ItemBlock({ items }) {
  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const location = useLocation();
  const goodLocation = location.pathname.split("/")[1];
  const handleDeleteClick = async (id) => {
    if (goodLocation === "players") {
      const ref = doc(db, "Players", id);
      await deleteDoc(ref);
    } else if (goodLocation === "opponents") {
      const ref = doc(db, "Opponents", id);
      await deleteDoc(ref);
    }
  };

  const [data, setData] = useState();
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
  const editClick = (e, item) => {
    setData(item);
    openEditModal();
    setItemToEdit(null);
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
                className="button"
                key={item.id}
                onClick={(e) => {
                  handleClick(e, item);
                }}
              >
                <Icon.ThreeDotsVertical
                  style={{ margin: "5px 0 0 0", zIndex: "-1" }}
                />
              </button>
              {itemToEdit === item && (
                <div className="show-list">
                  <div className="edit-element">
                    <button
                      key={item.id}
                      onClick={(e) => {
                        editClick(e, item);
                      }}
                    >
                      Edytuj
                    </button>
                  </div>
                  <div className="delete-element">
                    <button
                      key={item.id}
                      onClick={() => handleDeleteClick(item.id)}
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="image-content">
            {item.img !== null && item.img !== "" && (
              <img
                src={item.img}
                alt={item.firstName + " " + item.secondName}
              />
            )}
          </div>
        </div>
      ))}
      {data && isEditModal && goodLocation === "players" && (
        <EditPlayerWindow
          player={data}
          open={isEditModal}
          onClose={closeEditModal}
        />
      )}
      {data && isEditModal && goodLocation === "opponents" && (
        <EditOpponentWindow
          player={data}
          open={isEditModal}
          onClose={closeEditModal}
        />
      )}
      {/* {data && isEditModal && goodLocation === "sponsors" && (
        <EditSponsorWindow
          player={data}
          open={isEditModal}
          onClose={closeEditModal}
        />
      )} */}
    </div>
  );
}

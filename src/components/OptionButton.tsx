import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import * as Icon from "react-bootstrap-icons";
import { db } from "../firebase/config";

type Props<T extends { id?: string }> = {
  item: T;
  type: string;
  setData: Dispatch<SetStateAction<T>>;
  setSelectedModal: Dispatch<SetStateAction<number>>;
  hideElement: React.MutableRefObject<HTMLElement | null>;
};

const OptionButton = <T extends { id?: string }>({ item, type, setData, setSelectedModal, hideElement }: Props<T>) => {
  const [itemToEdit, setItemToEdit] = useState<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (hideElement.current && !hideElement.current.contains(e.target as Node)) {
        setItemToEdit(null);
      }
    };
    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideElement]);

  const handleDeleteClick = async (id: string) => {
    try {
      const ref = doc(db, type, id);
      await deleteDoc(ref);
      console.log("deleted");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleEditClick = (item: T) => {
    setData(item);
    setSelectedModal(2);
  };

  return (
    <div className="option-container">
      <button className="button" onClick={() => setItemToEdit(item)}>
        <Icon.ThreeDotsVertical style={{ margin: "5px 0 0 0", zIndex: 1 }} />
      </button>
      {itemToEdit === item && (
        <div className="show-list">
          <div className="edit-element">
            <button onClick={() => handleEditClick(item)}>Edytuj</button>
          </div>
          <div className="delete-element">
            <button onClick={() => handleDeleteClick(item?.id as string)}>Usuń</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionButton;

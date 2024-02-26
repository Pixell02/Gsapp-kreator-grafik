import { Switch } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { db } from "../firebase/config";
import ThemeDeleteModal from "../pages/stats/components/AdministratorPanel/Themes/Modals/ThemeDeleteModal";
import ThemeEditModal from "../pages/stats/components/AdministratorPanel/Themes/Modals/ThemeEditModal";
import { Catalog } from "../types/creatorComponentsTypes";

type props = {
  children: React.ReactNode;
  category: Catalog;
  isEditable?: boolean;
};

type Theme = {
  id: string;
  public: boolean;
};

const ThemeContainer = ({ children, category, isEditable }: props) => {
  const [expanded, setExpanded] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleToggle = (theme: Theme) => {
    const docRef = doc(db, "catalog", theme.id);
    const updatedPublicValue = !theme.public;
    updateDoc(docRef, {
      public: updatedPublicValue,
    }).then(() => {
      console.log("made");
    });
  };
  const handleClickDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleClickEdit = () => {
    setIsEditOpen(true);
  };

  return (
    <div className="mg-container">
      {isDeleteOpen && <ThemeDeleteModal setIsOpen={setIsDeleteOpen} selectedTheme={category} />}
      {isEditOpen && <ThemeEditModal setIsOpen={setIsEditOpen} selectedTheme={category} />}
      <div className="nav-container" onClick={() => setExpanded(!expanded)}>
        <div className={expanded ? "nav-window" : "nav-window-dark"}>
          <div className="category-icon-container">
            <Icon.ChevronCompactDown
              className={expanded ? "extend-icon-open" : "extend-icon-close"}
              style={{ marginLeft: "20px" }}
            />
          </div>
          <span>{category.theme} </span>
          <div className="empty-container">
            {isEditable && (
              <div className="d-flex w-100">
                <button className="btn" onClick={() => handleClickEdit()}>
                  Edytuj nazwę
                </button>
                <div className="d-flex w-100 justify-content-end mx-2">
                  <button className="btn mx-3" onClick={() => handleClickDelete()}>
                    Usuń
                  </button>
                  {category.public ? <span>Publiczny</span> : <span>Prywatny</span>}{" "}
                  <Switch checked={category.public} onChange={() => handleToggle(category as Theme)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={expanded ? "poster-container-close" : "poster-container-open"}>{children}</div>
    </div>
  );
};

export default ThemeContainer;

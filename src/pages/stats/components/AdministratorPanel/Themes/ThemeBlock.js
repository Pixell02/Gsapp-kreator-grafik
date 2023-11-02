import { Switch } from "antd";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PosterLinkBlock from "../../../../../components/main-content-elements/PosterLinkBlock";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { db } from "../.././../../../firebase/config";
import "./themeBlock.css";

export default function ThemeBlock({ themes, posters, setIsOpen, setSelectedTheme }) {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const [itemToEdit, setItemToEdit] = useState(null);

  const handleClick = (e, item) => {
    setItemToEdit(item);
  };

  const handleToggle = (theme) => {
    const docRef = doc(db, "catalog", theme.id);
    const updatedPublicValue = !theme.public;

    updateDoc(docRef, {
      public: updatedPublicValue,
    }).then(() => {
      console.log("made");
    });
  };

  const sortedThemes = themes.sort((a, b) => {
    const getNumberFromTheme = (theme) => {
      const match = theme.theme.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    };
    const numberA = getNumberFromTheme(a);
    const numberB = getNumberFromTheme(b);
    return numberA - numberB;
  });

  const handleClickEdit = (e, theme) => {
    setIsOpen({ isOpen: true, type: "edit" });
    setSelectedTheme(theme);
  };
  const handleClickDelete = (e, theme) => {
    setIsOpen({ isOpen: true, type: "delete" });
    setSelectedTheme(theme);
  };
  const editClick = (item) => {
    setItemToEdit(null);
    navigate(`/${language}/posterCreator/theme/${item.uuid}`);
  };
  const handleDeleteClick = async (id) => {
    const Pref = doc(db, "piecesOfPoster", id);
    await deleteDoc(Pref);

    const Cref = doc(db, "coords", id);
    await deleteDoc(Cref);
  };

  return (
    <>
      {sortedThemes?.map((theme, i) => (
        <div className="theme-container mt-3 d-flex align-items-center">
          <div className="d-flex w-100 mx-3 theme-content">
            <div className="theme-name">
              {theme.theme}{" "}
              <div>
                <button className="btn" onClick={(e) => handleClickEdit(e, theme)}>
                  Edytuj nazwę
                </button>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-end mt-3 mx-2">
              <button className="btn mx-3" onClick={(e) => handleClickDelete(e, theme)}>
                Usuń
              </button>
              {theme.public ? <span>Publiczny</span> : <span>Prywatny</span>}{" "}
              <Switch checked={theme.public} onChange={() => handleToggle(theme)} />
            </div>
          </div>
          <div className="d-flex w-100 poster-content">
            <div className="block-item">
              {posters
                ?.filter((poster) => poster.themeId === theme.id)
                .map((poster) => (
                  <PosterLinkBlock
                    link={`/${language}/creator/theme/${poster.uuid}`}
                    userPoster={poster}
                    itemToEdit={itemToEdit}
                    editClick={editClick}
                    handleClick={handleClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

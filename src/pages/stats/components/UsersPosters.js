import { deleteDoc, doc } from "firebase/firestore";
import React, { useContext, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../../components/main-content-elements/Title";
import { db } from "../../../firebase/config";
import { useCollection } from "../../../hooks/useCollection";
import "../Stats.css";
import { LanguageContext } from "../../../context/LanguageContext";

export default function UsersPosters() {
  const navigate = useNavigate();
  const {language} = useContext(LanguageContext)
  const { documents: userPosters } = useCollection("yourCatalog");
  const { documents: Teams } = useCollection("Teams");
  const [users, setUsers] = useState("");
  const [data, setData] = useState();
  const [itemToEdit, setItemToEdit] = useState(null);
  const hideElement = useRef(null);

  const handleDeleteClick = async (id) => {
    const Pref = doc(db, "yourCatalog", id);
    await deleteDoc(Pref);

    const Cref = doc(db, "coords", id);
    await deleteDoc(Cref);
  };

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
    setItemToEdit(null);
    navigate(`/posterCreator/${item.uuid}`)
  };
  useEffect(() => {
    if (userPosters) {
      setUsers(Array.from(new Set(userPosters.map((posters) => posters.uid))));
    }
  }, [userPosters]);

  return (
    <div className="usersPosters-container mt-5 bg-light" ref={hideElement}>
      <div className="pt-2 ml-5">
        <Title title="Grafiki użytkowników" />
      </div>
      <div className="users-poster-container">
        {users &&
          users.map((user) => (
            <div className="users-container">
              <span className="users-id">
                {Teams &&
                  Teams.filter((teams) => teams.uid === user).map((teams) =>
                    teams.firstName ? teams.firstName + " " + teams.secondName + " " : null
                  )}
                {user !== undefined ? `(${user})` : null}
                {user === "hgwaMbxg3qWnQyqS44AtyTrkSA93" && <span>(Moje konto)</span>}
              </span>

              <div className="users-posters">
                {userPosters &&
                  userPosters
                    .filter((userPoster) => userPoster.uid === user)
                    .map((userPoster) => (
                      <>
                        {userPoster && userPoster.uid !== undefined ? (
                          <div className="item-category-window">
                            <div className="name-content">
                              <span className="name-content" style={{ width: "80%" }}>
                                {userPoster.name}
                              </span>
                              <button className="button-option" onClick={(e) => handleClick(e, userPoster)}>
                                <Icon.ThreeDotsVertical style={{ marginTop: "5px" }} />
                              </button>
                              {itemToEdit === userPoster && (
                                <div className="show-list">
                                  <div className="edit-element">
                                    <button
                                      key={userPoster.uid}
                                      onClick={(e) => {
                                        editClick(e, userPoster);
                                      }}
                                    >
                                      Edytuj
                                    </button>
                                  </div>
                                  <div className="delete-element">
                                    <button key={userPoster.uid} onClick={() => handleDeleteClick(userPoster.uuid)}>
                                      Usuń
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                            <Link to={`/${language}/creator/${userPoster.uuid}`}>
                              <div className="image-category-content">
                                {userPoster.src && (
                                  <img src={userPoster.src} alt={userPoster.firstName + " " + userPoster.secondName} />
                                )}
                              </div>
                            </Link>
                          </div>
                        ) : null}
                      </>
                    ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

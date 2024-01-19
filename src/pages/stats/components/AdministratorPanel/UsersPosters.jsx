import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PosterLinkBlock from "../../../../components/main-content-elements/PosterLinkBlock";
import Title from "../../../../components/main-content-elements/Title";
import { db } from "../../../../firebase/config";
import { useCollection } from "../../../../hooks/useCollection";
import "../../Stats.css";
import { useLanguageContext } from "../../../../context/LanguageContext";

export default function UsersPosters({ Teams }) {
  const navigate = useNavigate();
  const { documents: userPosters } = useCollection("yourCatalog");
  const { language } = useLanguageContext();
  const [users, setUsers] = useState("");
  const [itemToEdit, setItemToEdit] = useState(null);
  const hideElement = useRef(null);
  const handleDeleteClick = async (id) => {
    const Pref = doc(db, "yourCatalog", id);
    await deleteDoc(Pref);

    const Cref = doc(db, "coords", id);
    await deleteDoc(Cref);
  };
  console.log(users);
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
    setItemToEdit(null);
    navigate(`/posterCreator/${item.uuid}`);
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
                {Teams?.filter((teams) => teams.uid === user).map((teams) => teams.email)}
                {user !== undefined && ` (${user})`}
                {user === "hgwaMbxg3qWnQyqS44AtyTrkSA93" && <span>(Moje konto)</span>}
              </span>

              <div className="users-posters">
                {userPosters
                  ?.filter((userPoster) => userPoster.uid === user)
                  .map((userPoster) => (
                    <>
                      {userPoster?.uid && (
                        <PosterLinkBlock
                          link={`/${language}/creator/${userPoster.uuid}`}
                          userPoster={userPoster}
                          itemToEdit={itemToEdit}
                          editClick={editClick}
                          handleClick={handleClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

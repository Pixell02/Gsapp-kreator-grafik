import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Title from "../../../components/main-content-elements/Title";
import { useCollection } from "../../../hooks/useCollection";
import "../Stats.css";

export default function UsersPosters() {
  const { documents: userPosters } = useCollection("yourCatalog");
  const { documents: Teams } = useCollection("Teams");
  const [users, setUsers] = useState("");
  useEffect(() => {
    if (userPosters) {
      setUsers(Array.from(new Set(userPosters.map((posters) => posters.uid))));
    }
  }, [userPosters]);

  return (
    <div className="usersPosters-container mt-5 bg-light">
      <div className="pt-2 ml-5">
        <Title title="Grafiki użytkowników" />
      </div>
      <div className="users-poster-container">
        {users &&
          users.map((user) => (
            <div className="users-container">
              <span className="users-id">
                {Teams &&
                  Teams.filter((teams) => teams.uid === user).map(
                    (teams) => (teams.firstName ? teams.firstName + " " + teams.secondName + " " : null)
                  )}
                {user !== undefined ?`(${user})`: null}
                {user === "hgwaMbxg3qWnQyqS44AtyTrkSA93" && (
                  <span>(Moje konto)</span>
                )}
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
                            <span className="name-content" style={{width:"80%"}}>
                              {userPoster.name}
                            </span>
                            <Icon.ThreeDotsVertical style={{marginTop: "5px"}} />
                          </div>
                          <Link to={`/creator/${userPoster.uuid}`}>
                          <div className="image-category-content">
                            {userPoster.src && (
                              <img
                                src={userPoster.src}
                                alt={
                                  userPoster.firstName +
                                  " " +
                                  userPoster.secondName
                                }
                              />
                            )}
                          </div>
                        </Link>
                      </div>
                      ): null}
                      </>
                    ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

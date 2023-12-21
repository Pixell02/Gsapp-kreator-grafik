import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const PosterLinkBlock = ({ userPoster, link, itemToEdit, editClick, handleClick, handleDeleteClick }) => {
  return (
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
                onClick={() => {
                  editClick(userPoster);
                }}
              >
                Edytuj
              </button>
            </div>
            <div className="delete-element">
              <button key={userPoster.uid} onClick={() => handleDeleteClick(userPoster.id)}>
                Usuń
              </button>
            </div>
          </div>
        )}
      </div>
      <Link to={link}>
        <div className="image-category-content">
          {userPoster.src && <img src={userPoster.src} alt={userPoster.firstName + " " + userPoster.secondName} />}
        </div>
      </Link>
    </div>
  );
};

export default PosterLinkBlock;

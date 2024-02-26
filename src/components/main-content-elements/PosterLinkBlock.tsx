import React, { useRef } from "react";
import { Link } from "react-router-dom";
import OptionButton from "../OptionButton";
import { poster } from "../PosterItem";

type props = {
  link: string;
  userPoster: poster;
  editClick: (value: poster) => void;
  type: string;
};

const PosterLinkBlock = ({ userPoster, link, editClick, type }: props) => {
  const hideElement = useRef(null);
  return (
    <div className="item-category-window">
      <div className="name-content">
        <span className="name-content" style={{ width: "80%" }}>
          {userPoster.name}
        </span>
        <OptionButton hideElement={hideElement} item={userPoster} type={type} handleEdit={editClick} />
      </div>
      <Link to={link}>
        <div className="image-category-content">
          {userPoster.src && <img src={userPoster.src} alt={userPoster.name} />}
        </div>
      </Link>
    </div>
  );
};

export default PosterLinkBlock;

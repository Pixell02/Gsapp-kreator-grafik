import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguageContext } from "../../../context/LanguageContext";
import { poster } from "../../Calendar/components/PosterBlock";
import OptionButton from "../../../components/OptionButton";

type props = {
  poster: poster;
  isEditable?: boolean;
};

const PosterLink = ({ poster, isEditable }: props) => {
  const { language } = useLanguageContext();
  const hideElement = useRef(null);
  const navigate = useNavigate();
  const editClick = (item: { uuid: string }) => {
    navigate(`/${language}/posterCreator/theme/${item.uuid}`);
  };
  return (
    <div className="item-category-window">
      <div className="name-content">
        <span className="name-content">{poster.name}</span>
        {isEditable && (
          <OptionButton handleEdit={editClick} item={poster} hideElement={hideElement} type={"piecesOfPoster"} />
        )}
      </div>
      <Link to={`/${language}/creator/theme/${poster?.coords || poster.uid}`}>
        <div className="image-category-content">
          {poster.src && <img src={poster.src} alt={poster.firstName + " " + poster.secondName} />}
        </div>
      </Link>
    </div>
  );
};

export default PosterLink;

import React from "react";
import { Link } from "react-router-dom";
import { useLanguageContext } from "../../../context/LanguageContext";
import { poster } from "../../Calendar/components/PosterBlock";

type props = {
  poster: poster;
};

const PosterLink = ({ poster }: props) => {
  const { language } = useLanguageContext();

  return (
    <div className="item-category-window">
      <Link to={`/${language}/creator/${poster.uid}`}>
        <div className="name-content">
          <span className="name-content">{poster.name}</span>
        </div>
        <div className="image-category-content">
          {poster.src && <img src={poster.src} alt={poster.firstName + " " + poster.secondName} />}
        </div>
      </Link>
    </div>
  );
};

export default PosterLink;

import React from "react";
import { Link } from "react-router-dom";
import { useLanguageContext } from "../context/LanguageContext";

export type poster = {
  uid: string;
  name: string;
  src: string;
  firstName: string;
  secondName: string;
};

type props = {
  poster: poster;
};

const PosterItem = ({ poster }: props) => {
  const { language } = useLanguageContext();

  return (
    <div className="item-category-window">
      <Link to={`/${language}/creator/theme/${poster.uid}`}>
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

export default PosterItem;

import React from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import { useContext } from "react";
import translate from "../locales/translate.json"

const IndividualPosters = () => {
  const { user } = useAuthContext();
  const { documents: yourPoster } = useCollection("yourCatalog", ["uid", "==", user.uid]);
  const { language } = useContext(LanguageContext);
  return (
    <div>
      <div className="ml-5 d-flex flex-column">
        <div style={{ fontSize: "25px", marginBottom: "20px" }}> {translate.yourPosters[language] }</div>
        <ItemContainer>
          {yourPoster &&
            yourPoster.map((poster) => (
              <>
                <div className="item-category-window">
                  <Link to={`/${language}/creator/${poster.uuid}`}>
                    <div className="name-content">
                      <span className="name-content">{poster.name}</span>
                    </div>
                    <div className="image-category-content">
                      {poster.src && <img src={poster.src} alt={poster.firstName + " " + poster.secondName} />}
                    </div>
                  </Link>
                </div>
              </>
            ))}
          {!yourPoster && <p>{translate.noContent[language]}</p>}
        </ItemContainer>
      </div>
    </div>
  );
};

export default IndividualPosters;

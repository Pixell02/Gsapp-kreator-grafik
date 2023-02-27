import React from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import { Link } from "react-router-dom";
import "./MainYourCatalog.css";
export default function MainYourCatalog() {
  const { user } = useAuthContext();
  
  const { documents: yourPoster} = useCollection("yourCatalog",["uid","==", user.uid]);
  
  return (
    <div className="main-content d-flex flex-column">
      <Title title="Twój katalog" />
      <div className="ml-5 d-flex flex-column">
        <div style={{ fontSize: "25px", marginBottom: "20px" }}>
          Twoje plakaty
        </div>
        <ItemContainer>
          {yourPoster && yourPoster.map((poster) => (
            <>
            <div className="item-category-window">
              <Link to={`/creator/${poster.uuid}`}>
                <div className="name-content">
                  <span className="name-content">
                    {poster.name}
                  </span>
                </div>
                <div className="image-category-content">
                  {poster.src && (
                    <img
                      src={poster.src}
                      alt={
                        poster.firstName + " " + poster.secondName
                      }
                    />
                  )}
                </div>
              </Link>
            </div>
          </>
          ))}
          {!yourPoster && <p>Brak zawartości</p>}
        </ItemContainer>
        <div style={{ fontSize: "25px", marginBottom: "20px" }}>
          Twoje Ulubione
        </div>
        <ItemContainer>
          <p style={{ color: "gray", fontSize: "15px" }}>
            Funkcja obecnie niedostępna
          </p>
        </ItemContainer>
      </div>
    </div>
  );
}

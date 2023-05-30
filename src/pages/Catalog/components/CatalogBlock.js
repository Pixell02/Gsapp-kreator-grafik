import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "../../../components/main-content-elements/Block.css";
// import catalog from "./catalog.json";
import color from "./color.json";
// import posters from "./posters.json";
import * as Icon from "react-bootstrap-icons";
import { useCollection } from "../../../hooks/useCollection";

import useOrderBy from "../hooks/useOrderBy";

function Catalog() {

  const { documents: catalog } = useCollection("catalog", ["public", "==", true]);


  const [isOpen, setIsOpen] = useState();
  useEffect(() => {
    if (catalog) {
      setIsOpen(catalog);
    }
  }, [catalog]);

  const { documents: posters } = useOrderBy("piecesOfPoster", "themeId");

  

  const handleCategory = (i) => {
    
    setIsOpen((prevOpen) =>
      prevOpen.map((item, index) => ({
        ...item,
        expanded: index === i ? !item.expanded : item.expanded,
      }))
    );
  };

  // Sortowanie katalogu
  useEffect(() => {
    if (isOpen) {
      isOpen.sort((a, b) => {
        const themeA = a.theme.toLowerCase();
        const themeB = b.theme.toLowerCase();
        const regex = /^motyw (\d+)$/;
        const matchA = themeA.match(regex);
        const matchB = themeB.match(regex);
        if (matchA && matchB) {
          const numberA = parseInt(matchA[1]);
          const numberB = parseInt(matchB[1]);
          return numberA - numberB;
        } else if (matchA) {
          return -1;
        } else if (matchB) {
          return 1;
        }
        return 0;
      });
    }
  },[isOpen])
  console.log(isOpen)

  return (
    <>
      <div className="catalog-container">
        {isOpen &&
          isOpen.map((category, i) => (
            <div className="mg-container">
              <div className="nav-container" onClick={() => handleCategory(i)}>
                <div className={category.expanded ? "nav-window" : "nav-window-dark"}>
                  <div className="category-icon-container">
                    <Icon.ChevronCompactDown
                      className={category.expanded ? "extend-icon-open" : "extend-icon-close"}
                      style={{ marginLeft: "20px" }}
                    />
                  </div>
                  <span>{category.theme} </span>
                  <div className="empty-container"></div>
                </div>
              </div>

              <div className={category.expanded ? "poster-container-close" : "poster-container-open"}>
                <>
                  {posters &&
                    posters
                      .filter((poster) => poster.themeId === category.id)
                      .map((poster) => (
                        <>
                          <div className="item-category-window">
                            <Link to={`/creator/theme/${poster.uid}`}>
                              <div className="name-content">
                                <span className="name-content">{poster.name}</span>
                              </div>
                              <div className="image-category-content">
                                {poster.src && (
                                  <img src={poster.src} alt={poster.firstName + " " + poster.secondName} />
                                )}
                              </div>
                            </Link>
                          </div>
                        </>
                      ))}
                </>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Catalog;

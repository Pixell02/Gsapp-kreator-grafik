import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CategoryBlock from "./categoryBlock";
import LoadingScreen from "react-loading-screen";
import "../../../components/main-content-elements/Block.css";
import catalog from "./catalog.json";
import color from "./color.json";
// import posters from "./posters.json";
import * as Icon from "react-bootstrap-icons";
import { useCollection } from "../../../hooks/useCollection";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

function Catalog() {
  const { user } = useAuthContext();

  const { documents: Favorite } = useCollection("favorite", [
    "uid",
    "==",
    user.uid,
  ]);

  const [isTheme, setIsTheme] = useState([]);
  const [isOpen, setIsOpen] = useState(catalog);
  // const [posters, setPosters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const { documents: posters } = useCollection("piecesOfPoster");

  useEffect(() => {
    const newArray = isOpen.map((item) => ({ ...item, expanded: true }));
    setIsOpen(newArray);
    const favRef = collection(db, "favorite");
    getDocs(favRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {});
    });
  }, []);

  const handleCategory = (i) => {
    const newItems = [...isOpen];
    newItems[i].expanded = !newItems[i].expanded;
    setIsOpen(newItems);
    setIsTheme(newItems[i].theme);
  };

  return (
    <>
      <div className="catalog-container">
        {isOpen.map((category, i) => (
          <div className="mg-container">
            <div className="nav-container" onClick={() => handleCategory(i)}>
              <div
                className={category.expanded ? "nav-window" : "nav-window-dark"}
              >
                <div className="category-icon-container">
                  <Icon.ChevronCompactDown
                    className={
                      category.expanded
                        ? "extend-icon-open"
                        : "extend-icon-close"
                    }
                    style={{ marginLeft: "20px" }}
                  />
                </div>
                <span>{category.name} </span>
                <div className="empty-container"></div>
              </div>
            </div>

            <div
              className={
                category.expanded
                  ? "poster-container-close"
                  : "poster-container-open"
              }
            >
              <>
                {posters &&
                  posters
                    .filter((poster) => poster.theme === category.theme)
                    .map((poster) => (
                      <>
                        <div className="item-category-window">
                          <Link to={`/creator/${poster.uid}`}>
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
              </>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Catalog;

import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CategoryBlock from "./categoryBlock";
import LoadingScreen from "react-loading-screen";
import "../../../components/main-content-elements/Block.css";
import catalog from "./catalog.json";
// import posters from "./posters.json";
import * as Icon from "react-bootstrap-icons";
import { useCollection } from "../../../hooks/useCollection";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

function Catalog() {
  const { user } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState([
    { id: 1, theme: "motyw 1", expanded: false },
    { id: 2, theme: "motyw 2", expanded: false },
    { id: 3, theme: "motyw 3", expanded: false },
    { id: 4, theme: "motyw 4", expanded: false },
    { id: 5, theme: "motyw 5", expanded: false },
    { id: 6, theme: "motyw 6", expanded: false },
  ]);
  const {documents: Favorite} = useCollection("favorite", ['uid', '==', user.uid])

  const [isTheme, setIsTheme] = useState([]);
  const [isOpen, setIsOpen] = useState(catalog);
  const [posters, setPosters] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    const colRef = collection(db, "piecesOfPoster");
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        posters.push({ ...doc.data(), id: doc.id });
      });
    });
    const newArray = isOpen.map((item) => ({ ...item, expanded: true }));
    setIsOpen(newArray);
    const favRef = collection(db, "favorite");
    getDocs(favRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {});
    });
    setTimeout(() => {
      setIsLoaded(false);
      
    }, 3000);
  }, []);
  useEffect(() => {
    isFavorite.forEach((item,i) => {
       
    })
  },[Favorite])

  const handleCategory = (i) => {
    const newItems = [...isOpen];
    newItems[i].expanded = !newItems[i].expanded;
    setIsOpen(newItems);
    setIsTheme(newItems[i].theme);
  };
  const handleFavorite = async(i) => {
    const newItems = [...isFavorite];
    newItems[i].expanded = !newItems[i].expanded;
    const extendedItems = [...isOpen];
    extendedItems[i].expanded = !extendedItems[i].expanded;
    setIsOpen(extendedItems);
    setIsFavorite(newItems);
    if(newItems[i].expanded === true) {
    await addDoc(collection(db, "favorite"), {
      theme: newItems[i].theme,
      uid: user.uid
    })
    } else {
      await deleteDoc()
    }
  };

  return (
    <>
      {isLoaded && (
        <LoadingScreen
          loading={true}
          bgColor="#f1f1f1"
          spinnerColor="black"
          textColor="#676767"
        />
      )}
      {!isLoaded && (
        <div className="catalog-container">
          {isOpen.map((category, i) => (
            <div className="mg-container">
              <div className="nav-container" onClick={() => handleCategory(i)}>
                <div className="nav-window">
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
                  <div className="empty-container">
                    
                  </div>
                  <div
                      className="favorite-container"
                      onClick={() => handleFavorite(i)}
                    >
                      {isFavorite[i].expanded ? (
                        <Icon.StarFill className="star-icon-color" />
                      ) : (
                        <Icon.Star className="star-icon" />
                      )}
                    </div>
                </div>
              </div>

              <div
                className={
                  category.expanded
                    ? "poster-container-close"
                    : "poster-container-open"
                }
              >
                {posters
                  .filter((poster) => poster.theme === category.theme)
                  .map((poster) => (
                    <div className="item-category-window">
                      <Link to={`/creator/${poster.uid}`}>
                        <div className="name-content">
                          <span className="name-content">{poster.name}</span>
                        </div>
                        <div className="image-category-content">
                          {poster.src && (
                            <img
                              src={poster.src}
                              alt={poster.firstName + " " + poster.secondName}
                            />
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Catalog;

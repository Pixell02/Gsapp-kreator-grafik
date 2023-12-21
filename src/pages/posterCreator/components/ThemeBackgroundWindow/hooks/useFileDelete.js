import { deleteObject, getStorage, ref } from "firebase/storage";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";
import { useLocation } from "react-router-dom";
import useGlobalPropertiesContext from "../../hooks/useGlobalPropertiesContext";
import { useBackgroundContext } from "../../../Context/BackgroundContext";

const useFileDelete = (setImage) => {
  const { globalProperties } = useGlobalPropertiesContext();
  const { newBackgrounds, setNewBackgrounds } = useBackgroundContext();
  const storage = getStorage();
  const location = useLocation();

  const handleDeleteFile = (item) => {
    const filteredBackgrounds = newBackgrounds.filter((background) => background.color !== item.color);
    setNewBackgrounds(filteredBackgrounds);
  };

  const handleDeleteImage = (item) => {
    if (item.src?.split("/")[7]) {
      const split = item.src.split("/")[7];
      const secondSplit = split.split("?")[0];
      const link = decodeURIComponent(secondSplit.replace("%2F", "/"));
      const imageRef = ref(storage, link);
      deleteObject(imageRef)
        .then(() => {
          let docRef;
          if (location.pathname.split("/")[3] === "theme") {
            docRef = doc(db, "piecesOfPoster", globalProperties.id);
          } else {
            docRef = doc(db, "yourCatalog", globalProperties.id);
          }
          updateDoc(docRef, {
            src: deleteField(),
          });
          setImage((prev) => ({
            ...prev,
            src: "",
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setImage((prev) => ({
        ...prev,
        src: "",
        color: "",
      }));
    }
  };

  const handleDeleteLinkFile = async (item) => {
    const split = item.src.split("/")[7];
    const secondSplit = split.split("?")[0];
    const link = decodeURIComponent(secondSplit.replace("%2F", "/"));
    const imageRef = ref(storage, link);
    deleteObject(imageRef)
      .then(() => {
        let docRef;
        if (location.pathname.split("/")[3] === "theme") {
          docRef = doc(db, "piecesOfPoster", item.id);
        } else {
          docRef = doc(db, "yourCatalog", item.id);
        }
        deleteDoc(docRef);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleDeleteFile, handleDeleteLinkFile, handleDeleteImage };
};

export default useFileDelete;

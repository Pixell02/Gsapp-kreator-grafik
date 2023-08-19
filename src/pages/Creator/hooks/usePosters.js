import { useEffect } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useState } from "react";


const usePosters = (poster) => {

  const { documents: MainCatalog } = useCollection("piecesOfPoster", ["uuid", "==", poster]);
  const { documents: yourCatalog } = useCollection("yourCatalog", ["uuid", "==", poster]);
  const [themeOption, setThemeOption] = useState([]);
  const [selectThemes, setSelectThemes] = useState(null);
  const [dataURL, setDataURL] = useState();
  useEffect(() => {
    if (MainCatalog) {
      if (MainCatalog.length > 0) {
        setThemeOption(MainCatalog.map((item) => ({ value: item.src, label: item.color })));
      }
    }
    if (yourCatalog) {
      if (yourCatalog.length > 0) {
        setThemeOption(yourCatalog.map((item) => ({ value: item.src, label: item.color })));
      }
    }
  }, [MainCatalog, yourCatalog]);

  useEffect(() => {
    setSelectThemes(themeOption[0]);
  }, [themeOption]);

  useEffect(() => {
    if (selectThemes) {
      fetch(`${selectThemes.value}`)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            setDataURL(reader.result);
          };
        })
        .catch((error) => {
          console.error(error);
          setDataURL(null);
        });
    }
  }, [selectThemes]);

  return {dataURL, themeOption, selectThemes, setSelectThemes}
}

export default usePosters

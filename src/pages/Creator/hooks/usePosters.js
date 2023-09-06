import { useEffect } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useState } from "react";


const usePosters = (poster) => {

  const { documents: MainCatalog } = useCollection("piecesOfPoster", ["uuid", "==", poster]);
  const { documents: yourCatalog } = useCollection("yourCatalog", ["uuid", "==", poster]);
  const [themeOption, setThemeOption] = useState([]);
  const [additionalLayer, setAdditionalLayer] = useState("");
  
  const [selectThemes, setSelectThemes] = useState(null);
  const [dataURL, setDataURL] = useState();
  useEffect(() => {
    if (MainCatalog) {
      if (MainCatalog.length > 0) {
        setThemeOption(MainCatalog.map((item) => ({ value: {src: item.src, additionalLayer: item.additionalLayer }, label: item.color })));
      }
    }
    if (yourCatalog) {
      if (yourCatalog.length > 0) {
        setThemeOption(yourCatalog.map((item) => ({ value: {src: item.src, additionalLayer: item.additionalLayer}, label: item.color })));
      }
    }
  }, [MainCatalog, yourCatalog]);

  useEffect(() => {
    setSelectThemes(themeOption[0]);
  }, [themeOption]);

  useEffect(() => {
    if (selectThemes) {
      const initSelected = async() => {
       await fetch(`${selectThemes.value.src}`)
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
        if (selectThemes.value.additionalLayer) {
        await fetch(`${selectThemes.value.additionalLayer}`)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            setAdditionalLayer(reader.result)
          };
        })
        .catch((error) => {
          console.error(error);
        });
      }
      }
      initSelected();
    }
  }, [selectThemes]);

  return {dataURL, themeOption, selectThemes, setSelectThemes, additionalLayer}
}

export default usePosters

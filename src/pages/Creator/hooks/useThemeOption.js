import { useEffect, useState } from "react";
import { useCollection } from "../../../hooks/useCollection";

const useThemeOption = (poster) => {
  const [themeOptions, setThemeOption] = useState(null);

  const { documents: MainCatalog } = useCollection("piecesOfPoster", [
    "uuid",
    "==",
    poster,
  ]);
  const { documents: yourCatalog } = useCollection("yourCatalog", [
    "uuid",
    "==",
    poster,
  ]);

  useEffect(() => {
    if (MainCatalog?.length > 0) {
      setThemeOption(
        MainCatalog.map((item) => ({
          value: { src: item.src, additionalLayer: item.additionalLayer },
          label: item.color,
        }))
      );
    }
    if (yourCatalog?.length > 0) {
      setThemeOption(
        yourCatalog.map((item) => ({
          value: { src: item.src, additionalLayer: item.additionalLayer },
          label: item.color,
        }))
      );
    }
  }, [MainCatalog, yourCatalog]);

  return themeOptions;
};

export default useThemeOption;

import { useEffect, useState } from "react";
import useSearchDocsByQuery from "../../../hooks/useSearchDocsByQuery";
import { poster } from "../../../components/PosterItem";

type value = {
  src: string;
  additionalLayer: string;
};

type options = {
  label: string;
  value: value;
};

const useThemeOption = (poster: string) => {
  const [themeOptions, setThemeOption] = useState<options[] | null>(null);
  const { documents: MainCatalog } = useSearchDocsByQuery<poster>("piecesOfPoster", "uuid", "==", poster);
  const { documents: yourCatalog } = useSearchDocsByQuery<poster>("yourCatalog", "uuid", "==", poster);

  useEffect(() => {
    if (MainCatalog && MainCatalog.length > 0) {
      setThemeOption(
        MainCatalog.map((item) => ({
          value: { src: item.src, additionalLayer: item.additionalLayer || "" },
          label: item.color,
        }))
      );
    }
    if (yourCatalog && yourCatalog.length > 0) {
      setThemeOption(
        yourCatalog.map((item) => ({
          value: { src: item.src, additionalLayer: item.additionalLayer || "" },
          label: item.color,
        }))
      );
    }
  }, [MainCatalog, yourCatalog]);

  return themeOptions;
};

export default useThemeOption;

import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useThemeOption from "./useThemeOption";

const usePosters = (poster) => {
  const themeOption = useThemeOption(poster);

  const [selectThemes, setSelectThemes] = useState(null);
  const { image: dataURL } = useFetch(selectThemes?.value?.src);
  const { image: additionalLayer } = useFetch(
    selectThemes?.value?.additionalLayer
  );

  useEffect(() => {
    themeOption?.length > 0 && setSelectThemes(themeOption[0]);
  }, [themeOption]);

  return {
    dataURL,
    themeOption,
    selectThemes,
    setSelectThemes,
    additionalLayer,
  };
};

export default usePosters;

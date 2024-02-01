import { useEffect, useState } from "react";
import translate from "../pages/Opponents/locales/locales.json";
import { useLanguageContext } from "../context/LanguageContext";
import useFetch from "./useFetch";
const useFileReader = (file) => {
  const [preview, setPreview] = useState(null);
  const { image } = useFetch(file);
  const { language } = useLanguageContext();
  useEffect(() => {
    if (file?.size) {
      if (Math.round(file.size / 1024) < 1000) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
        alert(translate.maxSize[language]);
      }
    } else {
      setPreview(image);
    }
  }, [file, image]);

  return { preview, setPreview };
};

export default useFileReader;

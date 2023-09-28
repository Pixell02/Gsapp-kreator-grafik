import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translate from "../pages/Opponents/locales/locales.json";
const useFileReader = (image) => {
  const [preview, setPreview] = useState(null);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    if (image?.size) {
      if (Math.round(image.size / 1024) < 1000) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
        alert(translate.maxSize[language]);
      }
    } else {
      setPreview(null);
    }
  }, [image, setPreview, language]);

  return { preview, setPreview };
};

export default useFileReader;

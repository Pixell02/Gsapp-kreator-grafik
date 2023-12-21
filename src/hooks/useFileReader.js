import { useEffect, useState } from "react";
import translate from "../pages/Opponents/locales/locales.json";
import { useLanguageContext } from "../context/LanguageContext";
const useFileReader = (image) => {
  const [preview, setPreview] = useState(null);
  const { language } = useLanguageContext();
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

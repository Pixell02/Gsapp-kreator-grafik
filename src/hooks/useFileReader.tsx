import { useEffect, useState } from "react";
import translation from "../pages/Opponents/locales/locales.json";
import { useLanguageContext } from "../context/LanguageContext";
import useFetch from "./useFetch";
import { translationProps } from "../types/translationTypes";
const useFileReader = (file: File | string) => {
  const [preview, setPreview] = useState<string | null | ArrayBuffer>(null);
  const { image } = useFetch(typeof file === "string" ? file : "");
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  useEffect(() => {
    if (file instanceof File && file.size) {
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

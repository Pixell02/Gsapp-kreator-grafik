import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import translation from "../pages/YourTeamPanel/components/locales/yourTeamPanel.json";
import { useLanguageContext } from "../context/LanguageContext";
import { translationProps } from "../types/translationTypes";

type Props<T> = {
  setState: Dispatch<SetStateAction<T>>;
};

const InputImage = <T,>({ setState }: Props<T>) => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleReadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setState((prev) => ({ ...prev, img: file }));
  };

  return (
    <>
      <button onClick={onButtonClick} className="btn primary-btn add-img">
        {translate.addImage[language]}
      </button>
      <input type="file" style={{ display: "none" }} ref={fileInputRef} accept="image/png" onChange={handleReadFile} />
    </>
  );
};

export default InputImage;

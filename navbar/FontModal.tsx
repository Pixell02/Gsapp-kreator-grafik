import React, { useRef, useState, ChangeEvent } from "react";
import { useCollection } from "../src/hooks/useCollection";
import useStorage from "../src/hooks/useStorage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../src/firebase/config";
import { Font } from "../src/pages/posterCreator/Context/FontsContext";

type FontFile = {
  name: string;
  file: File | null;
};

const FontModal: React.FC = () => {
  const [font, setFont] = useState<FontFile>({ name: "", file: null });
  const { documents: fonts } = useCollection<Font>("fonts");
  const { handleAddImage } = useStorage();

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    setFont((prev) => ({ ...prev, [className]: value }));
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFont((prev) => ({ ...prev, file: file, name: file.name.split(".")[0] }));
  };

  const handleSave = async () => {
    const fontLink = await handleAddImage(font.file as File, `/fonts/${font.name}`);
    const ref = collection(db, "fonts");
    addDoc(ref, {
      font: fontLink,
      name: font.name,
    });
    setFont({ name: "", file: null });
  };

  return (
    <div className="d-flex flex-column">
      <h3>Czcionki</h3>
      <div className="d-flex">
        <input className="name" value={font.name} onChange={handleValueChange} />
        <button className="btn" onClick={onButtonClick}>
          Importuj
        </button>
        {font.file && (
          <button className="btn" onClick={handleSave}>
            Zapisz
          </button>
        )}

        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept=".otf, .ttf"
          onChange={handleAddFile}
        />
      </div>
      <div className="add-logo-window flex-column overflow-scroll">
        {fonts?.map((item, i) => (
          <div key={i} className="d-flex w-100 py-2 border align-items-center justify-content-center">
            <span className="text-center">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontModal;

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import translation from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import bin from "../../../img/binIcon.png";
import useFileReader from "../../../hooks/useFileReader";
import "./playerimagePreview.css";
import { translationProps } from "../../../types/translationTypes";
import { Player, PlayerImage } from "../../../types/teamTypes";

type props = {
  player: Player;
  setPlayer: Dispatch<SetStateAction<Player>>;
};

const PlayerImagePreview = ({ player, setPlayer }: props) => {
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const [img, setImg] = useState<PlayerImage[]>([
    { type: "basic", src: (player?.img as PlayerImage[])[0].src || "" },
    { type: "celebration", src: (player?.img as PlayerImage[])[1]?.src || "" },
  ]);
  useEffect(() => {
    setPlayer((prev: Player) => ({
      ...prev,
      img: img,
    }));
  }, [img]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState({
    type: "basic",
    src: (player?.img as PlayerImage[])[0]?.src || "",
  });

  const { preview } = useFileReader(selectedImage.src);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (item: PlayerImage) => {
    setSelectedImage({ type: item.type, src: "" });
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage({ type: selectedImage.type, src: URL.createObjectURL(file) });
  };

  const handleChange = (type: string) => {
    const findImage = img.find((imageItem) => imageItem.type === type);
    if (!findImage) return;
    setSelectedImage({ type: type, src: findImage.src });
  };

  useEffect(() => {
    const updatedImages = img.map((item) => (item.type === selectedImage.type ? { ...selectedImage } : item));
    setImg(updatedImages);
  }, [selectedImage]);

  return (
    <>
      <button onClick={onButtonClick} className="btn primary-btn add-img">
        {translate.addPhoto[language]}
      </button>
      <input type="file" style={{ display: "none" }} ref={fileInputRef} accept="image/png" onChange={handleAddImage} />
      <div className="d-flex w-100 justify-content-around mt-2">
        <div className="underline-container" onClick={() => handleChange("basic")}>
          <span className={selectedImage.type === "basic" ? "underline" : ""}>standard</span>
        </div>
        <div className="underline-container" onClick={() => handleChange("celebration")}>
          <span className={selectedImage.type === "celebration" ? "underline" : ""}>cieszynka</span>
        </div>
      </div>
      <div className="add-logo-window">
        {img
          .filter((item) => item.type === selectedImage.type)
          .map((item, i) => (
            <>
              {preview || selectedImage.src ? (
                <>
                  <div key={i} className="image-container">
                    <img src={selectedImage.src} className="image" alt="preview" />
                  </div>
                  <div className="bin-container">
                    <img src={bin} onClick={() => handleDeleteImage(item)} alt="delete" />
                  </div>
                </>
              ) : null}
            </>
          ))}
      </div>
    </>
  );
};

export default PlayerImagePreview;

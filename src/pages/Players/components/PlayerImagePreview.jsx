import { useEffect, useRef, useState } from "react";
import translate from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import bin from "../../../img/binIcon.png";
import useFileReader from "../../../hooks/useFileReader";
import "./playerimagePreview.css";

const PlayerImagePreview = ({ player, setPlayer }) => {
  const { language } = useLanguageContext();

  const [img, setImg] = useState([
    { type: "basic", src: player?.img[0]?.src || "" },
    { type: "celebration", src: player?.img[1]?.src || "" },
  ]);

  useEffect(() => {
    setPlayer((prev) => ({
      ...prev,
      img: img,
    }));
  }, [img]);

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState({ type: "basic", src: player?.img[0]?.src || "" });

  const { preview } = useFileReader(selectedImage.src);

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteImage = (item) => {
    setSelectedImage({ type: item.type, src: "" });
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage({ type: selectedImage.type, src: URL.createObjectURL(file) });
  };

  const handleChange = (type) => {
    const findImage = img.find((imageItem) => imageItem.type === type);
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
                    <img src={preview || selectedImage.src} className="image" alt="preview" />
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

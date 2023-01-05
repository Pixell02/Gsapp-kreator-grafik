import { useRef, useState, useEffect } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

function AddPlayerWindow({ open, onClose }) {
  const { id } = useParams();

  const [firstPlayerName, setFirstPlayerName] = useState("");
  const [secondPlayerName, setSecondPlayerName] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (image) {
      if (Math.round(image.size / 1024) < 150) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
        alert("maksymalna wielkość obrazu to 150KB");
      }
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstPlayerName || !secondPlayerName) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    } else {
      await addDoc(collection(db, "Players"), {
        firstName: firstPlayerName,
        secondName: secondPlayerName,
        img: preview,
        number: number,
        uid: user.uid,
      });
      onClose(true);
      setFirstPlayerName("");
      setSecondPlayerName("");
      setNumber("");
      setImage(null);
    }
  };
  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window">
        <label>Imię</label>
        <input
          type="text"
          onChange={(e) => setFirstPlayerName(e.target.value)}
          value={firstPlayerName}
          className="firstPlayerName"
        />
        <label>Nazwisko</label>
        <input
          type="text"
          onChange={(e) => setSecondPlayerName(e.target.value)}
          value={secondPlayerName}
          className="secondPlayerName"
        />
        <label>Numer zawodnika</label>
        <input
          type="number"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
          className="Number"
        />
        <button onClick={onButtonClick} className="btn primary-btn add-img">
          Dodaj Zdjęcie
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/png"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
        <div className="add-logo-window">
          <div className="image-container">
            {preview && <img src={preview} className="image" />}
          </div>
          <div className="bin-container">
            {preview && <img src={bin} onClick={() => setPreview(null)} />}
          </div>
        </div>
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setFirstPlayerName("");
              setSecondPlayerName("");
              setImage(null);
            }}
            className="btn primary-btn"
          >
            Anuluj
          </button>
          <button onClick={handleSubmit} className="btn primary-btn">
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPlayerWindow;

import { useRef, useState, useEffect } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import updatePlayer from "../../../hooks/UpdatePlayer";

function EditPlayerWindow({ player, open, onClose }) {
  const [firstPlayerName, setFirstPlayerName] = useState(player.firstName);
  const [secondPlayerName, setSecondPlayerName] = useState(player.secondName);
  const [number, setNumber] = useState(player.number);
  const [image, setImage] = useState(player.img);
  const [preview, setPreview] = useState(player.img);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleEdit = (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      alert("Maksymalny rozmiar obrazu to 1MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstPlayerName || !secondPlayerName) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    } else if (!number) {
      alert("brak numeru");
    } else {
      const docRef = doc(db, "Players", player.id);
      updateDoc(docRef, {
        firstName: firstPlayerName,
        lastName: secondPlayerName,
        number: number,
        img: preview,
      });
      onClose();
      setFirstPlayerName("");
      setSecondPlayerName("");
      setNumber(null);
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
            handleEdit(e);
          }}
        />
        <div className="add-logo-window">
          <div className="image-container">
            {preview && <img src={preview} />}
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

export default EditPlayerWindow;

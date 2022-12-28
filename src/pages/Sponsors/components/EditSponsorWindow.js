import { useRef, useState, useEffect } from "react";
import "../../YourTeams/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { doc, updateDoc  } from "firebase/firestore";
import updatePlayer from "../../../hooks/UpdatePlayer";

function EditPlayerWindow({ player, open, onClose }) {
  const [SponsorsName, setSponsorsName] = useState(player.firstName);
  const [number, setNumber] = useState(player.number);
  const [image, setImage] = useState(player.img);
  const [preview, setPreview] = useState(player.img);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!SponsorsName) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    }
      else if (!number) {
        alert("brak numeru")
      }
     else {
      const docRef = doc(db, "Sponsors", player.id)
      updateDoc(docRef,{
        firstName: SponsorsName,
        number: number,
        img: image
      })
      onClose();
      setSponsorsName("");
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
          onChange={(e) => setSponsorsName(e.target.value)}
          value={SponsorsName}
          className="firstPlayerName"
        />
        
        <label>Kolejność na plakacie</label>
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
            {preview && <img src={preview} />}
          </div>
          <div className="bin-container">{preview && <img src={bin} onClick= {() => setPreview(null) } />}</div>
        </div>
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setSponsorsName("");
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

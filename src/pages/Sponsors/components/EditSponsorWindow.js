import { useRef, useState} from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { db } from "../../../firebase/config";
import { doc, updateDoc  } from "firebase/firestore";

function EditPlayerWindow({ player, open, onClose }) {
  const [SponsorsName, setSponsorsName] = useState(player.firstName);
  const [number, setNumber] = useState(player.number);
  const [preview, setPreview] = useState(player.img);
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleEdit = (e) => {
    const file = e.target.files[0];
    if(file.size > 1000000) {
      alert("Maksymalny rozmiar obrazu to 1MB")
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

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
        img: preview
      })
      onClose();
      setSponsorsName("");
      setNumber(null);
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
           handleEdit(e)
          }}
        />
        <div className="add-logo-window">
          <div className="image-container">
            {preview && <img src={preview} alt="error" />}
          </div>
          <div className="bin-container">{preview && <img src={bin} onClick= {() => setPreview(null) } alt="error" />}</div>
        </div>
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setSponsorsName("");
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

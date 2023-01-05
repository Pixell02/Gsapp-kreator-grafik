import { useRef, useState, useEffect } from "react";
import "./addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { doc, updateDoc  } from "firebase/firestore";
import updatePlayer from "../../../hooks/UpdatePlayer";

function EditPlayerWindow({ yourTeam, open, onClose }) {
  const { id } = useParams();
  
  const [firstTeamName, setFirstTeamName] = useState(yourTeam.firstName);
  const [secondTeamName, setSecondTeamName] = useState(yourTeam.secondName);
  const [image, setImage] = useState(yourTeam.img);
  const [preview, setPreview] = useState(yourTeam.img);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  

  const handleEdit = (e) => {
    const file = e.target.files[0];
    if( file.size > 1000000) {
      alert("Maksymalny rozmiar obrazu to 1MB")
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    } 
    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstTeamName) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    }
      else if (!secondTeamName) {
        alert("puste pole")
      }
     else {
      const docRef = doc(db, "Teams", yourTeam.id)
      updateDoc(docRef,{
        firstName: firstTeamName,
        secondName: secondTeamName,
        img: preview
      })
      onClose();
      setFirstTeamName("");
      setSecondTeamName(null);
      setImage(null);
    }
    
  };

  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window">
        <label>Pierwsza część nazwy drużyny</label>
        <input
          type="text"
          onChange={(e) => setFirstTeamName(e.target.value)}
          value={firstTeamName}
          className="firstPlayerName"
        />
        
        <label>Druga część nazwy drużyny</label>
        <input
          type="text"
          onChange={(e) => setSecondTeamName(e.target.value)}
          value={secondTeamName}
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
            {preview && <img src={preview} />}
          </div>
          <div className="bin-container">{preview && <img src={bin} onClick= {() => setPreview(null) } />}</div>
        </div>
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setFirstTeamName("");
              setSecondTeamName("");
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

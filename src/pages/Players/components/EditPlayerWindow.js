import { useRef, useState, useEffect } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useTeams } from "./useTeams";
import Select from "react-select";

function EditPlayerWindow({ player, open, onClose, Teams }) {
  
  const [firstPlayerName, setFirstPlayerName] = useState(player.firstName);
  const [secondPlayerName, setSecondPlayerName] = useState(player.secondName);
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Teams, player.team);
  const [number, setNumber] = useState(player.number);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(player.img);
  const [preview, setPreview] = useState(player.img);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  
  

  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    if(image) {
      setIsImage(true);
    } else {
      setIsImage(false);
    }
  },[])
  const handleEdit = (e) => {
    setIsImage(false);
    const file = e.target.files[0];
    if (file.size > 2000000) {
      alert("Maksymalny rozmiar obrazu to 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };
  useEffect(() => {
    
    if(image === null) {
      setImage("");
    }
  },[image])
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isImage)
    if (!firstPlayerName || !secondPlayerName) {
      alert("puste pole");
    } else {
      
      if (isImage === false) {
        
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const storageRef = ref(
          storage,
          `${user.uid}/zawodnicy/${firstPlayerName}_${secondPlayerName}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                const docRef = doc(db, "Players", player.id)
                updateDoc(docRef, {
                  firstName: firstPlayerName,
                  secondName: secondPlayerName,
                  img: downloadURL,
                  number: number || "",
                  uid: user.uid,
                });
              })
              .catch((err) => console.log(err));
          }
        );
      } else {
        const docRef = doc(db, "Players", player.id);
        updateDoc(docRef, {
          firstName: firstPlayerName,
          secondName: secondPlayerName,
          number: number || "",
          team: selectedTeam,
          uid: user.uid,
        });
      }
      onClose();
      setFirstPlayerName("");
      setSecondPlayerName("");
      setNumber(null);
      setImage(null);
    }
  };

  return (
    <div className={open ? "active-modal m-edit" : "modal"}>
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
        <label>Drużyna</label>
        
        {/* <Select value={selectedTeam} options={teamOptions} onChange={(option) => handleTeamChange(option.value)} /> */}
        <select 
          name="country"
          className="form-control"
          value={selectedTeam}
          defaultValue={selectedTeam}
          onChange={(e) => handleTeamChange(e.target.value)}
        >
          <option value=""></option>
        {teamOptions && teamOptions.map((team) => (
          <option value={team.value}>{team.label}</option>
        ))}
         
        </select>
        <br />
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
            {preview && (
              <img
                src={bin}
                onClick={() => {
                  setPreview(null);
                  setImage("");
                }}
              />
            )}
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

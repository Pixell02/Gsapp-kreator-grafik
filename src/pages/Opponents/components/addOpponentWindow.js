import { useRef, useState, useEffect } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useTeams } from "../../Players/components/useTeams";
import Select from "react-select";

function AddOpponentWindow({ open, onClose, Teams }) {
  const { id } = useParams();

  const [firstOpponentName, setFirstOpponentName] = useState("");
  const [secondOpponentName, setSecondOpponentName] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Teams);
  const { user } = useAuthContext();

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  
  useEffect(() => {
    if (image) {
      if (Math.round(image.size / 1024) < 1000) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(image);
      } else {
        setPreview(null);
        alert("maksymalna wielkość obrazu to 1MB");
      }
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstOpponentName || !secondOpponentName) {
      alert("puste pole");
    } else if (!selectedTeam) {
      alert("nie wybrano drużyny")
    }
    else if (!preview) {
      alert("brak obrazu");
    } else {
      const storage = getStorage();
      const metadata = {
        contentType: "image/png",
      };
      const storageRef = ref(storage, `${user.uid}/przeciwnicy/${firstOpponentName}_${secondOpponentName}`);

      const uploadTask = uploadBytesResumable(storageRef, image, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const docRef = collection(db, "Opponents");
            addDoc(docRef, {
              firstName: firstOpponentName.trim(),
              secondName: secondOpponentName.trim(),
              img: downloadURL,
              uid: id ? id : user.uid,
              team: selectedTeam
            });
          });
        }
      );
      onClose(true);
      setFirstOpponentName("");
      setSecondOpponentName("");
      setImage(null);
    }
  };
  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window">
        <label>Pierwsza część nazwy przeciwnika</label>
        <input
          type="text"
          onChange={(e) => setFirstOpponentName(e.target.value)}
          value={firstOpponentName}
          className="firstOpponentName"
          required
        />
        <label>Druga część nazwy przeciwnika</label>
        <input
          type="text"
          onChange={(e) => setSecondOpponentName(e.target.value)}
          value={secondOpponentName}
          className="secondOpponentName"
          required
        />
        
          <>
            <label>Drużyna</label>
            <Select options={teamOptions} onChange={(e) => handleTeamChange(e.value)} />
          </>
       
        <button onClick={onButtonClick} className="btn primary-btn add-img">
          Dodaj Logo
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
          <div className="image-container">{preview && <img src={preview} className="image" />}</div>
          <div className="bin-container">{preview && <img src={bin} onClick={() => setPreview(null)} />}</div>
        </div>

        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
              setFirstOpponentName("");
              setSecondOpponentName("");
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

export default AddOpponentWindow;

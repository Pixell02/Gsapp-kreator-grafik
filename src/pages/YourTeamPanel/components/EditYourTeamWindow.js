import { useRef, useState, useEffect } from "react";
import "./addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import updatePlayer from "../../../hooks/UpdatePlayer";
import Select from "react-select";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import useEditModal from "../../../hooks/useEditModal";

const options = [
  { value: "piłka nożna", label: "piłka nożna" },
  { value: "siatkówka", label: "siatkówka" },
  { value: "koszykówka", label: "koszykówka" },
  { value: "piłka ręczna", label: "piłka ręczna" },
  { value: "hokej", label: "hokej" },
];
function EditPlayerWindow({ yourTeam, open, onClose }) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { isEditModal, openEditModal, closeEditModal } = useEditModal();
  const [firstTeamName, setFirstTeamName] = useState(yourTeam.firstName);
  const [secondTeamName, setSecondTeamName] = useState(yourTeam.secondName);
  const [isImage, setIsImage] = useState(true);
  const [sport, setSport] = useState(yourTeam.sport);
  const [image, setImage] = useState(yourTeam.img);
  const [preview, setPreview] = useState(yourTeam.img);

  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleEdit = (e) => {
    setIsImage(false);
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
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstTeamName) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    } else if (!secondTeamName) {
      alert("puste pole");
    } else {
      if (!isImage) {
        const storage = getStorage();
        const metadata = {
          contentType: "image/png",
        };
        const player = ref(
          storage,
          `${user.uid}/herb/${firstTeamName}_${secondTeamName}`
        );

        const uploadTask = uploadBytesResumable(player, image, metadata);

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
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                const docRef = doc(db, "Teams", yourTeam.id);
                updateDoc(docRef, {
                  firstName: firstTeamName,
                  secondName: secondTeamName,
                  img: downloadURL,
                  sport: sport,
                  uid: user.uid,
                });
              }
            );
          }
        );
      } else {
        const docRef = doc(db, "Teams", yourTeam.id);
        updateDoc(docRef, {
          firstName: firstTeamName,
          secondName: secondTeamName,
          sport: sport,
          uid: user.uid,
        });
      }
      onClose();
      setFirstTeamName("");
      setSecondTeamName(null);
      setImage(null);
    }
  };

  const getSport = (option) => {
    setSport(option.value);
  };

  return (
    <div className={open ? "active-modal mg-edit" : "modal"}>
      <div className="add-window mt-5">
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
        <label>Dyscyplina</label>

        <select
          name="country"
          className="form-control"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          required
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>

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

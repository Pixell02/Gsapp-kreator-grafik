import { useRef, useState, useEffect } from "react";
import "./addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Select from "react-select";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

function AddTeamWindow({ open, onClose }) {
  const [firstTeamName, setFirstTeamName] = useState("");
  const [secondTeamName, setSecondTeamName] = useState("");
  const [image, setImage] = useState(null);
  const [sport, setSport] = useState();
  const [preview, setPreview] = useState(null);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const getSport = (option) => {
    setSport(option.value);
  };
  const options = [
    { label: "piłka nożna", value: "piłka nożna" },
    { label: "siatkówka", value: "siatkówka" },
    { label: "koszykówka", value: "koszykówka" },
    { label: "piłka ręczna", value: "piłka ręczna" },
    { label: "hokej", value: "hokej" },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstTeamName || !secondTeamName) {
      return alert("puste pole");
    } else if (!preview) {
      return alert("brak obrazu");
    } else {
      const storage = getStorage();
      const metadata = {
        contentType: 'image/png'
      };
      const player = ref(storage, `${user.uid}/herb/${firstTeamName}_${secondTeamName}`);
    
    const uploadTask = uploadBytesResumable(player, image, metadata)
    
    uploadTask.on('state_changed', (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      console.log(error);
    },
      async() => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           addDoc(collection(db, "Teams"), {
        firstName: firstTeamName,
        secondName: secondTeamName,
        img: downloadURL,
        sport: sport,
        uid: user.uid,
      });
        });
      }
    )
     
      
      onClose(true);
      setFirstTeamName("");
      setSecondTeamName("");
      setImage(null);
    }
  };

  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window yourTeam-panel-window">
        <label>Pierwsza część nazwy drużyny</label>
        <input
          type="text"
          onChange={(e) => setFirstTeamName(e.target.value)}
          value={firstTeamName}
          className="firstTeamName"
          required
        />
        <label>Druga część nazwy drużyny</label>
        <input
          type="text"
          onChange={(e) => setSecondTeamName(e.target.value)}
          value={secondTeamName}
          className="secondTeamName"
          required
        />
        <label>Dyscyplina</label>
        <Select options={options} onChange={getSport} />
        <button onClick={onButtonClick} className="btn primary-btn add-img">
          Dodaj logo
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

export default AddTeamWindow;

import { useRef, useState, useEffect } from "react";
import "./addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Select from "react-select";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { sportOptions } from "../../../components/options";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { LicenseContext } from "../../../context/LicenseContext";
import { LanguageContext } from "../../../context/LanguageContext";
import translate from "./locales/yourTeamPanel.json"

function AddTeamWindow({ open, onClose }) {
  const [firstTeamName, setFirstTeamName] = useState("");
  const [secondTeamName, setSecondTeamName] = useState("");
  const { license } = useContext(LicenseContext)
  const { language } = useContext(LanguageContext);
  const { id } = useParams()
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
    }  else {
      if (preview) {
        const storage = getStorage();
        const metadata = {
          contentType: 'image/png'
        };
        const player = ref(storage, `${id ? id : user.uid}/herb/${firstTeamName}_${secondTeamName}`);
    
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
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDoc(collection(db, "Teams"), {
                firstName: firstTeamName.trim(),
                secondName: secondTeamName.trim(),
                img: downloadURL,
                sport: sport,
                uid: id ? id : user.uid,
              });
              
            });
          }
      
        )
      } else {
        addDoc(collection(db, "Teams"), {
          firstName: firstTeamName.trim(),
          secondName: secondTeamName.trim(),
          img: "",
          sport: sport,
          uid: id ? id : user.uid,
        });
      }
      
      onClose(true);
      setFirstTeamName("");
      setSecondTeamName("");
      setImage(null);
    }
  };

  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstTeamName[language]}</label>
        <input
          type="text"
          onChange={(e) => setFirstTeamName(e.target.value)}
          value={firstTeamName}
          className="firstTeamName"
          required
        />
        <label>{translate.secondTeamName[language]}</label>
        <input
          type="text"
          onChange={(e) => setSecondTeamName(e.target.value)}
          value={secondTeamName}
          className="secondTeamName"
          required
        />
        <label>{translate.discipline[language]}</label>
        <Select options={sportOptions} onChange={getSport} />
        <button onClick={onButtonClick} className="btn primary-btn add-img">
        {translate.addLogo[language]}
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
            {translate.Cancel[language]}
          </button>
          <button onClick={handleSubmit} className="btn primary-btn">
          {translate.Save[language]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTeamWindow;

import { useRef, useState, useEffect, useContext } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useTeams } from "../../Players/components/useTeams";
import translate from "../locales/locales.json";
import { LanguageContext } from "../../../context/LanguageContext";

function EditOpponentWindow({ player, open, onClose, Teams }) {
  const { language } = useContext(LanguageContext);
  const [firstOpponentName, setFirstOpponentName] = useState(player.firstName);
  const [secondOpponentName, setSecondOpponentName] = useState(player.secondName);
  const [image, setImage] = useState(player.img);
  const [isImage, setIsImage] = useState(true);
  const [preview, setPreview] = useState(player.img);
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Teams, player.team);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (!image) {
      setIsImage(false);
    }
  }, []);

  const handleEdit = (e) => {
    const file = e.target.files[0];
    setIsImage(false);
    if (file.size > 1000000) {
      alert(translate.maxSize[language]);
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
    if (!firstOpponentName || !secondOpponentName) {
      alert(translate.emptyField[language]);
    } else if (!selectedTeam) {
      alert(translate.noTeam[language]);
    } else {
      if (!isImage) {
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
              const docRef = doc(db, "Opponents", player.id);
              updateDoc(docRef, {
                firstName: firstOpponentName.trim(),
                secondName: secondOpponentName.trim(),
                img: downloadURL,
                team: selectedTeam,
              });
            });
          }
        );
      } else {
        const docRef = doc(db, "Opponents", player.id);
        updateDoc(docRef, {
          firstName: firstOpponentName.trim(),
          secondName: secondOpponentName.trim(),
          team: selectedTeam,
        });
      }
      onClose();
      setFirstOpponentName("");
      setSecondOpponentName("");
      setImage(null);
    }
  };

  return (
    <div className={open ? "active-modal m-edit" : "modal"}>
      <div className="add-window">
        <label>{translate.firstOpponentName[language]}</label>
        <input
          type="text"
          onChange={(e) => setFirstOpponentName(e.target.value)}
          value={firstOpponentName}
          className="firstPlayerName"
        />
        <label>{translate.secondOpponentName[language]}</label>
        <input
          type="text"
          onChange={(e) => setSecondOpponentName(e.target.value)}
          value={secondOpponentName}
          className="secondPlayerName"
        />
        <label>{translate.team[language]}</label>
        <select
          name="country"
          className="form-control"
          value={selectedTeam}
          defaultValue={selectedTeam}
          onChange={(e) => handleTeamChange(e.target.value)}
        >
          <option value=""></option>
          {teamOptions && teamOptions.map((team) => <option value={team.value}>{team.label}</option>)}
        </select>
        <button onClick={onButtonClick} className="btn primary-btn add-img">
          {translate.addCrest[language]}
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
          <div className="image-container">{preview && <img src={preview} />}</div>
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
            {translate.cancel[language]}
          </button>
          <button onClick={handleSubmit} className="btn primary-btn">
            {translate.save[language]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditOpponentWindow;

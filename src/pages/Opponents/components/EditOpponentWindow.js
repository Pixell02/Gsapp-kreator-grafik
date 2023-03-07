import { useRef, useState, useEffect } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import bin from "../../../img/binIcon.png";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { doc, updateDoc  } from "firebase/firestore";
import updatePlayer from "../../../hooks/UpdatePlayer";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

function EditPlayerWindow({ player, open, onClose }) {
  const [firstOpponentName, setFirstOpponentName] = useState(player.firstName);
  const [secondOpponentName, setSecondOpponentName] = useState(player.secondName);
  const [image, setImage] = useState(player.img);
  const [isImage, setIsImage] = useState(true);
  const [preview, setPreview] = useState(player.img);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if(!image) {
      setIsImage(false);
    } 
  },[])

  const handleEdit = (e) => {
    const file = e.target.files[0];
    setIsImage(false);
    if(file.size > 1000000) {
      alert("Maksymalny rozmiar obrazu to 1MB")
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
    setImage(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstOpponentName ) {
      alert("brak pierwszej części nazwy drużyny");
    } else if (!secondOpponentName) {
      alert("brak drugiej części nazwy drużyny");
    }
     else if (!preview) {
      alert("brak zdjecia");
    }
     else {
      if(!isImage){
      const storage = getStorage();
      const metadata = {
        contentType: "image/png",
      };
      const storageRef = ref(
        storage,
        `${user.uid}/przeciwnicy/${firstOpponentName}_${secondOpponentName}`
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
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const docRef = doc(db, "Opponents", player.id);
            updateDoc(docRef, {
              firstName: firstOpponentName,
              secondName: secondOpponentName,
              img: downloadURL,
              uid: user.uid,
            });
          });
        }
      );
      } else {
        const docRef = doc(db, "Opponents", player.id);
        updateDoc(docRef, {
          firstName: firstOpponentName,
          secondName: secondOpponentName,
          uid: user.uid,
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
        <label>Pierwsza część nazwy przeciwnika</label>
        <input
          type="text"
          onChange={(e) => setFirstOpponentName(e.target.value)}
          value={firstOpponentName}
          className="firstPlayerName"
        />
        <label>Druga część nazwy przeciwnika</label>
        <input
          type="text"
          onChange={(e) => setSecondOpponentName(e.target.value)}
          value={secondOpponentName}
          className="secondPlayerName"
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

export default EditPlayerWindow;

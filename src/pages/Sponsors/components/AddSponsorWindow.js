import { useState } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import InputImage from "../../../components/InputImage";
import ImagePreview from "../../../components/ImagePreview";
import ButtonContainer from "../../../components/ButtonContainer";
import useFileReader from "../../../hooks/useFileReader";
import useStorage from "../../../hooks/useStorage";
import { useParams } from "react-router-dom";

function AddSponsorWindow({ open, onClose }) {
  
  const { id } = useParams();
  const { user } = useAuthContext();
  const [sponsorData, setSponsorData] = useState({
    name: "",
    number: 0,
    uid: user.uid
  })
 
  const [image, setImage] = useState(null);
  const { preview, setPreview } = useFileReader(image || null);
  const { handleAddImage } = useStorage();

  const handleValueChange = (e) => {
    const { value, className } = e.target;
    setSponsorData(prev => ({
      ...prev,
      [className]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sponsorData.name === "" || !sponsorData.number === 0) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    } else {
      const downloadURL = await handleAddImage(image, `${id ? id : user.uid}/sponsorzy/${sponsorData.name}`)
      await addDoc(collection(db, "Sponsors"), {
        ...sponsorData,
        img: downloadURL
      });
      onClose(true);
      setSponsorData(prev => ({
        ...prev,
        name: "",
        number: 0
      }))
      setImage(null);
    }
  };

  const handleClick = () => {
    onClose(true);
    setSponsorData(prev => ({
      ...prev,
      name: "",
      number: 0
    }))
  }
  return (
    <div className={open ? "active-modal" : "modal"}>
      <div className="add-window">
        <label for="firstPlayerName">Nazwa sponsora</label>
        <input
          type="text"
          onChange={handleValueChange}
          value={sponsorData.name}
          className="name"
        />
        <label for="Number">Który z kolei ma się pokazywać</label>
        <input type="number" onChange={handleValueChange} value={sponsorData.number} className="number" />
        <InputImage setImage={setImage} />
        <ImagePreview preview={preview} setPreview={setPreview} />
        <ButtonContainer handleClick={handleClick} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default AddSponsorWindow;

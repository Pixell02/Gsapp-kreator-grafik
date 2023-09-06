import { useState } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";


const AddPlaceWindow = ({onClose}) => {

  const {user} = useAuthContext()
  const [place, setPlace] = useState("boisko w");

  const handleSave = () => {
    const docRef = collection(db, "placePreset")
    addDoc(docRef, {
      uid: user.uid,
      place: place
    })
    onClose();
  }

  return (
    <div className="active-modal">
      <div className="add-window">
        <label>Miejsce</label>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)}/>
        <div className="d-flex w-100 justify-content-end">
          <button className="btn" onClick={() => onClose()}>Zamknij</button>
          <button className="btn" onClick={handleSave} >Dodaj</button>
        </div>
      </div>
      
    </div>
  )
}

export default AddPlaceWindow

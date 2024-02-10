import { Dispatch, SetStateAction, useState } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ButtonContainer from "../../../components/ButtonContainer";

type props = {
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

const AddPlaceWindow = ({ setSelectedModal }: props) => {
  const { user } = useAuthContext();
  const [place, setPlace] = useState("boisko w");

  const handleSave = () => {
    const docRef = collection(db, "placePreset");
    addDoc(docRef, {
      uid: user.uid,
      place: place,
    });
    setSelectedModal(0);
  };

  return (
    <div className="active-modal">
      <div className="add-window">
        <label>Miejsce</label>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
        <ButtonContainer handleClick={() => setSelectedModal(0)} handleSubmit={handleSave} />
      </div>
    </div>
  );
};

export default AddPlaceWindow;

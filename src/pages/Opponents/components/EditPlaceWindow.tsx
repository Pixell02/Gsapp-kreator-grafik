import { doc, updateDoc } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useState } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { db } from "../../../firebase/config";
import { Place } from "./PlaceContent";
import ButtonContainer from "../../../components/ButtonContainer";

type props = {
  data: Place;
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

const EditPlaceWindow = ({ data, setSelectedModal }: props) => {
  const [place, setPlace] = useState(data.place);

  const handleSave = async () => {
    const docRef = doc(db, "placePreset", data.id);
    await updateDoc(docRef, {
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

export default EditPlaceWindow;

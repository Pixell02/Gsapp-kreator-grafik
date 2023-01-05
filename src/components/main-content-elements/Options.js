import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import AddTeamWindow from "../../pages/YourTeamPanel/components/addTeamWindow";
import { useParams } from "react-router-dom";
import EditPlayerWindow from "../../pages/Players/components/EditPlayerWindow";
import useEditModal from "../../hooks/useEditModal";
import * as Icon from "react-bootstrap-icons";
import "./Block.css";

export default function Options({ team }) {
  

  const handleClick = async (id) => {
    const ref = doc(db, "Players", id);
    await deleteDoc(ref);
  };

  return (
    <div className="show-list">
      <div className="edit-element">
        <button key={team.id} >
          Edytuj
        </button>
      </div>
      <div className="delete-element">
        <button key={team.id} onClick={() => handleClick(team.id)}>
          Usuń
        </button>
      </div>
    </div>
  );
}

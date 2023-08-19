import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import "./Block.css";

export default function Options({ team }) {
  

  const handleEdit = () => {

  }

  const handleClick = async (id) => {
    const ref = doc(db, "Players", id);
    await deleteDoc(ref);
  };

  return (
    <div className="show-list">
      <div className="edit-element">
        <button onClick={() => handleEdit(team)}  >
          Edytuj
        </button>
      </div>
      <div className="delete-element">
        <button onClick={() => handleClick(team.id)}>
          Usuń
        </button>
      </div>
    </div>
  );
}

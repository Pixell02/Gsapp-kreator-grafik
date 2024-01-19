import { collection, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import React from "react";
import { db } from "../../../../../firebase/config";
import useFindTeam from "./hooks/useFindTeam";

const ProvinceTeamsTable = ({ selectedProvince }) => {
  const { documents: Teams } = useFindTeam(selectedProvince);

  const handleDelete = async (item) => {
    const docRef = doc(collection(db, "AllTeams"), item.id);
    const storage = getStorage();
    const desertRef = ref(storage, `województwo/${item.province}/${item.name}`);
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        console.log(error);
      });
    await deleteDoc(docRef);
  };

  return (
    <div>
      <h4>Województwo {selectedProvince}</h4>
      <table className="d-flex w-100 flex-column">
        <thead className="d-flex w-100">
          <th className="d-flex w-100">
            <td className="d-flex justify-content-center w-100">Herb</td>
            <td className="d-flex justify-content-center w-100">Nazwa drużyny</td>
          </th>
        </thead>
        <tbody className="d-flex w-100">
          {Teams?.map((item) => (
            <>
              <tr className="d-flex justify-content-center w-100">
                <img src={item.src} style={{ height: "50px", width: "auto" }} alt={item.name} />
              </tr>
              <tr className="d-flex justify-content-center w-100">
                <span>{item.name}</span>
              </tr>
              <tr>
                <button onClick={() => handleDelete(item)}>Usuń</button>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProvinceTeamsTable;

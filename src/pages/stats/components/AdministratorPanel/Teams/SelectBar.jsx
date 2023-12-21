import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Select from "react-select";
import { db } from "../../../../../firebase/config";
import useStorage from "../../../../../hooks/useStorage";

const SelectBar = ({ options, selectedProvince, setSelectedProvince }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { handleAddImage } = useStorage();
  const handleSave = async () => {
    const docRef = collection(db, "AllTeams");
    const downloadURL = await handleAddImage(
      image,
      `województwo/${selectedProvince}/${name}`
    );
    addDoc(docRef, {
      name: name,
      src: downloadURL,
      province: selectedProvince,
    });
    setName("");
    setImage(null);
  };

  return (
    <div>
      <label>Województwo</label>
      <Select
        options={options}
        onChange={(option) => setSelectedProvince(option.value)}
      />
      <div className="d-flex w-50 align-items-center">
        <div className="d-flex flex-column h-100">
          <label>Nazwa drużyny</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <input
          type="file"
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
        <button className="d-flex btn" onClick={handleSave}>
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default SelectBar;

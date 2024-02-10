import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import { db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { Sponsor } from "./Sponsors-MainContent";
import useFileReader from "../../../hooks/useFileReader";
import useStorage from "../../../hooks/useStorage";
import InputImage from "../../../components/InputImage";
import ImagePreview from "../../../components/ImagePreview";
import ButtonContainer from "../../../components/ButtonContainer";

type props = {
  data: Sponsor;
  setSelectedModal: Dispatch<SetStateAction<number>>;
};

function EditSponsorWindow({ data, setSelectedModal }: props) {
  const [sponsorData, setSponsorData] = useState<Sponsor>({ ...data });

  const { preview, setPreview } = useFileReader(data.img);
  const { uploadImage } = useStorage();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    setSponsorData((prev) => ({
      ...prev,
      [className]: value,
    }));
  };

  const handleSubmit = async () => {
    if (sponsorData.name === "" || sponsorData.number === 0) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    } else {
      const downloadURL = await uploadImage(sponsorData.img, `${sponsorData.uid}/sponsor/${sponsorData.name}`);
      const docRef = doc(db, "Sponsors", data.id as string);
      await updateDoc(docRef, {
        ...sponsorData,
        img: downloadURL?.src,
      });
      setSelectedModal(0);
    }
  };
  const handleClick = () => {
    setSelectedModal(0);
  };

  const handleReadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSponsorData((prev) => ({ ...prev, img: file }));
  };
  return (
    <div className="active-modal">
      <div className="add-window">
        <label>Nazwa sponsora</label>
        <input type="text" onChange={handleValueChange} value={sponsorData.name} className="name" />
        <label>Który z kolei ma się pokazywać</label>
        <input type="number" onChange={handleValueChange} min={1} value={sponsorData.number} className="number" />
        <InputImage handleReadFile={handleReadFile} />
        <ImagePreview preview={preview} setPreview={setPreview} />
        <ButtonContainer handleClick={handleClick} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default EditSponsorWindow;

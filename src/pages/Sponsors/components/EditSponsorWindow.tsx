import { Dispatch, SetStateAction, useState } from "react";
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
  sponsorNumbersArray: number[];
};

function EditSponsorWindow({ data, setSelectedModal, sponsorNumbersArray }: props) {
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
    } else if (sponsorNumbersArray.find((item) => item === sponsorData.number) && sponsorData.number !== data.number) {
      alert("taki numer jest już przypisany");
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

  return (
    <div className="active-modal">
      <div className="add-window">
        <label>Nazwa sponsora</label>
        <input type="text" onChange={handleValueChange} value={sponsorData.name} className="name" />
        <label>Który z kolei ma się pokazywać</label>
        <input type="number" onChange={handleValueChange} min={1} value={sponsorData.number} className="number" />
        <InputImage setState={setSponsorData} />
        <ImagePreview preview={preview as string} setState={setPreview} />
        <ButtonContainer handleClick={handleClick} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default EditSponsorWindow;

import { Dispatch, SetStateAction, useState } from "react";
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
import { Sponsor } from "./Sponsors-MainContent";

type props = {
  defaultNumber: number;
  setSelectedModal: Dispatch<SetStateAction<number>>;
  sponsorNumbersArray: number[];
};

function AddSponsorWindow({ defaultNumber, setSelectedModal, sponsorNumbersArray }: props) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [sponsorData, setSponsorData] = useState<Sponsor>({
    name: "",
    img: "",
    number: defaultNumber,
    uid: id || user.uid,
  });

  const { preview } = useFileReader(sponsorData.img);
  const { uploadImage } = useStorage();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    setSponsorData((prev) => ({
      ...prev,
      [className]: className === "number" ? parseInt(value) : value,
    }));
  };
  const handleSubmit = async () => {
    if (sponsorData.name === "" || sponsorData.number === 0) {
      alert("puste pole");
    } else if (!preview) {
      alert("brak zdjecia");
    } else if (sponsorNumbersArray.find((item) => item === sponsorData.number)) {
      alert("taki numer jest już przypisany");
    } else {
      const downloadURL = await uploadImage(sponsorData.img, `${id || user.uid}/sponsorzy/${sponsorData.name}`);

      await addDoc(collection(db, "Sponsors"), {
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
        <ImagePreview preview={preview as string} setState={setSponsorData} />
        <ButtonContainer handleClick={handleClick} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default AddSponsorWindow;

import { useState } from 'react';
import './addTeamWindow.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useAuthContext } from '../../../hooks/useAuthContext';
import Select from 'react-select';
import { sportOptions } from '../../../components/options';
import { useParams } from 'react-router-dom';
import translate from './locales/yourTeamPanel.json';
import useStorage from '../../../hooks/useStorage';
import ImagePreview from '../../../components/ImagePreview';
import useFileReader from '../../../hooks/useFileReader';
import InputImage from '../../../components/InputImage';
import ButtonContainer from '../../../components/ButtonContainer';
import { useLanguageContext } from '../../../context/LanguageContext';

function AddTeamWindow({ open, onClose }) {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [teamData, setTeamData] = useState({
    firstName: '',
    secondName: '',
    sport: '',
    uid: id ? id : user.uid,
  });
  const { language } = useLanguageContext();
  const { handleAddImage } = useStorage();
  const [image, setImage] = useState(null);
  const { preview, setPreview } = useFileReader(image);

  const getSport = option => {
    setTeamData(prev => ({
      ...prev,
      sport: option.value,
    }));
  };

  const handleChangeValue = e => {
    const { className, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [className]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!teamData.firstName || !teamData.secondName) {
      return alert('puste pole');
    } else {
      if (preview) {
        const downloadURL = await handleAddImage(
          image,
          `${id ? id : user.uid}/herb/${teamData.firstName}_${teamData.secondName}`
        );
        addDoc(collection(db, 'Teams'), {
          ...teamData,
          img: downloadURL,
        });
      } else {
        addDoc(collection(db, 'Teams'), {
          ...teamData,
        });
      }
      onClose(true);
      setImage(null);
    }
  };
  const handleClick = () => {
    onClose();
    setTeamData(prev => ({
      ...prev,
      firstName: '',
      secondName: '',
    }));
    setImage(null);
  };

  return (
    <div className={open ? 'active-modal' : 'modal'}>
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstTeamName[language]}</label>
        <input
          type="text"
          onChange={handleChangeValue}
          value={teamData.firstName}
          className="firstName"
          required
        />
        <label>{translate.secondTeamName[language]}</label>
        <input
          type="text"
          onChange={handleChangeValue}
          value={teamData.secondName}
          className="secondName"
          required
        />
        <label>{translate.discipline[language]}</label>
        <Select
          options={sportOptions}
          onChange={getSport}
        />
        <InputImage setImage={setImage} />
        <ImagePreview
          preview={preview}
          setPreview={setPreview}
        />
        <ButtonContainer
          handleClick={handleClick}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AddTeamWindow;

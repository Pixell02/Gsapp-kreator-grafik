import React, { useEffect, useState } from 'react';
import './addTeamWindow.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import translate from '../../Players/locales/translate.json';
import useFileReader from '../../../hooks/useFileReader';
import useStorage from '../../../hooks/useStorage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import InputImage from '../../../components/InputImage';
import ImagePreview from '../../../components/ImagePreview';
import ButtonContainer from '../../../components/ButtonContainer';
import { useTeams } from '../../Players/components/useTeams';
import Select from 'react-select';
import { useLanguageContext } from '../../../context/LanguageContext';

const EditTrainerWindow = ({ Team, onClose, open, data }) => {
  const { user } = useAuthContext();
  const [image, setImage] = useState(data.img);
  const { language } = useLanguageContext();
  const { id } = useParams();
  const { preview, setPreview } = useFileReader(image);
  const { handleAddImage } = useStorage();
  const [isImage, setIsImage] = useState(false);
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Team);
  const [trainerData, setTrainerData] = useState({
    firstName: data.firstName,
    secondName: data.secondName,
    team: data.team,
    uid: user.uid,
  });
  useEffect(() => {
    if (image) return setIsImage(true);
  }, [image]);

  const handleValueChange = (e) => {
    const { className, value } = e.target;

    setTrainerData((prev) => ({
      ...prev,
      [className]: value,
    }));
  };

  const handleClick = () => {
    onClose();
    setTrainerData((prev) => ({
      ...prev,
      firstName: '',
      secondName: '',
      team: '',
    }));
    setImage(null);
  };
  const handleSubmit = async () => {
    if (!trainerData.firstName || !trainerData.secondName || !trainerData.team) {
      return alert('puste pole');
    } else {
      const docRef = doc(db, 'Trainers', data.id);
      if (!image) {
        updateDoc(docRef, {
          ...trainerData,
          img: '',
        });
      } else {
        const downloadURL = await handleAddImage(
          image,
          `${id ? id : user.uid}/trenerzy/${trainerData.firstName}_${trainerData.secondName}`
        );
        updateDoc(docRef, {
          ...trainerData,
          img: downloadURL,
        });
      }
      onClose();
    }
  };
  return (
    <div className={open ? 'active-modal' : 'modal'}>
      <div className="add-window yourTeam-panel-window">
        <label>{translate.firstName[language]}</label>
        <input
          value={trainerData.firstName}
          className="firstName"
          onChange={handleValueChange}
        />
        <label>{translate.lastName[language]}</label>
        <input
          value={trainerData.secondName}
          className="secondName"
          onChange={handleValueChange}
        />
        <label>{translate.team[language]}</label>
        <Select
          options={teamOptions}
          onChange={(e) => handleTeamChange(e.value)}
        />
        <InputImage setImage={setImage} />
        <ImagePreview
          preview={preview || image}
          setPreview={!preview ? setImage : setPreview}
        />
        <ButtonContainer
          handleClick={handleClick}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditTrainerWindow;

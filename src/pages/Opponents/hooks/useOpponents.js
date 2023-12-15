import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useStorage from '../../../hooks/useStorage';
import { useTeams } from '../../Players/components/useTeams';
import translate from '../locales/locales.json';
import { useLanguageContext } from '../../../context/LanguageContext';

const useOpponents = (Teams, image, data) => {
  const { user } = useAuthContext();
  const [opponent, setOpponent] = useState({
    firstName: data?.firstName || '',
    secondName: data?.secondName || '',
  });

  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Teams, data?.team);
  const { language } = useLanguageContext();
  const { handleAddImage } = useStorage();
  const { id } = useParams();

  const handleValueChange = (e, className) => {
    setOpponent((prev) => ({
      ...prev,
      [className]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!opponent.firstName || !opponent.secondName) {
      alert(translate.emptyField[language]);
    } else if (!selectedTeam) {
      alert(translate.noTeam[language]);
    } else {
      const docRef = collection(db, 'Opponents');
      if (image?.size) {
        const downloadURL = await handleAddImage(
          image,
          `${user.uid}/przeciwnicy/${opponent.firstName}_${opponent.secondName}`
        );
        if (!data) {
          addDoc(docRef, {
            firstName: opponent.firstName.trim(),
            secondName: opponent.secondName.trim(),
            img: downloadURL,
            uid: id ? id : user.uid,
            team: selectedTeam,
          });
        } else {
          const ref = doc(collection(db, 'Opponents'), data.id);
          updateDoc(ref, {
            firstName: opponent.firstName.trim(),
            secondName: opponent.secondName.trim(),
            img: downloadURL || '',
            team: selectedTeam,
          });
        }
      } else {
        if (!data) {
          addDoc(docRef, {
            firstName: opponent.firstName.trim(),
            secondName: opponent.secondName.trim(),
            img: '',
            uid: id ? id : user.uid,
            team: selectedTeam,
          });
        } else {
          const ref = doc(collection(db, 'Opponents'), data.id);
          updateDoc(ref, {
            firstName: opponent.firstName.trim(),
            secondName: opponent.secondName.trim(),
            img: '',
            team: selectedTeam,
          });
        }
      }
      setOpponent({
        firstName: '',
        secondName: '',
      });
    }
  };

  return {
    handleSubmit,
    opponent,
    teamOptions,
    handleTeamChange,
    setOpponent,
    handleValueChange,
    selectedTeam,
  };
};

export default useOpponents;

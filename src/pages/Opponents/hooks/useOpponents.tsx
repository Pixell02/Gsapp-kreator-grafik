import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../firebase/config";
import useStorage from "../../../hooks/useStorage";
import translation from "../locales/locales.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { Opponent } from "../../../types/teamTypes";
import { translationProps } from "../../../types/translationTypes";
import { useAuthContext } from "../../../hooks/useAuthContext";

const useOpponents = (data?: Opponent) => {
  const translate: translationProps = translation;
  const { user } = useAuthContext();
  const [opponent, setOpponent] = useState<Opponent>({
    firstName: data?.firstName || "",
    secondName: data?.secondName || "",
    uid: data?.uid || user.uid,
    team: data?.team || "",
    img: data?.img || "",
  });

  const { language } = useLanguageContext();
  const { uploadImage } = useStorage();

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, className } = e.target;
    setOpponent((prev) => ({
      ...prev,
      [className]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!opponent.firstName || !opponent.secondName) {
      alert(translate.emptyField[language]);
    } else if (!opponent.team) {
      alert(translate.noTeam[language]);
    } else {
      const downloadURL = await uploadImage(
        opponent.img,
        `${opponent.uid}/przeciwnicy/${opponent.firstName}_${opponent.secondName}`
      );
      if (data) {
        const docRef = doc(db, "Opponents", data?.id as string);
        await updateDoc(docRef, { ...opponent, img: downloadURL?.src });
      } else {
        const docRef = collection(db, "Opponents");
        await addDoc(docRef, { ...opponent, img: downloadURL?.src });
      }
    }
  };

  return {
    handleSubmit,
    opponent,
    setOpponent,
    handleValueChange,
  };
};

export default useOpponents;

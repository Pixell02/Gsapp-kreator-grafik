import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { db } from '../../../firebase/config';
import { LanguageContext } from '../../../context/LanguageContext';
import translate from "../locales/translate.json"

const usePromoCode = () => {

  const {language} = useContext(LanguageContext)

  const [promoCode, setPromoCode] = useState({
    code: ""
  });
  const [usedCode, setUsedCode] = useState("");
  const [alert, setAlert] = useState("");

  const handleUseCode = async (value) => {
    let ref = query(collection(db, "promoCode"), where("code", "==", usedCode));
    
    try {
      const snapshot = await getDocs(ref);
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      });

      
      if (results.length > 0) {
        const docRef = doc(db, "promoCode", results[0].id);
        if (results[0].amount > 0) {
          await updateDoc(docRef, {
            amount: results[0].amount - 1 
          });
          setPromoCode(results[0]);
        setAlert(translate.success[language]);
        } else if (results[0].amount === 0) {
          await deleteDoc(docRef);
          setAlert(translate.codeUsed[language]);
        }
      } else {
        setAlert(translate.doesntExist[language]);
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };
  
  return { promoCode, alert, handleUseCode, usedCode, setUsedCode}
}

export default usePromoCode

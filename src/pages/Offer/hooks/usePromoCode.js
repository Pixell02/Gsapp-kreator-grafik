import { collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../firebase/config';

const usePromoCode = () => {
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
        setAlert("użyto pomyślnie");
        } else if (results[0].amount === 0) {
          await deleteDoc(docRef);
          setAlert("kod został zużyty lub nie istnieje");
        }
      } else {
        setAlert("kod nie istnieje");
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };
  
  return { promoCode, alert, handleUseCode, usedCode, setUsedCode}
}

export default usePromoCode

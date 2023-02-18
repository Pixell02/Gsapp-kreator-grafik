import axios from "axios";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import moment from "moment";

export default function Success() {
  const [status, setStatus] = useState("");
  const { user } = useAuthContext();
  const [userDate, setUserDate] = useState();
  const location = useLocation();
  // const { documents: transactions} = useCollection()
  const currentPath = location.search;
  console.log(currentPath)
  const [transaction, setTransaction] = useState();
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);

  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "transaction");
    const q = query(colRef, where("uid", "==", user.uid));
    let trans = [];
    onSnapshot(q, (snapshot) => {
      let order = [];
      snapshot.docs.forEach((doc) => {
        order.push({ ...doc.data(), id: doc.id });
      });
      setTransaction(order);
    });
  }, []);

  useEffect(() => {
    if (transaction) {
      console.log(transaction);
      if (transaction.length > 0) {
        if (currentPath !== "?error=501") {
          if (License.length > 0) {
            const order = localStorage.getItem("amount");
            const currentDate = moment().format("MM-DD-YYYY");
            const amount = parseInt(order);
            const numberOfMonths = amount / 5000;
            const newDate = moment(currentDate)
              .add(numberOfMonths, "months")
              .format("MM-DD-YYYY");

            const docRef = doc(db, "user", License[0].id);
            setDoc(docRef, {
              license: "full-license",
              uid: user.uid,
              expireDate: newDate,
            });
            const ref = doc(db, "transaction", transaction[0].id);
            deleteDoc(ref);
            
          }
        }
      } else {
        if(transaction[0]){
        const ref = doc(db, "transaction", transaction[0].id);
        deleteDoc(ref);
        
        }
      }
    } else {
      setTimeout(() => {
        navigate("/account");
      }, 1000);
    }
  }, [userDate, transaction]);

  setTimeout(() => {
    navigate("/account");
  }, 1500);

  return <div></div>;
}

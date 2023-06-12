import axios from "axios";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import moment from "moment";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function Success() {
  const { user } = useAuthContext();
  const [orderId, setOrderId] = useState(localStorage.getItem("orderId"));
  const functions = getFunctions();
  const getOrder = httpsCallable(functions, "getOrder");
  const navigate = useNavigate();
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);
  
  const [currentDate] = useState(moment().format("MM-DD-YYYY"));
  
  const handleGetOrder = async () => {
    try {
      const response = await getOrder({ orderId });
      const order = response.data[0];
      const orderRef = collection(db, "orders");
      addDoc(orderRef, order);
      if (order.status === "COMPLETED") {
        if (order.description === "Licencja") {
          const newDate = moment(currentDate).add(1, "months").format("MM-DD-YYYY");
          const docRef = doc(db, "user", License[0].id);
          setDoc(docRef, {
            license: "full-license",
            uid: user.uid,
            expireDate: newDate,
          });
        } 
      const historyRef = collection(db, "history");
      addDoc(historyRef, {
        uid: user.uid,
        type: order.description,
        orderId: order.orderId,
        products: order.products,
        date: Date.now(),
      });
      }
      localStorage.removeItem("orderId")
      navigate("/account")
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (orderId && License) {
      if (License.length > 0) {
        handleGetOrder();
      }
    }
  }, [License]);

  return <div></div>;
}

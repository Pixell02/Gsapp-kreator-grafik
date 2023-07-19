
import { addDoc, collection, doc,setDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import moment from "moment";
import { getFunctions, httpsCallable } from "firebase/functions";
import { LanguageContext } from "../../context/LanguageContext";

export default function Success() {
  const { user } = useAuthContext();
  const { documents: ordersId } = useCollection("orderId", ["uid", "==", user.uid])
  const { language } = useContext(LanguageContext);
  const functions = getFunctions();
  const getOrder = httpsCallable(functions, "getOrder");
  const createFax = httpsCallable(functions, "createFax");
  const navigate = useNavigate();
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);
  const [orderId, setOrderId] = useState(null);
  const [currentDate] = useState(moment().format("MM-DD-YYYY"));
  const [status, setStatus] = useState(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if(ordersId?.length > 0)
    setOrderId(ordersId[0].orderId)
  },[ordersId])
  const handleGetOrder = async () => {
    try {
      const response = await getOrder({ orderId });
      const order = response.data[0];
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
        const res = await createFax({ order })
        console.log(res);
      const historyRef = collection(db, "history");
      addDoc(historyRef, {
        uid: user.uid,
        type: order.description,
        buyer: order.buyer,
        delivery: order.buyer.delivery,
        orderId: order.orderId,
        products: order.products,
        date: Date.now(),
      });
      }
      const orderRef = doc(db, "orderId", user.uid);
      setDoc(orderRef, {
        orderId: "",
        uid:user.uid
      });
      navigate(`/${language}/account`)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (orderId && License && !isReady) {
      if (License.length > 0) {
        handleGetOrder();
        setIsReady(true);
      }
    }
  }, [License, orderId]);

  return (
    <div className="d-flex w-100 h-100">
      {/* {orderId && (
        <div>
          <span>Pobieramy status zamówienia {orderId}</span>
        </div>
      )} */}
    </div>
  );
}

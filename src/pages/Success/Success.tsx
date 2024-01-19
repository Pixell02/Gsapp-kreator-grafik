import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { useDoc } from "../../hooks/useDoc";
import { useCollection } from "../../hooks/useCollection";

type order = {
  status: string;
  description: string;
  buyer: {
    delivery: {
      postalCode: string;
    };
  };
  orderId: string;
  products: {
    name: string;
  }[];
};
type Response = {
  data: order[];
};
type License = {
  id: string;
};

export default function Success() {
  const { user } = useAuthContext();
  const { documents: ordersId } = useDoc("orderId", ["uid", "==", user.uid]);
  const [orderData, setOrderData] = useState<string | null>(null);
  const { language } = useLanguageContext();
  const functions = getFunctions();
  const getOrder = httpsCallable(functions, "getOrder");
  const createFax = httpsCallable(functions, "createFax");
  const checkTransactionStatus = httpsCallable(functions, "checkTransactionStatus");
  const transactionConfirmation = httpsCallable(functions, "transactionConfirmation");
  const navigate = useNavigate();
  const { documents: License } = useDoc("user", ["uid", "==", user.uid]);
  const { documents: users } = useCollection("user", ["team", "==", user.uid]);
  const [orderId, setOrderId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentDate = moment().format("MM-DD-YYYY");
  const [status, setStatus] = useState("Pobieranie numeru zamówienia");
  useEffect(() => {
    checkTransactionStatus({
      user: {
        email: user.email,
        uid: user.uid,
      },
    });
  }, [checkTransactionStatus, user]);
  useEffect(() => {
    if (ordersId?.orderId) {
      setOrderId(ordersId.orderId);
      setStatus(`Pobieranie statusu zamówienia ${ordersId.orderId}`);
    } else {
      setStatus("Brak zamówień");
    }
  }, [ordersId]);
  const handleGetOrder = async (orderId: string, License: License) => {
    try {
      const response = (await getOrder({ orderId })) as Response;
      const order = response.data[0];
      setStatus(`Status zamówienia ${orderId} to ${order.status}`);
      if (order.status === "NEW") {
        handleGetOrder(orderId, License);
      } else if (order.status === "COMPLETED") {
        const text = order.products[0].name;
        const regex = /\d+/;
        const match = text.match(regex);
        const number = parseInt(match?.[0] || "", 10);
        const newDate = moment(currentDate).add(number, "months").format("MM-DD-YYYY");
        setOrderData(newDate);
        const docRef = doc(db, "user", License?.id);
        setStatus(`Przyznawanie licencji, która wygaśnie ${newDate}`);

        await setDoc(docRef, {
          license: "full-license",
          uid: user.uid,
          expireDate: newDate,
        });
        const transRes = await transactionConfirmation({
          user: {
            email: user.email,
            uid: user.uid,
          },
        });
        const faxRes = await createFax({ order });
        console.log(transRes, faxRes);
        const historyRef = collection(db, "history");
        await addDoc(historyRef, {
          uid: user.uid,
          type: order.description,
          buyer: order.buyer,
          delivery: order.buyer.delivery,
          orderId: order.orderId,
          products: order.products,
          date: Date.now(),
        })
          .then(() => {
            setStatus(`Przekierowanie nastąpi za 3 sekundy`);
          })
          .then(async () => {
            const orderRef = doc(db, "orderId", user.uid);
            await setDoc(orderRef, {
              orderId: "",
              uid: user.uid,
            }).then(async () => {
              const accountRef = doc(db, "teamAccounts", user.uid);
              await updateDoc(accountRef, {
                expireDate: newDate,
              })
                .then((res) => {
                  console.log(res);
                  navigate(`/${language}/account`);
                })
                .catch((res) => {
                  console.log(res);
                  navigate(`/${language}/account`);
                });
            });
          });
      } else {
        const orderRef = doc(db, "orderId", user.uid);
        await setDoc(orderRef, {
          orderId: "",
          uid: user.uid,
        }).then(() => {
          navigate(`/${language}/account`);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (orderId && License) {
      setIsLoaded(true);
    }
  }, [License, orderId]);

  useEffect(() => {
    if (isLoaded) {
      handleGetOrder(orderId || "", License as License);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (users && users.length > 0 && orderData) {
      users.forEach((users) => {
        const userRef = doc(db, "user", users.id);
        setDoc(userRef, {
          license: "full-license",
          uid: users.uid,
          expireDate: orderData,
        });
      });
    }
  }, [users, orderData]);

  return (
    <div className="page-container">
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
        <span>{status}</span>
      </div>
    </div>
  );
}

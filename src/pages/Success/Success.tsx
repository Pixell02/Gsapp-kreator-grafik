import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLanguageContext } from "../../context/LanguageContext";
import { useDoc } from "../../hooks/useDoc";

type OrderId = {
  orderId: string;
};

export default function Success() {
  const { user } = useAuthContext();
  const { language } = useLanguageContext();
  const { documents: ordersId } = useDoc<OrderId>("orderId", ["uid", "==", user.uid]);
  const functions = getFunctions();
  const transaction = httpsCallable(functions, "transaction");
  const navigate = useNavigate();
  useEffect(() => {
    if (ordersId) {
      const fetchData = async () => {
        try {
          const response = await transaction({ orderId: ordersId.orderId, uid: user.uid });
          if (response) {
            navigate(`/${language}/account`);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [ordersId]);

  return (
    <div className="page-container">
      <div className="d-flex w-100 h-100 justify-content-center align-items-center"></div>
    </div>
  );
}

import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { useLanguageContext } from '../../context/LanguageContext';

export default function Success() {
  const { user } = useAuthContext();
  const { documents: ordersId } = useCollection('orderId', ['uid', '==', user.uid]);
  const { language } = useLanguageContext();
  const functions = getFunctions();
  const getOrder = httpsCallable(functions, 'getOrder');
  const createFax = httpsCallable(functions, 'createFax');
  const checkTransactionStatus = httpsCallable(functions, 'checkTransactionStatus');
  const transactionConfirmation = httpsCallable(functions, 'transactionConfirmation');
  const navigate = useNavigate();
  const { documents: License } = useCollection('user', ['uid', '==', user.uid]);
  const { documents: users } = useCollection('user', ['team', '==', user.uid]);
  const [orderId, setOrderId] = useState(null);
  const [currentDate] = useState(moment().format('MM-DD-YYYY'));
  const [status, setStatus] = useState('Pobieranie numeru zamówienia');
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    checkTransactionStatus({
      user: {
        email: user.email,
        uid: user.uid,
      },
    });
  }, [checkTransactionStatus, user]);
  useEffect(() => {
    if (ordersId && ordersId[0]?.orderId) {
      setOrderId(ordersId[0].orderId);
      setStatus(`Pobieranie statusu zamówienia ${ordersId[0].orderId}`);
    } else {
      setStatus('Brak zamówień');
    }
  }, [ordersId]);
  const handleGetOrder = async () => {
    try {
      const response = await getOrder({ orderId });
      const order = response.data[0];
      setStatus(`Status zamówienia ${orderId} to ${order.status}`);
      if (order.status === 'NEW') {
        handleGetOrder();
      } else if (order.status === 'COMPLETED') {
        const text = order.products[0].name;
        const regex = /\d+/;
        const match = text.match(regex);
        const number = parseInt(match[0], 10);
        const newDate = moment(currentDate).add(number, 'months').format('MM-DD-YYYY');
        const docRef = doc(db, 'user', License[0].id);
        setStatus(`Przyznawanie licencji, która wygaśnie ${newDate}`);

        await setDoc(docRef, {
          license: 'full-license',
          uid: user.uid,
          expireDate: newDate,
        });
        users?.forEach(users => {
          const userRef = doc(db, 'user', users.id);
          setDoc(userRef, {
            license: 'full-license',
            uid: users.uid,
            expireDate: newDate,
          });
        });
        const transRes = await transactionConfirmation({
          user: {
            email: user.email,
            uid: user.uid,
          },
        });
        const faxRes = await createFax({ order });
        console.log(transRes, faxRes);
        const historyRef = collection(db, 'history');
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
            const orderRef = doc(db, 'orderId', user.uid);
            await setDoc(orderRef, {
              orderId: '',
              uid: user.uid,
            }).then(async () => {
              const accountRef = doc(db, 'teamAccounts', user.uid);
              await updateDoc(accountRef, {
                expireDate: newDate,
              })
                .then(res => {
                  console.log(res);
                  navigate(`/${language}/account`);
                })
                .catch(res => {
                  console.log(res);
                  navigate(`/${language}/account`);
                });
            });
          });
      } else {
        const orderRef = doc(db, 'orderId', user.uid);
        await setDoc(orderRef, {
          orderId: '',
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
    setTimeout(() => {
      if (orderId && License && !isReady) {
        if (License.length > 0) {
          handleGetOrder();
          setIsReady(true);
        }
      }
    }, 1000);
  }, [License, orderId]);

  return (
    <div className="page-container">
      <div className="d-flex w-100 h-100 justify-content-center align-items-center">
        <span>{status}</span>
      </div>
    </div>
  );
}

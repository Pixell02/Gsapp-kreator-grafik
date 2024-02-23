import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../../../firebase/config";

export type History = {
  date: string;
  buyer: {
    customerId: string;
    delivery: {
      city: string;
      countryCode: string;
      postalCode: string;
      street: string;
    };
    email: string;
    firstName: string;
    lastName: string;
  };
  delivery: {
    city: string;
    countryCode: string;
    postalCode: string;
    street: string;
  };
  orderId: string;
  products: {
    name: string;
    quantity: string;
    unitPrice: string;
  }[];
  type: string;
  uid: string;
};

const useSortByDate = (start: number, end: number) => {
  const [documents, setDocuments] = useState<History[]>([]);
  useEffect(() => {
    const ref = query(collection(db, "history"), where("date", ">=", start), where("date", "<=", end));
    onSnapshot(ref, (snapshot) => {
      const results: History[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data() } as History);
      });

      setDocuments(results);
    });
  }, [start, end]);
  return { documents };
};

export default useSortByDate;

import { WhereFilterOp, collection, query, where, onSnapshot, CollectionReference, Query } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/config";

const useCountCollection = (c: string, _q?: [string, WhereFilterOp, string]) => {
  const [count, setCount] = useState<number>(0);

  const q = useRef(_q).current;
  useEffect(() => {
    let ref: CollectionReference | Query = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsub();
  }, [c, q]);

  return { count };
};

export default useCountCollection;

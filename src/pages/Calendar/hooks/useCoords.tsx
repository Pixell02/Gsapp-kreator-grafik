import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import useSearchDocByQuery from "../../../hooks/useSearchDocByQuery";

const useCoords = (selectedPoster: DocumentData | null) => {
  const [coords, setCoords] = useState<DocumentData | null>(null);
  const { document } = useSearchDocByQuery("coords", "uid", "==", selectedPoster?.id);

  useEffect(() => {
    if (!document) return;
    setCoords({ ...document });
  }, [document]);

  return { coords, setCoords };
};

export default useCoords;

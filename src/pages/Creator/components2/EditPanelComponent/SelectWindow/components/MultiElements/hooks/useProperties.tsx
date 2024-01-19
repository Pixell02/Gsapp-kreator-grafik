import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

export type Properties = {
  orientation: string;
  Margin: number;
};

const useProperties = (coords: DocumentData) => {
  const [properties, setProperties] = useState<Properties | null>(null);
  useEffect(() => {
    setProperties({ orientation: coords.orientation || "", Margin: coords.Margin || 0 });
  }, [coords]);

  return { properties };
};

export default useProperties;

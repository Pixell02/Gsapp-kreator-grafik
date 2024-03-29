import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

export type Properties = {
  orientation: string;
  Margin: number;
  rollAfter: number;
  MarginAfterRoll: number;
};

const useProperties = (coords: DocumentData) => {
  const [properties, setProperties] = useState<Properties | null>(null);

  useEffect(() => {
    setProperties({
      orientation: coords.orientation || "",
      Margin: coords.Margin || 0,
      rollAfter: coords.rollAfter || 0,
      MarginAfterRoll: coords.MarginAfterRoll || null,
    });
  }, [coords]);

  return { properties };
};

export default useProperties;

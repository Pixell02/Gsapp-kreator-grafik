import { useEffect, useState } from "react";
import { Sponsor } from "../components/Sponsors-MainContent";

const useOrderNumber = (sponsors: Sponsor[]) => {
  const [sponsorNumbersArray, setSponsorNumbersArray] = useState<number[]>([]);

  useEffect(() => {
    if (!sponsors) return;
    const array: number[] = [];
    sponsors.forEach((item) => {
      array.push(item.number);
    });
    setSponsorNumbersArray(array);
  }, [sponsors]);

  return { sponsorNumbersArray };
};

export default useOrderNumber;

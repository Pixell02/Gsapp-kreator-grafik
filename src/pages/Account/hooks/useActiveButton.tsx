import { useEffect, useState } from "react";

type UserData = {
  [key: string]: string;
};

const useActiveButton = (faxData: UserData | null, isChecked: boolean) => {
  const [isActive, setIsActive] = useState(false);

  const zipCodeRegex = /^\d{2}-\d{3}$/;
  const nipRegex = /^\d{10}$/;
  useEffect(() => {
    if (faxData) {
      const areAllKeysValid = Object.keys(faxData).every((key) => {
        const value = faxData[key];

        if (key === "postCode" && !zipCodeRegex.test(value)) {
          return false;
        }
        if (isChecked) {
          if (key === "NIP" && !nipRegex.test(value)) {
            return false;
          }
        }
        if (key !== "zipCode" && key !== "nip" && value === "") {
          return false;
        }

        return true;
      });
      console.log(areAllKeysValid);
      setIsActive(areAllKeysValid);
    } else {
      setIsActive(false);
    }
  }, [faxData, zipCodeRegex, nipRegex, isChecked]);

  return { isActive };
};

export default useActiveButton;

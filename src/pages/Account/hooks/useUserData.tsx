import React, { useEffect, useState } from "react";
import { useDoc } from "../../../hooks/useDoc";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { SingleValue } from "react-select";

type UserData = {
  [key: string]: string;
};

type Option = {
  label?: string;
  value: string;
};

const useUserData = (isChecked: boolean) => {
  const { user } = useAuthContext();
  const { documents: userData } = useDoc("userData", ["uid", "==", user.uid]);
  const [faxData, setFaxData] = useState<UserData | null>(null);

  useEffect(() => {
    setFaxData(userData as UserData);
  }, [userData]);

  useEffect(() => {
    if (!isChecked) {
      delete faxData?.NIP;
      delete faxData?.companyName;
    } else {
      setFaxData((prev) => ({ ...prev, NIP: "", companyName: "" }));
    }
  }, [isChecked]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { className, value } = e.target;
    setFaxData((prev) => ({ ...prev, [className]: value }));
  };
  const handleOptionChange = (option: SingleValue<Option>) => {
    setFaxData((prev) => ({ ...prev, country: option?.value as string }));
  };

  return { faxData, handleValueChange, handleOptionChange };
};

export default useUserData;

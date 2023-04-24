import {useState} from "react";



export const useUserData = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    postCode: "",
    city: "",
    country: "Afganistan",
    countryCode: "AF",
    nip: "",
    companyName: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return { userData, setUserData, handleUserChange }
};

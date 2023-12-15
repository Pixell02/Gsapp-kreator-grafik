import { useState } from "react";

const useProvince = () => {
  const province = [
    "dolnośląskie",
    "kujawsko-pomorskie",
    "lubelskie",
    "lubuskie",
    "łódzkie",
    "małopolskie",
    "mazowieckie",
    "opolskie",
    "podkarpackie",
    "podlaskie",
    "pomorskie",
    "śląskie",
    "świętokrzyskie",
    "warmińsko-mazurskie",
    "wielkopolskie",
    "zachodniopomorskie",
  ];
  const [selectedProvince, setSelectedProvince] = useState(null);

  const options = province.map((item) => ({
    label: item,
    value: item,
  }));

  return { options, selectedProvince, setSelectedProvince };
};

export default useProvince;

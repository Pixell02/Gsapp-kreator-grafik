import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import posterCoords from "../coordinates.json";
import { useCollection } from "../../../hooks/useCollection";

export default function useTimeTable() {
  const { poster } = useParams();
  const [coords, setCoords] = useState();
  const { documents: coordinates } = useCollection("coords", ["uid", "==", poster]);
  useEffect(() => {
    if (coordinates) {
      coordinates.map((postersCoords) => {
        if (postersCoords.id === poster) {
          setCoords(postersCoords);
        }
      });
    }
  }, [coordinates]);

  const [numberOfMatch, setNumberOfMatch] = useState();

  useEffect(() => {
    if (coords) {
      setNumberOfMatch(coords.numberOfMatches);
    }
  }, [coords]);

  const [loops, setLoops] = useState();

  const [radioValues, setRadioValues] = useState(Array(numberOfMatch).fill("radio1"));

  const [textInputValues, setTextInputValues] = useState(Array(numberOfMatch).fill(" "));
  const [selectValues, setSelectValues] = useState(Array(numberOfMatch).fill(" "));
  const [selectNamesValues, setSelectNamesValues] = useState(Array(numberOfMatch).fill(" "));
  const [selectLogoValues, setSelectLogoValues] = useState(Array(numberOfMatch).fill(" "));
  const [selectHostLogoValues, setSelectHostLogoValues] = useState(Array(numberOfMatch).fill(" "));
  const [selectHostNamesValues, setSelectHostNamesValues] = useState(Array(numberOfMatch).fill(" "));
  const [manyLeaguesValues, setManyLeaguesValues] = useState(Array(numberOfMatch).fill(" "));
  useEffect(() => {
    setLoops(Array(numberOfMatch).fill(" "));
    setRadioValues(Array(numberOfMatch).fill("radio1"));
    setTextInputValues(Array(numberOfMatch).fill(" "));
    setSelectValues(Array(numberOfMatch).fill(" "));
    setSelectNamesValues(Array(numberOfMatch).fill(" "));
    setSelectLogoValues(Array(numberOfMatch).fill(" "));
    setSelectHostLogoValues(Array(numberOfMatch).fill(" "));
    setSelectHostNamesValues(Array(numberOfMatch).fill(" "));
    setManyLeaguesValues(Array(numberOfMatch).fill(" "));
  }, [numberOfMatch]);

  const handleLeagueChange = (i, value) => {
    
    const newLeagueValues = [...manyLeaguesValues];
    newLeagueValues[i] = value;
    setManyLeaguesValues(newLeagueValues);
  }
  
  const handleRadioChange = (index, value) => {
    const newRadioValues = [...radioValues];
    newRadioValues[index] = value;
    setRadioValues(newRadioValues);
  };

  const handleTextChange = (index, value) => {
    const newTextInputValues = [...textInputValues];
    newTextInputValues[index] = value;
    setTextInputValues(newTextInputValues);
  };

  const handleSelectHostChange = (value, index) => {
    
    const newHostNamesValues = [...selectHostNamesValues];
    const newHostLogoValues = [...selectHostLogoValues];
    fetch(`${value.value}`)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          newHostLogoValues[index] = reader.result;
          setSelectHostLogoValues(newHostLogoValues);
        };
      });

    newHostNamesValues[index] = value.label;
    setSelectHostNamesValues(newHostNamesValues);
  };
  

  const handleSelectChange = (value, index) => {
    
    const newSelectNamesValues = [...selectNamesValues];
    const newSelectLogoValues = [...selectLogoValues];
    fetch(`${value.value}`)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          newSelectLogoValues[index] = reader.result;
          setSelectLogoValues(newSelectLogoValues);
        };
      });
      
    newSelectNamesValues[index] = value.label;
    setSelectNamesValues(newSelectNamesValues);
  };

  return {
    loops,
    handleRadioChange,
    handleTextChange,
    handleSelectChange,
    radioValues,
    textInputValues,
    selectValues,
    selectNamesValues,
    selectLogoValues,
    handleSelectHostChange,
    selectHostLogoValues,
    selectHostNamesValues,
    manyLeaguesValues,
    setManyLeaguesValues,
    handleLeagueChange
  };
}

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import posterCoords from "../../coords.json";


export default function useTeamOption(Team, Opponent) {
  const { poster } = useParams();
  const [yourTeam, setYourTeam] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [concated, setConcated] = useState([]);
  console.log(concated)
  const [coords, setCoords] = useState();

  useEffect(() => {
    posterCoords.map((postersCoords) => {
      if (postersCoords.id === poster) {
        setCoords(postersCoords);
      }
    });
  }, []);

  const [numberOfMatch, setNumberOfMatch] = useState(0);

  useEffect(() => {
    if (coords) {
      setNumberOfMatch(coords.numberOfMatches);
    }
  }, [coords]);

  const [selectTeamValue, setSelectTeamValue] = useState(Array(numberOfMatch).fill());

  useEffect(() => {
    if (Team && Opponent) {
      setYourTeam(Team)
      setOpponents(Opponent)
    }
  },[Team, Opponent])
  
  useEffect(() => {
    if (yourTeam && opponents) {
      const options = yourTeam.concat(opponents).map((option) => {
        let value = option.img;
        let label = option.firstName;
        if (option.lastName) {
          label += " " + option.lastName;
        } else if (option.secondName) {
          label += " " + option.secondName;
        }
        return {
          label: label,
          value: value,
        };
      });
      setConcated(options)
    }
  }, [yourTeam, opponents]);

  const handleSelectTeamValue = (value, i) => {
    const newSelectTeamValue = [...selectTeamValue]
    newSelectTeamValue[i] = value;
    setSelectTeamValue(newSelectTeamValue)
  };

  
  
  return { concated, selectTeamValue, handleSelectTeamValue }
}

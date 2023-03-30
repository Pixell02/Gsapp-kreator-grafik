import React, { useState } from 'react'

export default function useResults(initialValue) {
  
    const [yourTeamResultsValue, setYourTeamResultsValue] = useState(initialValue);
    const [opponentTeamResultsValue, setOpponentTeamResultsValue] = useState(initialValue);

    const handleYourTeamResultChange = (value, i) => {
        const newYourTeamResultValues = [...yourTeamResultsValue];
        newYourTeamResultValues[i] = value;
        setYourTeamResultsValue(newYourTeamResultValues);
    };

    const handleOpponentTeamResultChange = (value, i) => {
        const newOpponentTeamResultsValue = [...opponentTeamResultsValue];
        newOpponentTeamResultsValue[i] = value;
        setOpponentTeamResultsValue(newOpponentTeamResultsValue);
    };


    return {yourTeamResultsValue, opponentTeamResultsValue, handleOpponentTeamResultChange, handleYourTeamResultChange}
}

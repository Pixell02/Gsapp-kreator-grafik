import React, { useState } from 'react'

export default function useCreateYourTeamGoals(initialState) {
    const [yourTeamGoal, setYourTeamGoal] = useState(initialState);

    const handleGoalChange = (option, i) => {
        const newGoalValue = [...yourTeamGoal];
        newGoalValue[i] = option.value;
        setYourTeamGoal(newGoalValue);
    }

    return [yourTeamGoal, handleGoalChange];
}

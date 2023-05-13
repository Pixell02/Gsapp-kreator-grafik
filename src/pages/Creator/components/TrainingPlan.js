import React, { useState, useEffect } from 'react';
import addTrainingDay from './trainingPlan/addTrainingDay';

const weekDay = [
  "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"
];

export default function TrainingPlan({ fabricRef, coords }) {
  const [weekData, setWeekData] = useState(Array(7).fill(Array(6).fill('')));

  useEffect(() => {
    if (fabricRef.current !== undefined) {
      addTrainingDay(fabricRef, coords, weekData);
    }
  }, [weekData, fabricRef, coords]);

  const handleInputChange = (e, dayIndex, dataIndex) => {
    const { name, value } = e.target;
    setWeekData(prevState => prevState.map((dayData, i) =>
      i === dayIndex ? [
        ...dayData.slice(0, dataIndex),
        value,
        ...dayData.slice(dataIndex + 1),
      ] : dayData
    ));
  };

  return (
    <div className='training-plan-container'>
      {weekDay.map((day, dayIndex) => (
        <div className='input-container' key={day}>
          <span>{day}</span>
          {['first', 'second', 'third', 'fourth', 'fifth', 'sixth'].map((data, dataIndex) => (
            <div className='input-container d-flex flex-column' key={`${day}-${dataIndex}`}>
              <span className='w-100'>Data i godzina {dataIndex + 1}</span>
              <input
                type="text"
                name={`${data}-${dayIndex}`}
                value={weekData[dayIndex][dataIndex]}
                onChange={e => handleInputChange(e, dayIndex, dataIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

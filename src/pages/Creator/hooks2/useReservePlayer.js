import { useState } from 'react'

export default function useReservePlayer(initialValue) {
  const [reserve, setReserve] = useState(initialValue);
  
  const handleReserveChange = (option, i) => {
    const newPlayerValue = [...reserve];
    newPlayerValue[i] = option.value;
    setReserve(newPlayerValue);
  };


  return [reserve, handleReserveChange]
}

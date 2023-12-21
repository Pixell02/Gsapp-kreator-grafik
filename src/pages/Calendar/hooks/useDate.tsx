import { useState } from "react";

type Range<T> = [T, T];
type ValuePiece = Date | null;
export type Value = ValuePiece | Range<ValuePiece>;

const useDate = () => {
  const [date, setDate] = useState<Value>(new Date());

  const onChange = (value: Value) => {
    setDate(value);
  };

  return { date, onChange };
};

export default useDate;

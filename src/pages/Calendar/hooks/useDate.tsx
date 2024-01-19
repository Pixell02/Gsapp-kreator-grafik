import moment from "moment";
import { useEffect, useState } from "react";

type Range<T> = [T, T];
type ValuePiece = Date | null;
export type Value = ValuePiece | Range<ValuePiece>;

const useDate = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [momentDate, setMomentDate] = useState<string | null>(null);

  useEffect(() => {
    const newDate = moment(date as Date).format("DD-MM-YYYY");
    setMomentDate(newDate);
  }, [date]);

  const onChange = (value: Value) => {
    setDate(value);
  };

  return { date, onChange, momentDate };
};

export default useDate;

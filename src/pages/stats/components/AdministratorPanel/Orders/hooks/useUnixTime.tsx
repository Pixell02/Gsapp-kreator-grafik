import moment from "moment";
import { useEffect, useState } from "react";

const useUnixTime = (selectedMonth: number, selectedYear: number) => {
  const [startOfMonthUnix, setStartOfMonthUnix] = useState<number>(0);
  const [endOfMonthUnix, setEndOfMonthUnix] = useState<number>(0);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const startOfMonth = moment()
        .year(selectedYear)
        .month(selectedMonth - 1)
        .startOf("month");
      const endOfMonth = moment()
        .year(selectedYear)
        .month(selectedMonth - 1)
        .endOf("month");

      setStartOfMonthUnix(startOfMonth.unix() * 1000);
      setEndOfMonthUnix(endOfMonth.unix() * 1000);
    }
  }, [selectedMonth, selectedYear]);

  return { startOfMonthUnix, endOfMonthUnix };
};

export default useUnixTime;

import moment from "moment";
import { useEffect, useState } from "react";

const useUnixTime = (selectedMonth, selectedYear) => {
  const [startOfMonthUnix, setStartOfMonthUnix] = useState(null);
  const [endOfMonthUnix, setEndOfMonthUnix] = useState(null);

  useEffect(() => {
    if (selectedMonth !== "" && selectedYear !== "") {
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
    } else {
      setStartOfMonthUnix(null);
      setEndOfMonthUnix(null);
    }
  }, [selectedMonth, selectedYear]);

  return { startOfMonthUnix, endOfMonthUnix };
};

export default useUnixTime;

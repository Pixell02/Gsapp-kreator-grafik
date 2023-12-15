import moment from "moment/moment";
import { useEffect, useState } from "react";
import useSortByDate from "./useSortByDate";

const useHistory = (user, start, end) => {
  const { documents: history } = useSortByDate(start, end);
  const [formattedArray, setFormattedArray] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  useEffect(() => {
    if (user) {
      const filteredData = user.filter((u, index, self) => {
        return index === self.findIndex((user) => user.uid === u.uid);
      });
      setDataFiltered(filteredData);
    }
  }, [user]);

  useEffect(() => {
    if (history) {
      const sortHistory = () => {
        const sortedData = [...history].sort((a, b) => b.date - a.date);
        const formattedData = sortedData.map((item) => ({
          ...item,
          date: moment(item.date).locale("pl").format("D MMMM YYYY, HH:mm:ss"),
        }));
        setFormattedArray(formattedData);
      };
      sortHistory();
    }
  }, [history]);

  return { formattedArray, dataFiltered };
};

export default useHistory;

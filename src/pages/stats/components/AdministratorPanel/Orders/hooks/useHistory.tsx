import moment from "moment/moment";
import { useEffect, useState } from "react";
import useSortByDate, { History } from "./useSortByDate";
import { User, useUsersContextProvider } from "../../../context/UsersContext";

const useHistory = (start: number, end: number) => {
  const { documents: history } = useSortByDate(start, end);
  const { users: user } = useUsersContextProvider();
  const [formattedArray, setFormattedArray] = useState<History[]>([]);
  const [dataFiltered, setDataFiltered] = useState<User[]>([]);

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
        const sortedData = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const formattedData = sortedData.map((item) => ({
          ...item,
          date: moment(item.date).locale("pl").format("D MMMM YYYY, HH:mm:ss"),
        }));
        setFormattedArray(formattedData); // Zmiana ta została wprowadzona
      };
      sortHistory();
    }
  }, [history]);

  return { formattedArray, dataFiltered };
};

export default useHistory;

import moment from "moment/moment";
import "moment/locale/pl";
import React, { useEffect, useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import "../Stats.css";
export default function Orders(props) {
  const { documents: history } = useCollection("history");
  const { documents : user } = useCollection("Teams");
  const [sortedHistory, setSortedHistory] = useState();
  const [isHistory, setIsHistory] = useState(false);
  const [formattedArray, setFormattedArray] = useState();

  const sortHistory = () => {
    const sortedData = [...history].slice().sort((a, b) => b.date - a.date);
    setSortedHistory(sortedData);
    setIsHistory(true);
  };

  const [dataFiltered, setDataFiltered] = useState([]);
  console.log(formattedArray)
  useEffect(() => {
    if (user) {
      const filteredData = user.filter((user, index, self) => {
        return index === self.findIndex(u => u.uid === user.uid);
      });
      setDataFiltered(filteredData);
    }
  }, [user]);

  useEffect(() => {
    if (history) {
      sortHistory();
      if (sortedHistory) {
        setFormattedArray(
          sortedHistory.map((item) => {
            const date = new Date(item.date);
            const formattedDate = moment(date).locale("pl").format("D MMMM YYYY, HH:mm:ss");

            return { ...item, date: formattedDate };
          })
        );
      }
    }
  }, [history, isHistory]);
  return (
    <div className="order-container mt-5 ml-5">
      <p>Zamówienia</p>
      <div className="table-container">
        <table className="table">
          <tr>
            <th>Id zamówienia</th>
            <th>Dane kupującego</th>
            <th>Nazwa drużyny(id)</th>
            <th>Opis</th>
            <th>Data</th>
          </tr>
          {formattedArray &&
            formattedArray.map((history, i) => (
              <>
                <tr key={i}>
                  <td className="dimension">{history.orderId}</td>

                  {dataFiltered &&
                    dataFiltered
                      .filter((user) => user.uid === history.uid)
                      .map((user) => (
                        <>
                          <td className="dimension">
                            <ul>
                              <li>{history.buyer?.firstName}</li>
                              <li>{history.buyer?.lastName}</li>
                              <li>{history.buyer?.delivery?.street}</li>
                              <li>{history.buyer?.delivery?.postalCode + " " + history.buyer?.delivery?.city}</li>
                            </ul>
                          </td>
                          <td className="dimension">
                            <div>
                              {user.firstName + " " + user.secondName + " " + `(${user.uid.substring(0, 10)}...)`}
                            </div>
                          </td>
                        </>
                      ))}
                  <td className="dimension">
                    {history.type} <br />
                    {history.products.map((product) => (
                      <div>{product.name}</div>
                    ))}
                  </td>
                  <td className="dimension">{history.date}</td>
                </tr>
              </>
            ))}
        </table>
      </div>
    </div>
  );
}

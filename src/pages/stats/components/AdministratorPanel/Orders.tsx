import moment from "moment";
import "moment/locale/pl";
import React, { useState } from "react";
import "../../Stats.css";
import OrderDimension from "./Orders/OrderDimension";
import TopBar from "./Orders/TopBar";
import useHistory from "./Orders/hooks/useHistory";
import useUnixTime from "./Orders/hooks/useUnixTime";
import { User } from "../context/UsersContext";
export default function Orders() {
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const { startOfMonthUnix, endOfMonthUnix } = useUnixTime(selectedMonth, selectedYear);

  const { formattedArray, dataFiltered } = useHistory(startOfMonthUnix, endOfMonthUnix);
  return (
    <div className="order-container mt-5 ml-5">
      <p>Zamówienia</p>
      <TopBar
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        ordersData={formattedArray}
      />
      <div className="table-container">
        <table className="table">
          <tr>
            <th>Id zamówienia</th>
            <th>Dane kupującego</th>
            <th>Nazwa drużyny(id)</th>
            <th>Opis</th>
            <th>Data</th>
          </tr>
          {formattedArray?.map((history, i) => (
            <OrderDimension
              key={i}
              history={history}
              dataFiltered={dataFiltered.find((data) => data.uid === history.uid) as User}
            />
          ))}
        </table>
      </div>
    </div>
  );
}

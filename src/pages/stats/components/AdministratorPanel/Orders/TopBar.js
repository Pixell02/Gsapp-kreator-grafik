import moment from "moment";
import React from "react";
import useTotalPrice from "./hooks/useTotalPrice";

const TopBar = ({
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  ordersData,
}) => {
  const totalPrice = useTotalPrice(ordersData);
  return (
    <div className="d-flex w-50">
      <label htmlFor="month">Miesiąc:</label>
      <select
        className="form-control"
        onChange={(e) => setSelectedMonth(e.target.value)}
        value={selectedMonth}
      >
        <option value="">Wybierz</option>
        {Array.from({ length: 12 }).map((_, index) => (
          <option key={index} value={index + 1}>
            {moment().month(index).format("MMMM")}
          </option>
        ))}
      </select>
      <div className="d-flex flex-column ml-5">
        <label htmlFor="year">Rok:</label>
        <input
          type="number"
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="Wprowadź rok"
        />
      </div>
      <span>Suma {totalPrice?.toFixed(2)}zł</span>
    </div>
  );
};

export default TopBar;
